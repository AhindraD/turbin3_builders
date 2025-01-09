![Screenshot 2025-01-08 153657](https://github.com/user-attachments/assets/6f0556bf-1fc9-45bd-8634-17f686b1bd7e)

# Turbin3 2025 Q1 Cohort

- # WEEK1: Task 02 - RUST : Interaction with the WBA Prereq Program:

  ## Transaction Hash: https://explorer.solana.com/tx/5S1bagk2u5tA6hD8fGKSZFfZLkCatAJRcDqY5QsP9P75AQNd6VxazqJHsmu5zMZURc5xAkA34qAfoJcHj2Ba72G3?cluster=devnet

- # All the clinet-side programs:

  - Inside the repo subfolder: [WEEK 1 : RUST_ENROLL](https://github.com/AhindraD/turbin3_builders/tree/main/02.week1_prereq_web3js/enrollment_dapp)

  - ## To run the programs:

    - Clone the repo:
      ```bash
      git clone https://github.com/AhindraD/turbin3_builders.git
      ```
    - cd to "02.week1_prereq_web3js/airdrop" from root
      ```bash
        cd 02.week1_prereq_web3js/enrollment_dapp
      ```
    - Install dependencies:
      ```bash
        cargo install
      ```

    <br>

    - ## Keygen:
      Generates a new keypair,
      Add your wallet private key in a file named "dev-wallet.json" in Unit8Array format(from the cli terminal output).
      ```bash
          yarn keygen
      ```

    <br>

    - ## Airdrop:
      Adds some SOL to your wallet in devnet.
      ```bash
          yarn airdrop
      ```

    <br>

    - ## Transfer:
      Transfer ALL SOL from dev-wallet to Turbin3 Wallet
      ```bash
          yarn transfer
      ```

    <br>

    - ## Enroll:
      Completes the prereq program. interacts with the Turbine program, more specifically the "complete" instruction with the github username as an input.
      ```bash
          yarn enroll
      ```
      Get the transaction hash from the terminal output. And inspect it in Solana Explorer.

    <br>

    - ## base58_To_Wallet_Byte_Array_cli_converter:
      Converts base58-encoded private key to wallet byte array, and vice versa.
      Wallets like Phantom and Solflare only support base58-encoded private keys.
      ```bash
          yarn convert
      ```