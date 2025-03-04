import { NextResponse, NextRequest } from 'next/server';

import {
  getUserByEmail,
  insertOne
} from '@/lib/api/user';

///import { get } from 'lodash';

import { ethers } from "ethers";


import {
  createThirdwebClient,
  getContract,
  sendAndConfirmTransaction,
} from "thirdweb";

//import { polygonAmoy } from "thirdweb/chains";
import { polygon } from "thirdweb/chains";

import {
  privateKeyToAccount,
  smartWallet,
  getWalletBalance,
  
 } from "thirdweb/wallets";


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

    const storecode = req.nextUrl.searchParams.get('storecode');
    const memberid = req.nextUrl.searchParams.get('memberid');




    if (!storecode || !memberid) {
    return NextResponse.json(
        { success: false, message: 'GET Request Failed' },
        { status: 500 }
    );
    }

 

    const userid = memberid + '@' + storecode;

    const results = await getUserByEmail(userid);


    // if exists, then return the user
    if (results) {

        // creath.park@gmail.com@2000001
        // storecode is last of the userid split by @

        ///const storecode = userid.substring(userid.lastIndexOf('@') + 1);
        ///const memberid = userid.substring(0, userid.lastIndexOf('@'));


        // api call to get the history of the user

        // http://store.unove.space/api/usdcReceiveHistory?storecode=2000001&memberid=creath.park@gmail.com

        console.log('storecode: ' + storecode);
        console.log('memberid: ' + memberid);
        

        const results = await fetch('http://store.unove.space/api/usdcReceiveHistory?storecode=' + storecode + '&memberid=' + memberid);
        const data = await results.json() as any;

        /*
        {"result":1,"data":{"member_id":"creath.park@gmail.com","store_code":"2000001","dealer_seq":"100000001","txid":"0xc5e12d2a8f60f28b0c7a5d226d9a47ab1106a7459e264cd5b0dcb22732382b3d","regist_date":"2024-07-03 02:03:52","eth_bill":"0.1","txid_time":"1719972232","category":"receive","eth_fee":"0.001","eth_dealer":"11111","eth_finish":"0.099","eth_php":"10.00","eth_php_user":"1381","eth_php_finish":"138.1","other_address":"0x","balance_yn":"Y","ins_date":"2024-07-03 02:03:52","coin_type":"USDT","fee_amount":"0.00000","dealer_balance_yn":"Y","block_number":"14478428","confirmations":"100","before_eth_php":null,"before_eth_php_user":null,"before_eth_php_finish":null,"etc":null}}
        */

        //console.log('data: ', data);




        return NextResponse.json(
            { success: true, message: 'GET Request Success', data: data?.data },
            { status: 200 }
        );

    }



    return NextResponse.json(
    { success: false, message: 'GET Request Failed' },
    { status: 500 }
    );



  
};

