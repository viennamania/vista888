import { NextResponse, NextRequest } from 'next/server';

import { getAll, getCount } from '@/lib/api/certificate';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  
  // _limit=10&_page=${currentPage}

  //const { _limit, _page } = req.query;

  //const currentPage = _page ? _page : 1;

  

  const limit = req.nextUrl.searchParams.get('_limit') || 10;
  const page = req.nextUrl.searchParams.get('_page') || 1;
  const sort = req.nextUrl.searchParams.get('_sort');
  const order = req.nextUrl.searchParams.get('_order');
  const q = req.nextUrl.searchParams.get('_q');

  const shopId = req.nextUrl.searchParams.get('_shopId');



  console.log('shopId: ' + shopId);



  const results = await getAll(
    parseInt(limit as string, 10),
    parseInt(page as string, 10),
    sort as string,
    order as string,
    q as string,

    //shopId as string,
  ) as any;
  

  console.log('certificate / getAll results: ', results);

  

  //console.log('product/getAll results: shop ', results?.shop);

  
        /*
  id: string,
  createdAt: string,
  name: string,
  companyName: string,
  shopId: string,
  category: string,
  image: string,
  sku: string,
  listPrice: number,
  price: number,
  status: string,
  rating: number[],
  point: number,
  stock: number,
  sales: number,
  inquiry: number,

        */


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
