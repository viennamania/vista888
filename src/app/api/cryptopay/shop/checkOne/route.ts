import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { getOne, getAll, checkOne } from '@/lib/api/shop';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _id = req.nextUrl.searchParams.get('_id');
  const _password = req.nextUrl.searchParams.get('_password');
  

  const results = await checkOne(
    _id as string,
    _password as string,
  );
  
  ///console.log("checkOne results:", results);

  
  
  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
