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


import {
  mintTo,
  totalSupply,
  nextTokenIdToMint,
} from "thirdweb/extensions/erc1155";


import {
  privateKeyToAccount,
  smartWallet,
  getWalletBalance,
  
 } from "thirdweb/wallets";
import { parse } from 'path';



/* ======================================

======================================= */
export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json() as any;

  ///console.log(' product create  data: ' + data);
  


  const chain = polygon;

  const client = createThirdwebClient({
    secretKey: process.env.THIRDWEB_SECRET_KEY || "",
  });
  
  
    
  // smartwallet account
  const personalAccount = privateKeyToAccount({
    client,
    privateKey: process.env.WALLET_PRIVATE_KEY || "",
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


  //console.log("=====Account address: ", account.address);


  // erc1155 contract address
  const nftContractAddress = "0x2682057d39ED5F9E1f296aeD5AE5f3ab6A8626d2";

  const contract = getContract({
    client,
    chain: chain,
    //address: nftDropAddress, // deploy a drop contract from thirdweb.com/explore
    address: nftContractAddress, // deploy a drop contract from thirdweb.com/explore
  });



  const toAddress = data.creatorWalletAddress;

  console.log("toAddress: ", toAddress);

  const imageUrl = data.avatar;



  const transactionMintTo = mintTo({
    contract,
    to: toAddress,
    supply: BigInt(10000),
    nft: {
      name: "Corky Certificate",
      description: "Corky Certificate NFT",
      image: imageUrl,


    },
  });

  const sendData = await sendAndConfirmTransaction({
    transaction: transactionMintTo,
    account: account,
  });



  /*
  const corkyAddress = "0xD9233AcE3EFB93dC47bB920E341049A8605548aE";

  const transactionMintToCorky = mintTo({
    contract,
    to: corkyAddress,
    supply: BigInt(2000),
    nft: {
      name: "Corky Certificate",
      description: "Corky Certificate NFT",
      image: imageUrl,


    },
  });

  const sendDataCorky = await sendAndConfirmTransaction({
    transaction: transactionMintToCorky,
    account: account,
  });
  */



  console.log("Minted successfully!");


  console.log(`Transaction hash: ${sendData.transactionHash}`);


  const nextTokenId = await nextTokenIdToMint({
    contract: contract,
  });

  console.log("Next Token ID to mint: ", nextTokenId);
  // BigInt to string
  console.log("Next Token ID to mint: ", nextTokenId.toString());

  

  const tokenId = parseInt(nextTokenId.toString(), 10) -1;


  const results = await insertOne(
    {
      creatorWalletAddress: data.creatorWalletAddress,
      contractAddress: nftContractAddress,
      tokenId: tokenId,
      category: data.category,
      avatar: data.avatar,

      sku: data.sku,
      listPrice: data.listPrice,
      price: data.price,
      status: data.status,
      rating: data.rating,
      point: data.point,
      stock: data.stock,
      sales: data.sales,
      inquiry: data.inquiry,
    } as any
  
  );

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
  
};

