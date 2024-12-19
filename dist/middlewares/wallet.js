"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const provider = new ethers_1.ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`);
// const wallet = ethers.Wallet.createRandom(provider);
// async function withdrawFunds(to: string, amount: string) {
//     const balance = getWalletBalance(wallet.address)
//     const tx = await wallet.sendTransaction({
//         to,
//         value: ethers.parseEther(amount),
//     });
//     console.log(`Transaction sent: ${tx.hash}`);
// }
// async function monitorDeposit(address:string) {
//     provider.on("block", async (blockNumber:any) => {
//       const transactions = await provider.getBlockWithTransactions(blockNumber);
//       transactions.transactions.forEach((tx) => {
//         if (tx.to === address) {
//           console.log(`Deposit detected: ${tx.value.toString()} wei`);
//           // Update database balance here
//         }
//       });
//     });
//   }
