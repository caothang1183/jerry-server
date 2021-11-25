import jwt from 'jsonwebtoken';

const privateKey = process.env.PRAVATE_KEY;
const publicKey = process.env.PUBLIC_KEY;

export const signJwt = (payload: string) => {
  return jwt.sign(payload, privateKey, { algorithm: 'RS256' });
};

export const decode = (token: string) => {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, publicKey);
    return decoded;
  } catch (error) {
    console.error(`error`, error);
    return null;
  }
};
