import type { NextApiRequest, NextApiResponse } from 'next';

import { NextResponse, NextRequest } from 'next/server';



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
    Network,
    Alchemy,
    fromHex,
    SortingOrder,
    AssetTransfersCategory,
} from 'alchemy-sdk';
  
/*
const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);
*/


/*
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
*/

export const GET = async (req: NextRequest, res: NextResponse) => {






    try {

  
        console.log("Fetching token balances...");
  
        //console.log("apiKey: ", process.env.ALCHEMY_API_KEY);
        //console.log("network: ", Network.ETH_MAINNET);
      
        //Initialize variables for the parameters
        //let vitalikAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
        //let usdcContract = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
        
        //Call the method to return the token balances for this address
        /*
        let response = await alchemy.core.getTokenBalances(vitalikAddress, [usdcContract]);
      
        //Logging the response to the console
        console.log(response);
        */
      
               /*
        curl https://eth-mainnet.alchemyapi.io/v2/QWGkMRZfzmQ9yLfSDqhyIdSb2mmj-wWI \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"alchemy_getTokenBalances","params": ["0x2111b6A49CbFf1C8Cc39d13250eF6bd4e1B59cF6", ["0xB9d07392753E0c76eb44158b8A769f29B1f63D01"]],"id":"1"}'
        */


        // USDT Token (USDT)
        const tokenContractAddressUSDT = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';



        const walletAddress = "0xAeB385c91131Efd90d60b85D143Dd0467e161a7d";



        // call the method to return the token balances for this address
        const resuestId = '1';

        // eth
        ///const data = await fetch(`https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`, {
        // polygon
        // https://polygon-mainnet.g.alchemy.com/v2/your-api-key

        // https://polygon-mainnet.alchemyapi.io/v2/your-api-key

        const data = await fetch(`https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'alchemy_getTokenBalances',
                params: [walletAddress, [tokenContractAddressUSDT]],
                id: resuestId,
            }),
        });

        const response = await data.json() as any;

        console.log(response);
        /*
        {
            jsonrpc: '2.0',
            id: '1',
            result: {
                address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
                tokenBalances: [ [Object] ]
            }
        }

        $wei = hexdec($result['tokenBalances']['0']['tokenBalance']);

        $balance = $wei / pow(10, 18);


        */


        const balanceBigNumber = parseInt(response.result.tokenBalances[0].tokenBalance);

        console.log('balanceBigNumber: ' + balanceBigNumber);

        const balance = balanceBigNumber / Math.pow(10, 6);

        console.log('balance: ' + balance);


  
    


    
  
    } catch (error) {
  
      console.log("error=====>" + error);
  
    }


    ///res.status(200).json({ name: 'John Doe' })



    return NextResponse.json(
        { success: true, message: 'Insert One Success'},
        { status: 200 }
    );


}