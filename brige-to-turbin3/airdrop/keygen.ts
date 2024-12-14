import { Keypair } from "@solana/web3.js";

function main() {
    // AHibwaXG2EVnD1jTvD93166tunfNecvMcVQhcQKL3UZv
    let dev_keypair = Keypair.generate();
    console.log(`Public key: ${dev_keypair.publicKey.toBase58()}`);
    console.log(`Secret key: ${dev_keypair.secretKey}`);
}
main();



// const grind_prefix = "AHI";
// while (!dev_keypair.publicKey.toBase58().toLowerCase().startsWith(grind_prefix)) {
//     console.log(`Public key: ${dev_keypair.publicKey.toBase58()}`);
//     dev_keypair = Keypair.generate();
// }