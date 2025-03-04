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

  const userid = req.nextUrl.searchParams.get('userid');
 

  console.log('userid: ' + userid);

  if (!userid) {
    return NextResponse.json(
      { success: false, message: 'GET Request Failed' },
      { status: 500 }
    );
  }

 


  // getUserByEmail

  const results = await getUserByEmail(userid) as any;

  console.log('results: ' + JSON.stringify(results));

  // if exists, then return the user
  if (results) {

    /*
    {
      "success":true,
      "message":"GET Request Success",
      "data":{"id":5408981,"email":"creath.park@gmail.com","password":"Abcd1234","name":null,"nickname":null,"avatar":null,"regType":null,"mobile":null,"walletAddress":"0xBb30E3570a1Ca4e956B46e25e0D45827db01B379","walletPrivateKey":"0x04afb055e58bf1e0eb4267aeaaa99e587a44dc07555b1b1b4243cbca4803e605","createdAt":"2024-06-20T12:16:35.845Z"}}
    */

    const walletAddress = results.walletAddress;


    console.log('walletAddress: ' + walletAddress);


    return NextResponse.json(
      { success: true, message: 'GET Request Success', data: walletAddress },
      { status: 200 }
    );

  }


  


  try {


  
    let walletPrivateKey = ethers.Wallet.createRandom().privateKey;

    let walletAddress = '';


    const chain = polygon;

    const client = createThirdwebClient({
      secretKey: process.env.THIRDWEB_SECRET_KEY || "",
    });




      // smartwallet account

      const personalAccount = privateKeyToAccount({
        client,
        ///privateKey: process.env.USER1_PRIVATE_KEY || "",
        
        privateKey: walletPrivateKey,

      }); // private key account
      

    // Configure the smart wallet
    const wallet = smartWallet({
      chain: chain,
      factoryAddress: "0x655934C0B4bD79f52A2f7e6E60714175D5dd319b", // your own deployed account factory address
      sponsorGas: true,
    });
    
    // Connect the smart wallet
    const account = await wallet.connect({
      client: client,
      personalAccount: personalAccount,
    });


    walletAddress = account.address;


    const results = await insertOne(
      //data
      {
        name: '',
        email: userid,
        password: '',
        walletAddress: walletAddress,
        walletPrivateKey: walletPrivateKey,
      }
    );

    if (!results) {
      return NextResponse.json(
        { success: false, message: 'Insert One Failed' },
        { status: 500}
      );
    }



    /*
    {
      "success":true,
      "message":"Insert One Success",
      "data":{"acknowledged":true,"insertedId":"6674eda25dd0282e004e77eb"}}
    */

    return NextResponse.json(
      { success: true, message: 'Insert One Success', data: walletAddress },
      { status: 200 }
    );



  } catch (error) {
    console.log(error);
    return NextResponse.json(
      `First Error: ${error}`,
      { status: 500 }
    );
  }
  
};

