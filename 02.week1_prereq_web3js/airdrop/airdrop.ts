import { Keypair, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import dev_wallet from "./wallet.json";

const dev_keypair = Keypair.fromSecretKey(new Uint8Array(dev_wallet));
const conn = new Connection("https://api.devnet.solana.com");

async function main() {
    const amount = 0.579;
    let balance_start = await conn.getBalance(dev_keypair.publicKey);
    console.log("Balance before airdrop: ", balance_start / LAMPORTS_PER_SOL);
    try {
        console.log(`Airdropping ${amount} SOL...`);
        const txn = await conn.requestAirdrop(dev_keypair.publicKey, amount * LAMPORTS_PER_SOL);
        console.log(`Check Transaction: https://explorer.solana.com/tx/${txn}?cluster=devnet`);
        setTimeout(async () => {
            let balance_end = await conn.getBalance(dev_keypair.publicKey);
            console.log("Balance after airdrop: ", balance_end / LAMPORTS_PER_SOL);
        }, 10000);
    } catch (error) {
        console.log(error);
    }
}

main()