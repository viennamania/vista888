'use client';

import { routes } from '@/config/routes';


import AdminEdit from '@/app/shared-corky/profile/admin-edit';


import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import { metaObject } from '@/config/site.config';

import { useRouter } from 'next/navigation';



/*
export const metadata = {
  ...metaObject('관리자 계정관리'),
};
*/

const pageHeader = {
  title: '관리자 계정관리',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.user.index,
      name: 'User',
    },
    {
      href: routes.user.admin,
      name: '관리자 계정관리',
    },
    {
      name: '수정하기',
    }
  ],
};

export default function Page() {

  const { push } = useRouter();


  return (

    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

      </PageHeader>

      <div className="@container">
        <AdminEdit />
      </div>

      
    </>
  );


}
