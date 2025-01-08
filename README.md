
![Screenshot 2025-01-08 153657](https://github.com/user-attachments/assets/6f0556bf-1fc9-45bd-8634-17f686b1bd7e)

# Turbin3 2025 Q1 Cohort

- # WEEK1: Task 01 - Interaction with the Prereq Program:

  ## Transaction Hash: https://explorer.solana.com/tx/22STvcPPZx8FtvxtyeqJEhWKEXuRAiiDzQqmAqR3mEkzqmH4jKKMEoZYt6NhDi3LsmwA3roENDWt1cqK55FQdpMN?cluster=devnet

- # All the clinet-side programs:

  - Inside the repo subfolder: [WEEK 1 : AIRDROP](https://github.com/AhindraD/turbin3_builders/tree/main/02.week1_prereq_web3js/airdrop)

  - ## To run the programs:

    - Clone the repo:
      ```bash
      git clone https://github.com/AhindraD/turbin3_builders.git
      ```
    - cd to "02.week1_prereq_web3js/airdrop" from root
      ```bash
        cd 02.week1_prereq_web3js/airdrop
      ```
    - Install dependencies:
      ```bash
        yarn install
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
      Adds 2 SOL to your wallet in devnet.
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
