import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program, Wallet } from "@coral-xyz/anchor";
import { IDL, WbaPrereq } from "./programs/wba_prereq";
import wallet from "./wallet.json";

const dev_keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com");
const github = Buffer.from("AhindraD", "utf-8");
const provider = new AnchorProvider(connection, new Wallet(dev_keypair), { commitment: "confirmed" });

const program: Program<WbaPrereq> = new Program(IDL, provider);

const enrollment_seeds =
    [
        Buffer.from("prereq"),
        dev_keypair.publicKey.toBuffer(),
    ];
const [enrollment_key, _bump] =
    PublicKey.findProgramAddressSync(enrollment_seeds, program.programId);

async function main() {
    try {
        const txn = await program.methods
            .complete(github)
            .accounts({ signer: dev_keypair.publicKey, })
            .signers([dev_keypair])
            .rpc();
        console.log(`Check Transaction: https://explorer.solana.com/tx/${txn}?cluster=devnet`);
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}
main();