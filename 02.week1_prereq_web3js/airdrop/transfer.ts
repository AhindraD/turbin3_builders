import { Keypair, PublicKey, Connection, SystemProgram, Transaction, LAMPORTS_PER_SOL, sendAndConfirmTransaction } from "@solana/web3.js";
import dev_wallet from "./dev-wallet.json";

const from_keypair = Keypair.fromSecretKey(new Uint8Array(dev_wallet));
const to_wallet = new PublicKey('AHibwaXG2EVnD1jTvD93166tunfNecvMcVQhcQKL3UZv');
const conn = new Connection("https://api.devnet.solana.com");



async function empty_wallet() {
    try {
        const initail_balance = await conn.getBalance(from_keypair.publicKey);
        const transfer_instruction = SystemProgram.transfer({
            fromPubkey: from_keypair.publicKey,
            toPubkey: to_wallet,
            lamports: initail_balance
        });
        const txn = new Transaction();
        txn.feePayer = from_keypair.publicKey;
        txn.recentBlockhash = (await conn.getLatestBlockhash("confirmed")).blockhash;
        txn.add(transfer_instruction);

        //getting fees
        const fee = (await conn.getFeeForMessage(txn.compileMessage(), 'confirmed')).value || 0;

        //removing prev instruction and adding new one with fees
        txn.instructions.pop();
        txn.add(SystemProgram.transfer({
            fromPubkey: from_keypair.publicKey,
            toPubkey: to_wallet,
            lamports: initail_balance - fee
        }));
        const signature = await sendAndConfirmTransaction(
            conn,
            txn,
            [from_keypair]
        );
        console.log(`Sucess! Check the transaction at https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    } catch (error) {
        console.log(error);
    }
}
empty_wallet();












async function main() {
    try {
        const amount = 0.579;
        const transfer_instruction = SystemProgram.transfer({
            fromPubkey: from_keypair.publicKey,
            toPubkey: to_wallet,
            lamports: amount * LAMPORTS_PER_SOL
        });
        const txn = new Transaction();
        txn.feePayer = from_keypair.publicKey;
        txn.recentBlockhash = (await conn.getLatestBlockhash("confirmed")).blockhash;
        txn.add(transfer_instruction);

        const signature = await sendAndConfirmTransaction(
            conn,
            txn,
            [from_keypair]
        );

        console.log(`Sucess! Check the transaction at https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    } catch (error) {
        console.log(error);
    }
}