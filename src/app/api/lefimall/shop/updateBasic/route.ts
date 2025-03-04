import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { getOne, getAll, getCount, updateName, updateBasic } from '@/lib/api/shop';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  const _id = req.nextUrl.searchParams.get('_id');

  const _avatar = req.nextUrl.searchParams.get('_avatar');
  const _shopName = req.nextUrl.searchParams.get('_shopName');
  const _contactName = req.nextUrl.searchParams.get('_contactName');
  const _contactPhone = req.nextUrl.searchParams.get('_contactPhone');
  const _contactEmail = req.nextUrl.searchParams.get('_contactEmail');
  const _introduction = req.nextUrl.searchParams.get('_introduction');
 

  const data = await updateBasic(
    _id as string,

    _avatar as string,
    _shopName as string,
    _contactName as string,
    _contactPhone as string,
    _contactEmail as string,
    _introduction as string,
  );


  try {
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
