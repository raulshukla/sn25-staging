import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signLoginToken } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = signLoginToken(user.id);

  const response = NextResponse.json({ message: 'Login successful', userId: user.id });

  // ✅ Set cookies individually
  response.cookies.set('auth_token', token, {
    httpOnly: false,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  response.cookies.set('user', JSON.stringify({ id: user.id, email: user.email }), {
    httpOnly: false,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
