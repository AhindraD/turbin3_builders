import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "./wallet/wba-wallet.json"
import { getExplorerLink } from "@solana-developers/helpers";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);
const mint_authority = keypair.publicKey;
const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("5QQXFaZX9mmmGGqEcZSPFKgfr18BdHyvjfVys2DYLk3E");

(async () => {
    try {
        //https://solana.com/developers/courses/tokens-and-nfts/token-program

        // Create an ATA
        const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, mint_authority);
        console.log(`Associated Token Address: ${ata.address.toBase58()}`);
        const ata_exp_link = getExplorerLink("address", ata.address.toBase58(), 'devnet');
        console.log(`✅ Finished! Created ATA: ${ata_exp_link}`);

        // Mint to ATA
        const mintTx = await mintTo(connection, keypair, mint, ata.address, mint_authority, token_decimals * 6969n);
        console.log(`Your mint txid: ${mintTx}`);
        const token_mint_link = getExplorerLink("tx", mintTx, 'devnet');
        console.log(`✅ Finished! Minted token: ${token_mint_link}`);
    } catch (error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
