use bs58;
use solana_client::rpc_client::RpcClient;
use solana_program::{pubkey::Pubkey, system_instruction::transfer};
use solana_sdk::{
    signature::{read_keypair_file, Keypair, Signer},
    transaction::Transaction,
};
use std::io::{self, BufRead};
use std::str::FromStr;

const RPC_URL: &str = "https://api.devnet.solana.com";

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
    fn airdrop() {
        let dev_wallet: Keypair =
            read_keypair_file("dev-wallet.json").expect("Couldn't find wallet file");
        let rpc = RpcClient::new(RPC_URL);

        match rpc.request_airdrop(&dev_wallet.pubkey(), 500_000_000u64) {
            Ok(txn_hash) => {
                println!("Airdrop successful!");
                println!(
                    "https://explorer.solana.com/tx/{}?cluster=devnet",
                    txn_hash.to_string()
                );
            }
            Err(e) => {
                println!("Airdrop failed: {:?}", e);
            }
        }
    }

    #[test]
    fn transfer_sol() {
        let from_wallet: Keypair =
            read_keypair_file("dev-wallet.json").expect("Couldn't find wallet file");
        let rpc = RpcClient::new(RPC_URL);
        let to_wallet = Pubkey::from_str("AHibwaXG2EVnD1jTvD93166tunfNecvMcVQhcQKL3UZv").unwrap();

        let recent_blockhash = rpc
            .get_latest_blockhash()
            .expect("Couldn't get recent blockhash");

        let transaction = Transaction::new_signed_with_payer(
            &[transfer(&from_wallet.pubkey(), &to_wallet, 300_000_000u64)],
            Some(&from_wallet.pubkey()),
            &vec![&from_wallet],
            recent_blockhash,
        );

        let txn = rpc
            .send_and_confirm_transaction(&transaction)
            .expect("Couldn't send transaction");
        println!("Transaction Successful!");
        println!("https://explorer.solana.com/tx/{}?cluster=devnet", txn);
    }
}
