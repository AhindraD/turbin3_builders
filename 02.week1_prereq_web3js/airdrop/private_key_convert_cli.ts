import bs58 from 'bs58';
// import promptSync from 'prompt-sync';

const prompt = require('prompt-sync')();
const base58ToWallet = () => {
    const base58 = prompt("Enter Base58-encoded private key: ");
    const wallet = bs58.decode(base58);
    console.log("Decoded Wallet (Byte Array):", wallet);
};


const walletToBase58 = () => {
    const wallet = prompt("Enter Byte Array (comma-separated values): ");
    const walletArray = wallet.split(',').map(Number);
    const base58 = bs58.encode(Buffer.from(walletArray));
    console.log("Encoded Base58 Private Key:", base58);
};


const choice = prompt("Choose an option (1: Base58 to Wallet(Byte Array), 2: Wallet(Byte Array) to Base58): ");
if (choice === '1') base58ToWallet();
else if (choice === '2') walletToBase58();
else console.log("Invalid choice.");