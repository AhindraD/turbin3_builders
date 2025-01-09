use bs58;
use solana_sdk::{
    pubkey::Pubkey,
    signature::{Keypair, Signer},
};
use std::io::{self, BufRead};

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn keygen() {
        let dev_kp = Keypair::new();
        //E77Yaqmg7tXKWDJ6j82LyoK7HkK17PpkT5qaFuPVrQkF
        println!("New wallet created: {}", dev_kp.pubkey().to_string());
        println!("----------------------------------------------------");
        println!("Private key as bytes array: ");
        println!("{:?}", dev_kp.to_bytes());
    }

    #[test]
    fn base58_to_wallet() {
        println!("Enter the base58 encoded wallet private key: ");
        let stdin = io::stdin();
        let base58_key = stdin.lock().lines().next().unwrap().unwrap();
        let wallet_bytes = bs58::decode(base58_key).into_vec().unwrap();
        println!("Wallet private key as bytes array: ");
        println!("{:?}", wallet_bytes);
    }

    #[test]
    fn wallet_to_base58() {
        println!("Enter the wallet private key as bytes array: ");
        let stdin = io::stdin();
        let wallet_bytes = stdin
            .lock()
            .lines()
            .next()
            .unwrap()
            .unwrap()
            .trim_start_matches('[')
            .trim_end_matches(']')
            .split(',')
            .map(|s| s.trim().parse::<u8>().unwrap())
            .collect::<Vec<u8>>();
        let base58_key = bs58::encode(wallet_bytes).into_string();
        println!("Wallet private key as base58: {:?}", base58_key);
    }

    #[test]
    fn airdrop() {}

    #[test]
    fn transfer_sol() {}
}
