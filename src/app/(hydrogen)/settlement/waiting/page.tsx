import { routes } from '@/config/routes';



//import { data } from '@/data/lefimall/feed/data';

import { data  } from '@/data/lefimall/settlement/data';

import { getColumns } from '@/app/shared-corky/settlement/waiting-columns';


//import { memberData } from '@/data/lefimall/user/member-data';

///import { getColumns } from '@/app/shared-corky/user/member-columns';



import WaitingTableWidget from '@/components/corky/settlement/waiting-table-widget';


import TableLayout from '../table-layout';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold } from 'react-icons/pi';



export const metadata = {
  ...metaObject('미정산내역'),
};

const pageHeader = {
  title: '미정산내역',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.settlement.dashboard,
      name: '정산',
    },
    {
      name: '미정산내역',
    },
  ],
};





export default function SearchTablePage() {

  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      data={data}
      fileName=""
      header=""
    >

      {/*
      <div className='mb-5 w-full flex flex-row items-center justify-end'>
        <Button className=" @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
          <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
          엑셀다운로드
        </Button>
      </div>
    */}


      {/*
      <BasicTableWidget
        title="포인트관리"
        variant="minimal"
        data={data}
        // @ts-ignore
        getColumns={getColumns}
        enablePagination={true}
        
        searchPlaceholder="닉네임, 제목, 피드백 작성자"

        ////setPageSize={setPageSize}

        className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
      />
      */}


      <WaitingTableWidget
        title=""
        variant="minimal"
        data={data}

        pageSize={20}

        // @ts-ignore
        getColumns={getColumns}
        //enablePagination
        enableSearch={true}
        enablePagination={true}
        
        searchPlaceholder="입금사명"

        className=""

        scroll={{ x: 500, }}
      />



    </TableLayout>
  );
}
