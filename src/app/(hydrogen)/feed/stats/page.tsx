import { routes } from '@/config/routes';


import { data } from '@/data/lefimall/feed/stats-data';


///import { getColumns } from '@/app/shared/ecommerce/order/order-list/columns';

import { getColumns } from '@/app/shared-corky/feed/stats-columns';

import StatsTableWidget from '@/components/corky/stats-table-widget';


import TableLayout from '../table-layout';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold } from 'react-icons/pi';


export const metadata = {
  ...metaObject('피드 통계'),
};

const pageHeader = {
  title: '피드 통계',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.feed.index,
      name: '피드',
    },
    {
      name: '피드 통계',
    },
  ],
};


export default function SearchTablePage() {


  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      //data={memberData}
      fileName="feed_stats_data"
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


      <StatsTableWidget
        title=""
        variant="minimal"
        data={data}
        // @ts-ignore
        getColumns={getColumns}
        enablePagination
        enableSearch={true}
        //searchPlaceholder="닉네임, 계정, 휴대폰번호"

        //className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
      />

    </TableLayout>
  );
}
