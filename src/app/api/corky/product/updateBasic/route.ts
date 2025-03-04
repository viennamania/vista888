import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { getOne, getAll, getCount, updateBasic } from '@/lib/api/product';



/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  const _id = req.nextUrl.searchParams.get('_id');

  const _name = req.nextUrl.searchParams.get('_name');
  const _companyName = req.nextUrl.searchParams.get('_companyName');
  const _shopId = req.nextUrl.searchParams.get('_shopId');
  const _category = req.nextUrl.searchParams.get('_category');
  const _sku = req.nextUrl.searchParams.get('_sku');
  const _avatar = req.nextUrl.searchParams.get('_avatar');

  console.log('_id: ' + _id);
  console.log('_name: ' + _name);

  const data = await updateBasic(
    _id as string,

    _name as string,
    _companyName as string,
    _shopId as string,
    _category as string,
    _sku as string,
    _avatar as string,

  );


  try {
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
