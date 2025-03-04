import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { updateBusiness } from '@/lib/api/shop';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  const _id = req.nextUrl.searchParams.get('_id');
  const _businessName = req.nextUrl.searchParams.get('_businessName');
  const _representativeName = req.nextUrl.searchParams.get('_representativeName');
  const _businessType = req.nextUrl.searchParams.get('_businessType');
  const _businessCategory = req.nextUrl.searchParams.get('_businessCategory');
  const _businessRegistrationNumber = req.nextUrl.searchParams.get('_businessRegistrationNumber');
  const _businessRegistrationImage = req.nextUrl.searchParams.get('_businessRegistrationImage');

  const _businessRegistrationAddress = req.nextUrl.searchParams.get('_businessRegistrationAddress');

  const _mailOrderRegistrationNumber = req.nextUrl.searchParams.get('_mailOrderRegistrationNumber');
  const _mailOrderRegistrationImage = req.nextUrl.searchParams.get('_mailOrderRegistrationImage');

  const _businessPhone = req.nextUrl.searchParams.get('_businessPhone');
  const _businessFax = req.nextUrl.searchParams.get('_businessFax');
  const _memo = req.nextUrl.searchParams.get('_memo');


  console.log('_id: ' + _id);
  console.log('_businessName: ' + _businessName);
  console.log('_representativeName: ' + _representativeName);

  console.log('_businessRegistrationImage: ' + _businessRegistrationImage);
  


  const data = await updateBusiness(
    _id as string,

    _businessName as string,
    _representativeName as string,
    _businessType as string,
    _businessCategory as string,
    _businessRegistrationNumber as string,
    _businessRegistrationImage as string,
    _businessRegistrationAddress as string,
    _mailOrderRegistrationNumber as string,
    _mailOrderRegistrationImage as string,
    //_businessPhone as string,
    //_businessFax as string,
    //_memo as string,
  );


  try {
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
