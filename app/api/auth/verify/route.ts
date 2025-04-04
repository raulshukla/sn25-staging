import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyUserIdSignature } from '@/lib/jwt';

export async function GET(req: NextRequest) {
  const uid = req.nextUrl.searchParams.get('uid');
  const code = req.nextUrl.searchParams.get('code');
 

  if (!uid || !code) {
    return NextResponse.json({ error: 'Missing uid or code' }, { status: 400 });
  }

  const userId = verifyUserIdSignature(uid);
  
  if (!userId) {
    return NextResponse.json({ error: 'Invalid user ID signature' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  if (user.isVerified) {
    if (user.isVerified) {
      return NextResponse.json({
        email: user.email,
        verified: true,
        userId: user.id,
        profileCompleted: !!(await prisma.profile.findUnique({ where: { userId: user.id } })),
      });
    }
  }

  const tokenRecord = await prisma.verificationToken.findUnique({ where: { token: code } });

  if (!tokenRecord || tokenRecord.userId !== userId || tokenRecord.expires < new Date()) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
  }

  console.log('Returning from verify API:', {
    userId: userId,
    email: user.email,
    verified: true,
  });

  // ✅ Mark verified
  await prisma.user.update({
    where: { id: userId },
    data: { isVerified: true },
  });

  await prisma.verificationToken.delete({ where: { token: code } });
 
  
    return NextResponse.json({
      email: user.email,
      verified: true,
      userId: user.id,
      profileCompleted: !!(await prisma.profile.findUnique({ where: { userId: user.id } })),
    });
  
}
