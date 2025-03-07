import { routes } from '@/config/routes';


import { adminData } from '@/data/lefimall/user/admin-data';


///import { getColumns } from '@/app/shared/ecommerce/order/order-list/columns';

import { getColumns } from '@/app/shared-corky/user/admin-columns';

import AdminTableWidget from '@/components/corky/admin-table-widget';


import TableLayout from './table-layout';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold } from 'react-icons/pi';


export const metadata = {
  ...metaObject('관리자 계정관리'),
};

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
      name: '관리자 계정관리',
    },
  ],
};

export default function SearchTablePage() {


  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      //data={memberData}
      fileName=""
      //header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
    >

      {/*
      <div className='mb-5 w-full flex flex-row items-center justify-end'>
        <Button className=" @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
          <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
          엑셀다운로드
        </Button>
      </div>
    */}


      <AdminTableWidget
        title=""
        variant="minimal"
        data={adminData}
        // @ts-ignore
        getColumns={getColumns}
        enablePagination={true}
        
        searchPlaceholder="이름, 아이디, 연락처"

        className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"


        //onDeleted={() => {
        //  alert('Deleted!');
        //} }


      />

    </TableLayout>
  );
}
