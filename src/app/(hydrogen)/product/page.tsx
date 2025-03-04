'use client';

import { routes } from '@/config/routes';


//import { data } from '@/data/lefimall/board/data';



import { getColumns } from '@/app/shared-corky/product/columns';


import { getColumnsShop } from '@/app/shared-corky/product/shop-columns';

import { getColumnsUser } from '@/app/shared-corky/product/user-columns';



import ProductTableWidget from '@/components/corky/product-table-widget';


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
  ...metaObject('상품관리'),
};
*/


const pageHeader = {
  title: 'Product List',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.product.index,
      name: 'Product',
    },
    {
      name: 'Product List',
    },
  ],
};

const pageHeaderUser = {
  title: 'Product List',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.product.index,
      name: 'Product',
    },
    {
      name: 'Product List',
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




  console.log('userData.email ->', userData?.email);


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
      title={

        userData?.shopId ? pageHeader.title : userData?.email === 'admin@unove.space' ? pageHeader.title : pageHeaderUser.title
        
      }
      breadcrumb={
        userData?.shopId ? pageHeader.breadcrumb : userData?.email === 'admin@unove.space' ? pageHeader.breadcrumb :  pageHeaderUser.breadcrumb
      }
      //data={memberData}
      fileName=""
      
      //header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
    >

      {/* 들록하기 버튼 */}
      { userData?.shopId !== null && userData?.shopId !== '' && userData?.shopId !== undefined && userData?.shopId !== 'undefined' && userData?.shopId !== 'null' && (
      <div className="flex items-center justify-end gap-5 mb-5">
        <Button
          variant="solid"
          color="primary"
          //size="small"
          //leftIcon={<PiDownloadSimpleBold />}
          onClick={() => {
            //push(routes.user.member);
            //setOpen(true);
            // route to /product/create
            //push(routes.product.create);

            window.location.href = '/product/create';
          }}
        >
          등록하기
        </Button>
      </div>
      )}

      {/* 테이블 */}

      <ProductTableWidget
        title=""
        variant="minimal"
        ////////////data={data}
        // @ts-ignore
        
       
        getColumns={
          userData?.shopId ? getColumnsShop : userData?.email === 'admin@unove.space' ? getColumns : getColumnsUser
        }


        enablePagination={true}
        
        searchPlaceholder="상품명"

        className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"

        scroll={{ x: 500, }}
      />

    </TableLayout>
  );
}
