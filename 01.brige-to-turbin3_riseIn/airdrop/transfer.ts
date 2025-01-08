import { Keypair, Connection, SystemProgram, PublicKey, Transaction, sendAndConfirmTransaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import wallet from "./wallet.json";

const from_wallet = Keypair.fromSecretKey(new Uint8Array(wallet));
const to_wallet = new PublicKey('FofguT8vXbDCR8iCdEhGJmqM5fWVgf2akHTk3MavBMrQ');
const connection = new Connection("https://api.devnet.solana.com");

async function main() {
    try {
        const transfer_instruction = SystemProgram.transfer({
            fromPubkey: from_wallet.publicKey,
            toPubkey: to_wallet,
            lamports: 1.3 * LAMPORTS_PER_SOL
        })

        const txn = new Transaction();
        txn.feePayer = from_wallet.publicKey;
        txn.recentBlockhash = (await connection.getLatestBlockhash("confirmed")).blockhash;
        console.log(`Blockhash: ${txn.recentBlockhash}`);
        txn.add(transfer_instruction);

        const signature = await sendAndConfirmTransaction(
            connection,
            txn,
            [from_wallet]
        )

        console.log(`Check Transaction: https://explorer.solana.com/tx/${signature}?cluster=devnet`);

    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}
main();