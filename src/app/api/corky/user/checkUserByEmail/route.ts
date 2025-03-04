import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { getUser, checkUserByEmail, getAllUsers, getUserCount, checkUser } from '@/lib/api/user';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _email = req.nextUrl.searchParams.get('_email');
  const _password = req.nextUrl.searchParams.get('_password');
  

  const results = await checkUserByEmail(
    _email as string,
    _password as string,
  );
  
  console.log("checkUserByEmail results:", results);

  
  
  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
