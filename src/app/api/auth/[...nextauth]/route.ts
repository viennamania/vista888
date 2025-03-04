import NextAuth from 'next-auth';

///import { authOptions } from './auth-options';
///import { authOptions } from './auth-options-doingdoit';
import { authOptions } from './auth-options-refi';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
