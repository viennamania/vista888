import { NextResponse, NextRequest } from 'next/server';

import { insertOne } from '@/lib/api/certificate';

import { getUserWalletPrivateKeyByWalletAddress } from '@/lib/api/user';

///import { get } from 'lodash';


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

 import {
  mintTo,
  mintAdditionalSupplyTo,
  totalSupply,
  nextTokenIdToMint,

  safeTransferFrom,

  tokenUri,

} from "thirdweb/extensions/erc1155";



import { parse } from 'path';
import { Certificate } from 'crypto';


import { upload } from "thirdweb/storage";

import nodemailer from 'nodemailer';



/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  ///const data = await req.json() as any;

  ///console.log(' product create  data: ' + data);
  

  //const toEmail = data.toEmail;

  const toEmail = 'creath.park@gmail.com';




  try {

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>침해사실 내용증명</title>
      </head>
      <body>
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>CORKY</h2>
          
          <h1>당신은 침해했습니다.</h1>
  
        </div>
      </body>
    </html>
    `;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'doingdoit.cs@gmail.com',
      
        pass: 'jspk xmnr dmeo pdhu', // Gmail '앱 비밀번호'

      },
    });


  // 전송할 이메일 내용 설정
  const mailOptions = {

    from: 'doingdoit.cs@gmail.com',

    //to: 'songpalabs@gmail.com', //필자의 naver 계정에 보내보았다.

    to: toEmail,

    subject: '[CORKY] 저작권 침해사실 내용증명',
    
    //text: html,

    html: html,

  };

  // 이메일 전송
  const info = await transporter.sendMail(mailOptions);

  console.log('이메일 전송 성공====', info.response);





    const results = {
      toEmail,
    };
    


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

