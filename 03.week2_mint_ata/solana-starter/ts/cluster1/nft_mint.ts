import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "./wallet/wba-wallet.json"
import base58 from "bs58";
import { PublicKey } from "@solana/web3.js";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);
const metadata_uri = "https://devnet.irys.xyz/t1Spkr56vzPjGmFQV7S8W9TiV3G876aycZq6Wss9zhT";

(async () => {
    //https://developers.metaplex.com/token-metadata/guides/javascript/create-an-nft
    let tx = createNft(umi, {
        mint: mint,
        sellerFeeBasisPoints: percentAmount(5.5),
        name: 'Master Chef Spartan NFT',
        uri: metadata_uri,
        symbol: 'HALO',
        collection: {
            key: mint.publicKey,
            verified: false
        },
    })
    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);

    console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)
    //https://explorer.solana.com/tx/4ug7nzvR2qFcv65CFQXMNJy5swb6gzefLMooJU7eEZjmprP6QWb3PJHdqDH8peC4955t1dRCjVxm96nSR86RkhFV?cluster=devnet
    //https://explorer.solana.com/address/FXESkJELUiLnuNJbhU76TdPsGuzqp6jfGZw42qCoGDP8?cluster=devnet

    //https://explorer.solana.com/address/6X1EaiVhcn8z3GNb2nmtBDvoA33sr87AMfcp5rNkiuMf/metadata?cluster=devnet


    console.log("Mint Address: ", `https://solana.fm/address/${mint.publicKey}/transactions?cluster=devnet-alpha`)
})();