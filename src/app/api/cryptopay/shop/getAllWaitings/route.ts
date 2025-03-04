import { NextResponse, NextRequest } from 'next/server';

import { getAllWaiting, getCount } from '@/lib/api/shop';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  
  // _limit=10&_page=${currentPage}

  //const { _limit, _page } = req.query;

  //const currentPage = _page ? _page : 1;

  

  const _limit = req.nextUrl.searchParams.get('_limit') || 10;
  const _page = req.nextUrl.searchParams.get('_page') || 1;

  const _sort = req.nextUrl.searchParams.get('_sort');
  const _order = req.nextUrl.searchParams.get('_order');

  const _q = req.nextUrl.searchParams.get('_q');

  console.log('_limit: ' + _limit);
  console.log('_page: ' + _page);




  const results = await getAllWaiting(
    parseInt(_limit as string, 10),
    parseInt(_page as string, 10),
    _sort as string,
    _order as string,
    _q as string,

  );
  

  //console.log('shop/getAll results: ' + results);

  

  /*
        businessName: '레피샵',
      representativeName: '김대표',
      businessType: '소매',
      businessCategory: '패션잡화',
      businessRegistrationNumber: '123-45-67890',
      businessRegistrationAddress: '서울시 강남구 테헤란로 427',
      mailOrderRegistrationNumber: '2021-서울강남-00000',
      businessPhone: '02-1234-5678',
      businessFax: '02-1234-5678',
      settlementBank: '신한은행',
      settlementAccount: '123-45-67890',
      settlementAccountHolder: '김대표',
      settlementFeeRate: 0,
      */


  ///console.log("getAllUsers results=", results);

  
  /*
  const data = results.flatMap(({ shops }) => {
    //users.map((user) => ({ params: { username: user.username } }))

    //users.map((user) => ({ user }))

      ///console.log('products: ' + products);


      return (

        shops.map((item : any ) => ({

          id: item.id,
          name: item.name,
          createdAt: item.createdAt,
          avatar: item.avatar,
          contactName: item.contactName,
          contactPhone: item.contactPhone,
          contactEmail: item.contactEmail,
          introduction: item.introduction,
          loginid: item.loginid,
          
          businessName: item.businessName,
          representativeName: item.representativeName,
          businessType: item.businessType,
          businessCategory: item.businessCategory,
          businessRegistrationNumber: item.businessRegistrationNumber,
          businessRegistrationAddress: item.businessRegistrationAddress,
          mailOrderRegistrationNumber: item.mailOrderRegistrationNumber,
          businessPhone: item.businessPhone,
          businessFax: item.businessFax,
          settlementBank: item.settlementBank,
          settlementAccount: item.settlementAccount,
          settlementAccountHolder: item.settlementAccountHolder,
          settlementFeeRate: item.settlementFeeRate,



          tex: item.tex,
          status: item.status,
          productCount: item.productCount,


        }))

      );

    }

  );
  */



  

  ////const result = arr1.flatMap((num) => (num === 2 ? [2, 2] : 1));

  //const paths = results.flatMap(( users ) => ( users ));

  //console.log(paths);
  

  /* time seleep */
  /*
  const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  await sleep(1000);
  */


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
