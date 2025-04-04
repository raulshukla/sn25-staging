import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';
import { sendVerificationEmail } from '@/lib/aws-ses';
import { signUserId } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body.email?.toLowerCase();

    if (!email || !email.includes('@ufl.edu')) {
      return NextResponse.json({ error: 'Valid UFL email is required' }, { status: 400 });
    }

    // Check for existing user
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Create user
    const newUser = await prisma.user.create({
      data: {
        email,
        isVerified: false,
      },
    });

    // Generate token and expiration
    const token = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Store token in DB
    await prisma.verificationToken.create({
      data: {
        userId: newUser.id,
        token,
        expires,
      },
    });

    // Sign userId
    const signedUserId = signUserId(newUser.id);

    // Build verification link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const verifyLink = `${baseUrl}/auth/verify?uid=${signedUserId}&code=${token}`;
    //console.log('Verification link:', verifyLink);
    // Send email
    //await sendVerificationEmail(email, verifyLink);

    //return NextResponse.json({ message: 'Verification email sent successfully' });
    return NextResponse.json({
      message: 'Verification email sent successfully',
      verifyUrl: verifyLink,
    });

  } catch (err: any) {
    console.error('Signup error:', err);
  
    // If it's an AWS SES error, check for nested metadata
    if (err?.name === 'MessageRejected') {
      console.error('AWS SES rejection:', err.message);
    }
  
    // You can also inspect full AWS response metadata
    if (err?.$metadata) {
      console.error('AWS metadata:', err.$metadata);
    }
  
    // Return helpful error
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
