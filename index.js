require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.API_KEY;
const wallet = process.env.WALLET_ADDRESS;

async function analyzeWallet() {
    try {
        const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${wallet}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
        
        const response = await axios.get(url);
        const transactions = response.data.result;

        console.log(`Wallet Address: ${wallet}`);
        console.log(`Total Transactions: ${transactions.length}`);

        let totalGasUsed = 0;
        let totalGasFeeInEth = 0;
        transactions.forEach(tx => {
            const gasUsed = parseInt(tx.gasUsed);
            const gasPrice = parseInt(tx.gasPrice);
            const gasFee = gasUsed * gasPrice;
            totalGasUsed += gasUsed;
            totalGasFeeInEth += gasFee / 1e18;
        });

        console.log(`Total Gas Used: ${totalGasUsed}`);
        console.log(`Total Gas Fee (in ETH): ${totalGasFeeInEth.toFixed(6)}`);
    } catch (error) {
        console.error("Error fetching wallet data:", error.message);
    }
}

analyzeWallet();


