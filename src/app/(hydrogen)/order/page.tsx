'use client';

import { routes } from '@/config/routes';

import { getColumns } from '@/app/shared-corky/order/columns';

import { getColumnsShop } from '@/app/shared-corky/order/shop-columns';

import { getColumnsUser } from '@/app/shared-corky/order/user-columns';



import OrderTableWidget from '@/components/corky/order-table-widget';


import TableLayout from './table-layout';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold, PiHourglass } from 'react-icons/pi';

//import { useEffect, useState } from 'react';

import { u } from 'uploadthing/dist/types-e8f81bbc';


import { useState, useEffect, useMemo } from 'react';

import { useSession, signOut } from 'next-auth/react';




/*
export const metadata = {
  ...metaObject('Order List'),
};
*/



const pageHeader = {
  title: 'Order List',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.order.index,
      name: 'Order',
    },
    {
      name: 'Order List',
    },
  ],
};


/*
  {
    id: '3413',
    name: '모히또',
    email: 'august17@naver.com',
    regType: '이메일',
    mobile: '010-3223-3223',
    gender: '여',
    weight: '86',
    height: '173',
    adminType: '영양사',
    mealTime: '아침',

    scrapCount: 23,
    likeCount: 11,
    commentCount: 54,
    viewCount: 123,

    feedbackYn: '미답변',

    feedbackWriter: '김범수',

    title: '안녕하세요. 오늘 날씨가 무척 좋네요. 오늘은 무엇을 드셨나요?',

    tags: ['태그1', '태그2', '태그3'],

    content: '오늘처럼 날씨가 좋을때 밥을 많이 먹습니다. 오늘처럼 날씨가 좋을때 밥을 많이 먹습니다. 오늘처럼 날씨가 좋을때 밥을 많이 먹습니다. 오늘처럼 날씨가 좋을때 밥을 많이 먹습니다. 오늘처럼 날씨가 좋을때 밥을 많이 먹습니다. 오늘처럼 날씨가 좋을때 밥을 많이 먹습니다.', 


    avatar:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-15.webp',
    items: 83,
    price: '457.00',
    status: 'Cancelled',
    createdAt: '2023-08-06T00:01:51.735Z',
    updatedAt: '2023-08-10T22:39:21.113Z',
    products: [
      {
        id: '0o02051402',
        name: 'Tasty Metal Shirt',
        category: 'Shoes',
        image:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp',
        price: '410.00',
        quantity: 2,
      },
      {
        id: '0o17477064',
        name: 'Modern Cotton Gloves',
        category: 'Watch',
        image:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/5.webp',
        price: '342.00',
        quantity: 3,
      },
      {
        id: '0o02374305',
        name: 'Rustic Steel Computer',
        category: 'Shoes',
        image:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/6.webp',
        price: '948.00',
        quantity: 1,
      },
    ],
  }
*/




export default function SearchTablePage() {




  const { data: session, status } = useSession();

  ///console.log("use-table-products session:", session);

    /* fetch user data from an API
  /api/doingdoit/user/getUser
  */
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    name: "",
    nickname: "",
    avatar: "",
    shopId: "",
  });

  const [loadingUserData, setLoadingUserData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {

      if (!session?.user?.email) {
        return;
      }

      setLoadingUserData(true);

      const res = await fetch(`/api/corky/user/getUserByEmail?_email=${session?.user?.email}`);
      const json = await res?.json();

      

      const data = json as any;

      //console.log('data ->', data);
      
      if (data.data) {
        setUserData(data.data);
      } else {
        //alert(json.message);
      }

      setLoadingUserData(false);
    };

    fetchData();
  } , [session?.user?.email]);








  //console.log(data);


  /*
  const [data, setData] = useState([]);
  const [isLoading, setIsLading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/corky/board');

      const posts  = await res.json() as any;

      
      const data = posts.data.map((item: any) => {
        return {
          id: item.id,
          title: item.title,
          content: item.content,
          tags: item.tags,
          writer: item.writer,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          viewCount: item.viewCount,
          commentCount: item.commentCount,
          likeCount: item.likeCount,
          scrapCount: item.scrapCount,
          feedbackYn: item.feedbackYn,
          feedbackWriter: item.feedbackWriter,
        }

      } );
      
      ///console.log(posts.data);

      setData(posts.data);

      setIsLading(false);

    };

    fetchData();
  }
  ,[]);
  */

  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      //data={memberData}
      fileName=""
      
      //header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
    >

      <OrderTableWidget
        title=""
        variant="minimal"
        // @ts-ignore
        
        
        getColumns={

          userData.email === 'corky@gmail.com' ? getColumns : userData.shopId ? getColumnsShop : getColumnsUser

        
        }


        enablePagination={true}
        
        searchPlaceholder="Product Name"

        className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"

        scroll={{ x: 500, }}
      />

    </TableLayout>
  );
}
