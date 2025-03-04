import { NextResponse, NextRequest } from 'next/server';

import {
  
  //getWithdrawerByUserid,
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

 import {
	mintTo,
	totalSupply,
	transfer,
	
	getBalance,
  

  
} from "thirdweb/extensions/erc20";




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

 


  try {

    // getUserByEmail

    const results = await getUserByEmail(userid) as any;




    const walletAddress = results.walletAddress;


    console.log('walletAddress: ' + walletAddress);




    const chain = polygon;

    const client = createThirdwebClient({
      secretKey: process.env.THIRDWEB_SECRET_KEY || "",
    });

    // USDT Token (USDT)
    const tokenContractAddressUSDT = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';

    const contractUSDT = getContract({
			client,
			chain: chain,
			address: tokenContractAddressUSDT, // erc20 contract from thirdweb.com/explore
		});

		const balance = await getBalance({
			contract: contractUSDT,
			address: walletAddress,
		});
		  


		console.log('walletAddress', walletAddress, 'balance', balance.displayValue);



		const totalAmount = parseFloat(balance.displayValue);








    return NextResponse.json(
      {
        success: true,
        message: 'GET Request Success',
        data: {
          walletAddress: walletAddress,
          balance: totalAmount,
        }
      },
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

