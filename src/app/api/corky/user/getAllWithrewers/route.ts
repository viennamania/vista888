import { NextResponse, NextRequest } from 'next/server';

import { withdrewData } from '@/data/lefimall/user/withdrew-data';

/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  //console.log('withdrewData', withdrewData);
  

  /* time seleep */
  const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  await sleep(1000);


  try {
    return NextResponse.json({ data: withdrewData }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }
};
