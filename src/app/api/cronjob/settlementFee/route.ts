///import { NextResponse, NextRequest } from 'next/server';
import type { NextRequest } from 'next/server';
 



import {
  //getAllUsersForSettlementOfStore,

  getAllUsersForSettlementOfFee,

  updateSettlementAmountOfFee,

  getUserByEmail,
  insertOne
} from '@/lib/api/user';

///import { get } from 'lodash';

import { ethers, N } from "ethers";


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

  balanceOf,

} from "thirdweb/extensions/erc20";
import { getAll } from '@/lib/api/shop';
import { u } from 'uploadthing/dist/types-e8f81bbc';
import { parse } from 'path';

/*
import {
  sendTo,
} from "thirdweb/erc20";
*/


/*
import {

  useContract,
  useContractRead,

} from '@thirdweb-dev/react';

*/

/*
import { Network, Alchemy } from 'alchemy-sdk';




const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET, // Replace with your network.
};
*/



const chain = polygon;


// USDT Token (USDT)
const tokenContractAddressUSDT = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';







// sync function

const processSongpa = async (
  walletPrivateKey: string,
  feeAmount: string,
) => {

  let errorMessages = [];




  const client = createThirdwebClient({
    secretKey: process.env.THIRDWEB_SECRET_KEY || "",
  });
  
  
  const contract = getContract({
    client,
    chain: chain,
    address: tokenContractAddressUSDT, // erc20 contract from thirdweb.com/explore
  });


  // balance of wallet

  const personalAccount = privateKeyToAccount({
    client,
    privateKey: walletPrivateKey,
  });

  const wallet = smartWallet({
    chain: chain,
    factoryAddress: "0x9Bb60d360932171292Ad2b80839080fb6F5aBD97", // your own deployed account factory address
    sponsorGas: true,
  });

  const account = await wallet.connect({
    client: client,
    personalAccount: personalAccount,
  });

  const walletAddress = account.address;

  console.log('walletAddress: ' + walletAddress);




  /*
  const balance = await getBalance({
    contract,
    address: walletAddress,
  });
  

  const amount = balance.displayValue;
  */


  //The below token contract address corresponds to USDT
  //const tokenContractAddresses = ["0xdAC17F958D2ee523a2206206994597C13D831ec7"];

  //try {


  const tokenContractAddresses = [tokenContractAddressUSDT];
  






  const sendAmountToFee = feeAmount;


    let transactionHash = '';



      try {

        const toAddressFee = '0xcF8EE13900ECb474e8Ce89E7868C7Fd1ae930971';


        console.log("Sending to fee address: " + toAddressFee + " amount: " + sendAmountToFee);




          const transactionSendToFee = transfer({
            contract,
            to: toAddressFee,
            amount: sendAmountToFee,
          });

          const sendDataFee = await sendAndConfirmTransaction({
            transaction: transactionSendToFee,
            account: account,
          });

          console.log("Sent successfully!");

          console.log(`Transaction hash: ${sendDataFee.transactionHash}`);


          transactionHash = sendDataFee.transactionHash;
        




      } catch (error) {

        console.log("walletAddress: " + walletAddress + " error=====>" + error);

        ///console.log("error=====>" + error);


        errorMessages.push(error);

      }


      updateSettlementAmountOfFee(walletAddress, "0");

      errorMessages.push(`Transaction hash: ${transactionHash}`);



    return {
      walletAddress: walletAddress,
      errorMessages: errorMessages,
      
    };

}









/* ======================================

======================================= */


///export const GET = async (req: NextRequest, res: NextResponse) => {
export async function GET(request: NextRequest) {

  const resultsData = [] as any;


  const limit = 100;
  const page = 1;

  const results = await getAllUsersForSettlementOfFee(limit, page) as any;

  //console.log('results: ' + JSON.stringify(results));
  //{"totalCount":1,"users":[{"_id":"61f7b1b1b3b3b0001f000001","name":"John Doe","email":"aaa"}]}

  const users = results.users;
  const totalCount = results.totalCount;


  console.log('users: ' + JSON.stringify(users));
  console.log('/api/cronjob/settlement === getAllUsers === count: ' + users.length);



  // async function



  /*
  users.map(async (user: any) => {




    const walletPrivateKey = user.walletPrivateKey;


    const data = await processSongpa(walletPrivateKey);

    ///console.log('data: ' + JSON.stringify(data));

    const walletAddress = data.walletAddress;




  } );
   */




  try {


    for (let i = 0; i < users.length; i++) {

      const user = users[i];

      //users.map(async (user: any) => {

      const walletPrivateKey = user.walletPrivateKey;
      const settlementAmountOfFee = user.settlementAmountOfFee;

      //console.log('walletPrivateKey: ' + walletPrivateKey);

      
      const data = await processSongpa(
        walletPrivateKey,
        settlementAmountOfFee,
      );
      

      ///console.log('data: ' + JSON.stringify(data));

      //const walletAddress = data.walletAddress;

      //console.log('walletAddress: ' + walletAddress);
      

      resultsData.push({
        walletAddress: data.walletAddress,
        errorMessages: data.errorMessages,
      });

    }

    //} );

  } catch (error) {
      
      console.log("error=====>" + error);
  
  }
    

  console.log('users.length: ' + users.length);


  


  /*
  return NextResponse.json(
    { success: true, message: 'GET Request Success', 'resultsData': resultsData },
    { status: 200 }
  );
  */
  return Response.json({ success: true });
  

  

  
};

