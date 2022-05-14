import bcrypt from 'bcryptjs';

export function getTokenSalt(): string {
  const saltRounds = 10;
  return bcrypt.hashSync(new Date().getTime().toString(), saltRounds);
}
