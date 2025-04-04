// lib/jwt.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'ultra_secret_key';

export function signUserId(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '2d' });
}

export function verifyUserIdSignature(signedId: string): string | null {
  try {
    const decoded = jwt.verify(signedId, JWT_SECRET) as { userId: string };
    return decoded.userId;
  } catch {
    return null;
  }
}
  export function signLoginToken(userId: string): string {
    return jwt.sign(
      {
        userId,
      },
      JWT_SECRET,
      {
        expiresIn: '7d', // Valid for 7 days
      }
    );
}