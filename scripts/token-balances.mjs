// Imports the Alchemy SDK
import { Network, Alchemy } from 'alchemy-sdk';

import dotenv from 'dotenv';


dotenv.config();


// Configures the Alchemy SDK
const config = {
    apiKey: process.env.ALCHEMY_API_KEY, // Replace with your API key
    network: Network.ETH_MAINNET, // Replace with your network
};

// Creates an Alchemy object instance with the config to use for making requests
const alchemy = new Alchemy(config);

const main = async () => {

    console.log("Fetching token balances...");

    console.log("apiKey: ", process.env.ALCHEMY_API_KEY);
    console.log("network: ", Network.ETH_MAINNET);

    //Initialize variables for the parameters
    let vitalikAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
    let usdcContract = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
    
    //Call the method to return the token balances for this address
    let response = await alchemy.core.getTokenBalances(vitalikAddress, [usdcContract])

    //Logging the response to the console
    console.log(response)
};


console.log("Running token balances script...");

try {

    main();

} catch (error) {

    console.error("Error: ", error);

}