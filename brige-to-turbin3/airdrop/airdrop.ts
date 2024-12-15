import { Keypair, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import wallet from "./wallet.json";

const dev_keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
// console.log(`Public key: ${dev_keypair.publicKey.toBase58()}`);
const connection = new Connection("https://api.devnet.solana.com");

async function main() {
    let balance = await connection.getBalance(dev_keypair.publicKey);
    console.log(`Balance Before: ${balance / LAMPORTS_PER_SOL} SOL`);
    try {
        console.log(`Airdropping 2 SOL...`);
        const txn = await connection.requestAirdrop(dev_keypair.publicKey, LAMPORTS_PER_SOL * 2);
        console.log(`Check Transaction: https://explorer.solana.com/tx/${txn}?cluster=devnet`);
        balance = await connection.getBalance(dev_keypair.publicKey);
        console.log(`Balance After: ${balance / LAMPORTS_PER_SOL} SOL`);
    }
    catch (e) {
        console.log(`ERROR: ${e}`);
    }
}
main();