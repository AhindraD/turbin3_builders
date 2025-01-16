import wallet from "./wallet/wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, percentAmount, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { json } from "stream/consumers";

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://devnet.irys.xyz/ELkWp6e2wodfCiJQ9avnzLDd8VYkqiLys8e9ZyByHqbL"
        const metadata = {
            name: "Master Chef Spartan NFT",
            symbol: "HALO",
            description: "A Spartan NFT, the first of its kind. Build for Turbin3 Q1 2025 Builders' Cohort.",
            image: image,
            external_url: "https://github.com/AhindraD/turbin3_builders",
            attributes: [
                { trait_type: "Level", value: 'Master' },
                { trait_type: "Class", value: 'Spartan' },
                { trait_type: "Team", value: 'Turbin3' }
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: "https://devnet.irys.xyz/ELkWp6e2wodfCiJQ9avnzLDd8VYkqiLys8e9ZyByHqbL"
                    },
                ],
                category: "image",
            },
            creators: [{
                address: "5QQXFaZX9mmmGGqEcZSPFKgfr18BdHyvjfVys2DYLk3E",
                share: 333,
                verified: true
            }]
        };
        const myUri = await umi.uploader.uploadJson(metadata);
        const correct_uri = myUri.replace("https://arweave.net/", "https://devnet.irys.xyz/");
        console.log("Your metadata URI: ", correct_uri);
        // https://devnet.irys.xyz/BggFib5qQazYM6sT3UJXAVHdfS4BkE9Uoav6WZQrCdqj
    }
    catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
})();