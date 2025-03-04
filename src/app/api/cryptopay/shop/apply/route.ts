import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import  { registerOne  } from '@/lib/api/shop';

///import { get } from 'lodash';


/* ======================================

post json



======================================= */
///export const GET = async (req: NextRequest, res: NextResponse) => {

export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json() as any;

  console.log("create data:", data);

  // random id example 100000 ~ 999999
  const id = Math.floor(Math.random() * 90000) + 10000;

  // add id to data

  const shopData = { 
    id: id, 
    createdAt: new Date(),
    ...data, 
  };


  const results = await registerOne(shopData);

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }
  
};
