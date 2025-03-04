import { NextResponse, NextRequest } from 'next/server';

import { getUser, getAllUsers, getUserCount } from '@/lib/api/user';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  
  // _limit=10&_page=${currentPage}

  //const { _limit, _page } = req.query;

  //const currentPage = _page ? _page : 1;

  

  const _limit = req.nextUrl.searchParams.get('_limit');
  const _page = req.nextUrl.searchParams.get('_page');

  console.log('_limit: ' + _limit);
  console.log('_page: ' + _page);

  

  const results = await getAllUsers(
    parseInt(_limit as string, 10),
    parseInt(_page as string, 10),
  );
  

  
        /*
        id,
        name,
        nickname,
        email,
        avatar,
        regType,
        mobile,
        gender,
        weight,
        height,
        birthDate,
        purpose,
        marketingAgree,
        createdAt,
        updatedAt,
        deletedAt,
        loginedAt,
        followers ,
        emailVerified,
        */
  

  ///console.log("getAllUsers results=", results);

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
