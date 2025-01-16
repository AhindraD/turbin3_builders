import wallet from "./wallet/wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import {
    createMetadataAccountV3,
    CreateMetadataAccountV3InstructionAccounts,
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { getExplorerLink } from "@solana-developers/helpers";

// Define our Mint address
const mint = publicKey("5QQXFaZX9mmmGGqEcZSPFKgfr18BdHyvjfVys2DYLk3E")

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {
        // Start here
        let accounts: CreateMetadataAccountV3InstructionAccounts = {
            mint: mint,
            mintAuthority: signer,
            payer: signer,
            updateAuthority: signer
        }

        let data: DataV2Args = {
            name: "Whal3",
            symbol: "WH3",
            uri: "https://arweave.net/Whal3",
            sellerFeeBasisPoints: 300, // 3% royalty fee
            creators: [
                {
                    address: publicKey("5QQXFaZX9mmmGGqEcZSPFKgfr18BdHyvjfVys2DYLk3E"),
                    share: 100,
                    verified: false
                }
            ],
            collection: {
                key: publicKey("5QQXFaZX9mmmGGqEcZSPFKgfr18BdHyvjfVys2DYLk3E"),
                verified: false
            },
            uses: null
        }

        let args: CreateMetadataAccountV3InstructionArgs = {
            data: data,
            isMutable: true,
            collectionDetails: null
        }

        let tx = createMetadataAccountV3(
            umi,
            {
                ...accounts,
                ...args
            }
        )

        let result = await tx.sendAndConfirm(umi);
        console.log(bs58.encode(result.signature));
        const sign_explorere_link = getExplorerLink("tx", bs58.encode(result.signature), 'devnet');
        console.log(`✅ Finished! Check out your TX here:\n${sign_explorere_link}`);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
