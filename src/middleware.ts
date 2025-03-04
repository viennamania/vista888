import { pagesOptions } from '@/app/api/auth/[...nextauth]/pages-options';
import withAuth from 'next-auth/middleware';

export default withAuth({
  pages: {
    ...pagesOptions,
  },
});

export const config = {
  // restricted routes
  matcher: [

    ///'/',

    '/analytics',
    '/logistics/:path*',
    '/ecommerce/:path*',
    '/support/:path*',
    '/file/:path*',
    '/file-manager',
    '/invoice/:path*',
    '/forms/profile-settings/:path*',


    '/user/:path*',

    '/board/:path*',
    '/feed/:path*',
    '/profile/:path*',
    '/setup/:path*',
    '/survey/:path*',
    '/sote/:path*',

  ],
};
