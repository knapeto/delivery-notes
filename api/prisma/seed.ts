import { getTokenSalt, hashPassword } from '../src/utils/password';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async () => {
  /*
   ** USERS
   */
  await prisma.user.create({
    data: {
      email: 'admin@esa.cz',
      firstName: 'Admin',
      lastName: 'Admin',
      isAd: false,
      password: hashPassword('test'),
      tokenSalt: getTokenSalt(),
    },
  });
};
