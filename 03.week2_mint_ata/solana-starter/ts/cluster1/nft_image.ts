import wallet from "./wallet/wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"
import path from "path"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

const file_path = path.resolve(__dirname, "assets/master-chef.png");

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        //1. Load image
        const image = await readFile(file_path);
        //2. Convert image to generic file.
        const nft_image = createGenericFile(image, "master-chef-nft.png",
            {
                displayName: "Master Chef NFT",
                contentType: "image/png"
            });
        //3. Upload image

        // const image = ???

        const [myUri] = await umi.uploader.upload([nft_image]);
        const correct_uri = myUri.replace("https://arweave.net/", "https://devnet.irys.xyz/");
        console.log("Your image URI: ", correct_uri);
        //"https://devnet.irys.xyz/ELkWp6e2wodfCiJQ9avnzLDd8VYkqiLys8e9ZyByHqbL
    }
    catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
