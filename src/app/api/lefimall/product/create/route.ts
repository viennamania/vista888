import { NextResponse, NextRequest } from 'next/server';

import { insertOne } from '@/lib/api/product';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json() as any;

  ///console.log(' product create  data: ' + data);
  


  const results = await insertOne(data);

  //console.log('product/insertOne results: ' + results);



  try {
    return NextResponse.json(
      { success: true, message: 'Insert One Success', data: results },
      //{ data: results },
      //{ status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }
  
};

