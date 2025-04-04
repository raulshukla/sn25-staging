import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secure-secret';
const JWT_ALGORITHM = 'HS256';

export function createSignedToken(userId: string, expiresInHours = 24) {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { algorithm: JWT_ALGORITHM, expiresIn: `${expiresInHours}h` }
  );
}

export function verifySignedToken(token: string): { userId: string } | 'expired' | 'invalid' {
  try {
    return jwt.verify(token, JWT_SECRET, { algorithms: [JWT_ALGORITHM] }) as { userId: string };
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') return 'expired';
    return 'invalid';
  }
}
