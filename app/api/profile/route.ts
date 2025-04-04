import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { signLoginToken } from '@/lib/jwt';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId,
      firstName,
      lastName,
      contactEmail,
      phone,
      dateOfBirth,
      major,
      gender,
      status,
      campusType,
      affiliations,
      studyStyle,
      password,
    } = body;

    // ✅ Construct profile update object safely
    const profileData: any = {
      firstName,
      lastName,
      contactEmail,
      phone,
      major,
      gender,
      status,
      campusType,
      affiliations,
      studyStyle,
    };

    if (dateOfBirth) {
      profileData.dateOfBirth = new Date(dateOfBirth);
    }

    // ✅ Save or update profile
    await prisma.profile.upsert({
      where: { userId },
      update: profileData,
      create: {
        userId,
        firstName: firstName || '',
        lastName: lastName || '',
        contactEmail: contactEmail || '',
        phone: phone || '',
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : new Date(),
        major: major || '',
        gender: gender || 'male',
        status: status || '',
        campusType: campusType || '',
        affiliations: affiliations || '',
        studyStyle: studyStyle || '',
      },
    });

    // ✅ Update password if provided
    if (password && password.length >= 6) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });
    }

    // ✅ Fetch user to get email for cookie
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const token = signLoginToken(userId);

    const res = NextResponse.json({ message: 'Profile saved successfully' });

    // ✅ Set cookies
    res.cookies.set('auth_token', token, {
      httpOnly: false,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    res.cookies.set('user', JSON.stringify({ id: userId, email: user.email }), {
      httpOnly: false,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    console.error('Profile API error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return NextResponse.json({}, { status: 200 });
    }

    return NextResponse.json(profile);
  } catch (err) {
    console.error('Profile GET error:', err);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}
