import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "./wallet/wba-wallet.json";
import { getExplorerLink } from "@solana-developers/helpers";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);
const mint_authority = keypair.publicKey;
const mint_decimals = 6;
const confirm_options = {
    commitment: commitment,
    skipPreflight: false,
};

(async () => {
    try {
        // https://solana.com/developers/courses/tokens-and-nfts/token-program
        const mint = await createMint(connection, keypair, mint_authority, mint_authority, mint_decimals, undefined, confirm_options);
        console.log(`Mint-Authority Pubkey: ${keypair.publicKey.toBase58()}`);
        const mint_explorer_link = getExplorerLink("address", mint.toString(), 'devnet');
        console.log(`✅ Finished! Created token mint: ${mint_explorer_link}`);
    } catch (error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
