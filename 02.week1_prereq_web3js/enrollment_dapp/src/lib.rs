use solana_sdk::{
    pubkey::Pubkey,
    signature::{Keypair, Signer},
};

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn keygen() {
        let dev_kp = Keypair::new();
        println!("New wallet created: {}", dev_kp.pubkey().to_string());
        println!("----------------------------------------------------");
        println!("Private key as bytes array: ");
        println!("{:?}", dev_kp.to_bytes());
    }

    #[test]
    fn airdrop() {}

    #[test]
    fn transfer_sol() {}
}
