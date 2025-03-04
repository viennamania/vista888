import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '@/env.mjs';
import isEqual from 'lodash/isEqual';
import { pagesOptions } from './pages-options';


import { getOne, getAll, checkOne } from '@/lib/api/shop';




import { checkUserByEmail} from '@/lib/api/user';



export const authOptions: NextAuthOptions = {
  // debug: true,
  pages: {
    ...pagesOptions,
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days,
  },

  callbacks: {
    async session({ session, token }) {

      return {
        ...session,
        user: {
          ...session.user,
          id: token.idToken as string,
        },
      };

    },
    async jwt({ token, user }) {
      if (user) {
        // return user as JWT
        token.user = user;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);
      if (parsedUrl.searchParams.has('callbackUrl')) {
        return `${baseUrl}${parsedUrl.searchParams.get('callbackUrl')}`;
      }
      if (parsedUrl.origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },


  providers: [

    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {},

      async authorize(credentials: any) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid




        const user = {
          id: 'admin',
          password: '1234',
          name: 'Admin',
          email: 'admin@unove.space',
          image: 'https://corky.unove.space/images/profile-default.png',
        };



        if (
          user.id === credentials?.id && user.password === credentials?.password
        ) {

          return user as any;

        }

        
        try {

          /*
          const res = await fetch(`/api/corky/shop/checkOne?_id=${credentials?.id}&_password=${credentials?.password}`);

          const data  = await res.json() as any;

          //console.log('data=', data);
          */

          const results = await checkOne(
            credentials?.id as string,
            credentials?.password as string,
          );

          ///console.log('results=', results);
          
          if (results) {

            const user = {
              //loginid: results?.loginid,
              ///password: '1234',
              //avatar: results?.avatar,
              name: results?.name,
              email: results?.contactEmail,
              image: results?.avatar,
              id: results?.id,
              introduction: results?.introduction,
              status: results?.status,
            };
    
            return user as any;
            
          }


        } catch (error) {
          console.log('error:', error);
        }


        try {
            
            const results = await checkUserByEmail(
              credentials?.id as string,
              credentials?.password as string,
            );
  
            console.log('results=', results);
            
            if (results) {
  
              const user = {
                //loginid: results?.loginid,
                ///password: '1234',
                //avatar: results?.avatar,
                name: results?.name,
                email: results?.email,
                image: results?.avatar,
                id: results?.id,
                //introduction: results?.introduction,
                //status: results?.status,
              };
      
              return user as any;
              
            }
        } catch (error) {
          console.log('error:', error);
        }

        




        /*
        if (data?.data?.length > 0) {

          const user = {
            id: data?.data?.id,
            loginid: data?.data?.loginid,
            name: data?.data?.name,
            avatar: data?.data?.avatar,
          };

          return user as any;

        }
        */

        /*
        const user = {
          id: 'lefishop',
          password: '1234',
        };

        if (
          isEqual(user, {
            id: credentials?.id,
            password: credentials?.password,
          })
        ) {

          return user as any;

        }
        */


        /*
        credentials?.id
        credentials?.password

        check from api
        */





        return null;
      },
    }),

    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),

  ],
  
};
