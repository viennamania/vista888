import { NextResponse, NextRequest } from 'next/server';
import { insertOne } from '@/lib/api/user';
import { ethers } from "ethers";
import {  createThirdwebClient } from "thirdweb";
//import { polygonAmoy } from "thirdweb/chains";
import { polygon } from "thirdweb/chains";

import {
  privateKeyToAccount,
  smartWallet,
  getWalletBalance,
 } from "thirdweb/wallets";


/* ======================================

======================================= */
export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json() as any;

  try {

    let walletPrivateKey = ethers.Wallet.createRandom().privateKey;

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
      factoryAddress: "0x9Bb60d360932171292Ad2b80839080fb6F5aBD97", // your own deployed account factory address
      sponsorGas: true,
    });
    
    // Connect the smart wallet
    const account = await wallet.connect({
      client: client,
      personalAccount: personalAccount,
    });


    const walletAddress = account.address;


    const results = await insertOne(
      //data
      {
        name: data.name,
        email: data.email,
        password: data.password,
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

    return NextResponse.json(
      { success: true, message: 'Insert One Success', data: results },
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

