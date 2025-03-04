import { NextResponse, NextRequest } from 'next/server';

import { getAllByShopId } from '@/lib/api/product';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  
  // _limit=10&_page=${currentPage}

  //const { _limit, _page } = req.query;

  //const currentPage = _page ? _page : 1;

  
  const _shopId = req.nextUrl.searchParams.get('_shopId');

  const _limit = req.nextUrl.searchParams.get('_limit') || 10;
  const _page = req.nextUrl.searchParams.get('_page') || 1;
  const _sort = req.nextUrl.searchParams.get('_sort');
  const _order = req.nextUrl.searchParams.get('_order');
  const _q = req.nextUrl.searchParams.get('_q');

  console.log('_limit: ' + _limit);
  console.log('_page: ' + _page);




  const results = await getAllByShopId(
    _shopId as string,
    parseInt(_limit as string, 10),
    parseInt(_page as string, 10),
    _sort as string,
    _order as string,
    _q as string,
  );
  

  //console.log('product/getAll results: ' + results);

  
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
