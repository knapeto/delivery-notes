import bcrypt from 'bcryptjs';

interface PasswordStrengthError {
  langCode: string;
  message?: string;
}

export function hashPassword(plaintextPassword: string): string {
  const saltRounds = 10;
  return bcrypt.hashSync(plaintextPassword, saltRounds);
}

export function getTokenSalt(): string {
  const saltRounds = 10;
  return bcrypt
    .hashSync(new Date().getTime().toString(), saltRounds)
    .replace(/\//g, 'slash');
}

export function getBookingHash(): string {
  const length = 6;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function isPasswordValid(
  plaintextPassword: string,
  passwordHash: string,
) {
  return bcrypt.compareSync(plaintextPassword, passwordHash);
}

export function testPasswordStrength(
  password: string,
): PasswordStrengthError[] {
  const rules = [
    { langCode: 'TOO_SHORT', complies: () => password?.length >= 8 },
    { langCode: 'TOO_LONG', complies: () => password?.length <= 50 },
    {
      langCode: 'MISSING_SPECIAL_CHAR',
      complies: () => new RegExp('[^a-z 0-9]+', 'i').test(password),
    },
    {
      langCode: 'MISSING_NUMBER',
      complies: () => new RegExp('[0-9]+').test(password),
    },
    {
      langCode: 'MISSING_LOWER_CASE_CHAR',
      complies: () => new RegExp('[a-z]+').test(password),
    },
    {
      langCode: 'MISSING_UPPER_CASE_CHAR',
      complies: () => new RegExp('[A-Z]+').test(password),
    },
  ];

  return rules
    .filter((rule) => !rule.complies())
    .map((rule) => ({ langCode: rule.langCode }));
}

export function generateOtp(): number {
  const min = 1111;
  const max = 9999;
  return Math.floor(Math.random() * (max - min) + min);
}
