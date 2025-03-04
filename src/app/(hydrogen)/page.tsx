//import FileDashboard from '@/app/shared/file/dashboard';

import Dashboard from '@/app/shared-corky/dashboard';

import { metaObject } from '@/config/site.config';


import { GetStaticProps } from 'next';

import {
  getAllUsers,
  UserProps,
  getUserCount,
  getFirstUser
} from '@/lib/api/user';




export const metadata = {
  ...metaObject(),
};

export default function DashboardPage() {

////export default function Home({ user }: { user: UserProps }) {


  ///console.log('user', user);


  return <Dashboard />;
}

/*
export const getStaticProps: GetStaticProps = async () => {

  const results = await getAllUsers();
  const totalUsers = await getUserCount();
  const firstUser = await getFirstUser();


  return {
    props: {
      //meta: defaultMetaProps,
      results,
      totalUsers,
      user: firstUser
    },
    revalidate: 10
  };
};
*/


