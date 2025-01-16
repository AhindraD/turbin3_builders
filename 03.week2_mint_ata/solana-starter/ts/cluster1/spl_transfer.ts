import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "./wallet/wba-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { getExplorerLink } from "@solana-developers/helpers";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);
const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("5QQXFaZX9mmmGGqEcZSPFKgfr18BdHyvjfVys2DYLk3E");

// Recipient address
const to = new PublicKey("FofguT8vXbDCR8iCdEhGJmqM5fWVgf2akHTk3MavBMrQ");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const fromTokenAcc = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey,
        )

        // Get the token account of the toWallet address, and if it does not exist, create it
        const toTokenAcc = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to
        )
        // Transfer the new token to the "toTokenAccount" we just created
        const sig_hash = await transfer(
            connection,
            keypair,
            fromTokenAcc.address,
            toTokenAcc.address,
            keypair.publicKey,
            token_decimals * 13n
        )
        const token_transfer_link = getExplorerLink("tx", sig_hash, 'devnet');
        console.log(`✅ Finished! Transferred token: ${token_transfer_link}`);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();