import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { getUser, getAllUsers, getUserCount, checkUser } from '@/lib/api/user';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _id = req.nextUrl.searchParams.get('_id');
  const _password = req.nextUrl.searchParams.get('_password');
  

  const results = await checkUser(
    _id as string,
    _password as string,
  );
  
  console.log("getUser results:", results);

  
  
  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
