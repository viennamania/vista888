import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { getOne, getAll, getCount, updateName } from '@/lib/api/shop';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  const _id = req.nextUrl.searchParams.get('_id');
  const _name = req.nextUrl.searchParams.get('_name');
 

  const data = await updateName(
    _id as string,
    _name as string

  );

  //console.log('data: ' + JSON.stringify(data));

 

  try {
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
