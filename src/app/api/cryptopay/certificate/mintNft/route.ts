import { NextResponse, NextRequest } from 'next/server';

import { insertOne } from '@/lib/api/certificate';

///import { get } from 'lodash';

import {
  createThirdwebClient,
  getContract,
  sendAndConfirmTransaction,
} from "thirdweb";

//import { polygonAmoy } from "thirdweb/chains";
import { polygon } from "thirdweb/chains";

import { deployERC721Contract } from "thirdweb/deploys";
import {
  lazyMint,
  claimTo,

  
} from "thirdweb/extensions/erc721";


import {
  privateKeyToAccount,
  smartWallet,
  getWalletBalance,
  
 } from "thirdweb/wallets";



/* ======================================

======================================= */
export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json() as any;

  ///console.log(' product create  data: ' + data);
  
  // mint NFT

  if (!process.env.WALLET_PRIVATE_KEY) {
    
    // return error
    return NextResponse.json(
      { success: false, message: 'No WALLET_PRIVATE_KEY found' },
    );
  }
  if (!process.env.THIRDWEB_SECRET_KEY) {
    //throw new Error("No THIRDWEB_SECRET_KEY found");

    // return error
    return NextResponse.json(
      { success: false, message: 'No THIRDWEB_SECRET_KEY found' },
    );
  }


  try {
    
    //const chain = polygonAmoy;
    const chain = polygon;

    const client = createThirdwebClient({
      secretKey: process.env.THIRDWEB_SECRET_KEY,
    });
    
    
    const adminAccount = privateKeyToAccount({
      client,
      privateKey: process.env.WALLET_PRIVATE_KEY,
    }); // private key account
    



    


    /*

    const address = await deployERC721Contract({
      chain,
      client,
      account,
      type: "DropERC721",
      params: {
        name: "My Drop",
        symbol: "MYNFT",
      },
    });
    console.log("Contract address: ", address);
    const contract = getContract({ address, chain, client });
    const nfts = [
      {
        name: "Blue Star",
        description: "A blue star NFT",
        image: readFileSync("assets/blue-star.png"),
      },
      {
        name: "Red Star",
        description: "A red star NFT",
        image: readFileSync("assets/red-star.png"),
      },
      {
        name: "Yellow Star",
        description: "A yellow star NFT",
        image: readFileSync("assets/yellow-star.png"),
      },
    ];
    const transaction = lazyMint({
      contract: contract,
      nfts,
    });
    const data = await sendAndConfirmTransaction({
      transaction,
      account,
    });
    console.log("Lazy minted successfully!");
    console.log(`Transaction hash: ${data.transactionHash}`);

    */



    /*
    const balance = await getWalletBalance({
      client,
      chain,
      address: account.address,
    });
    console.log("Smart account balance:", balance.displayValue);
     */


    const nftDropAddress = "0x615cFFDA9789384089bDA01f4d3B465d1f0CFdcD";

    const contract = getContract({
      client,
      chain: chain,
      address: nftDropAddress, // deploy a drop contract from thirdweb.com/explore
    });

    

    // Lazy Mint NFT
    const nfts = [
      {
        name: "CORKY CERTIFICATE",
        description: "Corky Certificate NFT",
        //image: readFileSync("assets/corky-certificate.jpg"),
        image: "https://corky.vercel.app/images/corky/certificate.jpg",
      },

      /*
      {
        name: "Blue Star",
        description: "A blue star NFT",
        image: readFileSync("assets/blue-star.png"),
      },
      
      {
        name: "Red Star",
        description: "A red star NFT",
        image: readFileSync("assets/red-star.png"),
      },
      {
        name: "Yellow Star",
        description: "A yellow star NFT",
        image: readFileSync("assets/yellow-star.png"),
      },
      */
    ];

    

    const transactionLazyMint = lazyMint({
      contract: contract,
      nfts: nfts,
    });
    const data = await sendAndConfirmTransaction({
      transaction: transactionLazyMint,
      account: adminAccount,
    });


    console.log("Lazy minted successfully!");

    console.log(`Transaction data: ${data}`);
    console.log(`Transaction hash: ${data.transactionHash}`);
    
    







    
    // smartwallet account

    const personalAccount = privateKeyToAccount({
      client,
      privateKey: process.env.USER1_PRIVATE_KEY || "",
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


    console.log("Account address: ", account.address);


    
    // Claim NFT
    
    const transactionClaim = claimTo({
      contract: contract,
      to: account.address,
      quantity: BigInt(1),
    });
    

    
    const data2 = await sendAndConfirmTransaction({
      transaction: transactionClaim,
      account: account,
    }); 

    console.log("Claimed successfully!");
    console.log(`Transaction hash: ${data2.transactionHash}`);
    

    


  } catch (err) {
    console.error("Something went wrong: ", err);
  }








  /*
  const results = await insertOne(data);

  console.log('certificate / insertOne results: ' + results);



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
  */
  
};

