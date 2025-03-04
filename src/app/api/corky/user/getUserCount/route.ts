import { NextResponse, NextRequest } from 'next/server';

import { getUser, getAllUsers, getUserCount } from '@/lib/api/user';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  // getUserCount();

  const results = await getUserCount();

  //results.map(({ count }) => {
  //  console.log(count);
  //}


  console.log(results);

  const memberData  = results;




  try {
    return NextResponse.json({ data: memberData }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
