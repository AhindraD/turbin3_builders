import { Connection, Keypair, PublicKey } from "@solana/web3.js"
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor"
import { IDL, Turbin3Prereq } from "./programs/Turbin3_prereq";
import turbine_wallet from "./Turbin3-wallet.json"

const turbine_keypair = Keypair.fromSecretKey(new Uint8Array(turbine_wallet));
const connection = new Connection("https://api.devnet.solana.com");
const github = Buffer.from("AhindraD", "utf-8");
const provider = new AnchorProvider(connection, new Wallet(turbine_keypair), { commitment: "confirmed" });

const program: Program<Turbin3Prereq> = new Program(IDL, provider);

//PDA
const enrollment_seed = [Buffer.from("prereq"), turbine_keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(enrollment_seed, program.programId);

async function enroll() {
    try {
        const txn = await program.methods
            .complete(github)
            .accounts({
                signer: turbine_keypair.publicKey,
            })
            .signers([turbine_keypair])
            .rpc();

        console.log(`SUCCESS! Check your transaction: 
            https://explorer.solana.com/tx/${txn}?cluster=devnet`);
    } catch (error) {
        console.log("Error enrolling: ", error);
    }
}

enroll();