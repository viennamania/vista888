import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { getOne, getAll, getCount, updateName, updateBusiness, updateSettlement } from '@/lib/api/shop';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  const _id = req.nextUrl.searchParams.get('_id');

  const _settlementBank = req.nextUrl.searchParams.get('_settlementBank');
  const _settlementAccountHolder = req.nextUrl.searchParams.get('_settlementAccountHolder');
  const _settlementAccount = req.nextUrl.searchParams.get('_settlementAccount');
  const _settlementAccountImage = req.nextUrl.searchParams.get('_settlementAccountImage');
  
  //const _settlementFeeRate = req.nextUrl.searchParams.get('_settlementFeeRate');
  const _settlementFeeRate = Number(req.nextUrl.searchParams.get('_settlementFeeRate'));



  console.log('updateSettlement _id: ' + _id);



  const data = await updateSettlement(
    _id as string,

    _settlementBank as string,
    _settlementAccountHolder as string,
    _settlementAccount as string,
    _settlementAccountImage as string,
    _settlementFeeRate as number,

  );


  try {
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
