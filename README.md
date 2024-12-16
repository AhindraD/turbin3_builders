# WBA Prereq Program

- # Final Assignment Interaction with the WBA Prereq Program:

  ## Transaction Hash: https://explorer.solana.com/tx/4eunAWyUyVVygw1fw6Ucn2rBeV2ntpLbba7xjo3pikCaJSqFTjEYsN3Hb6UFLSmApx4ErrU3G2fCnW83h9Tz7ioM?cluster=devnet

- # All the clinet-side programs:

  - Inside the repo subfolder: [AIRDROP](https://github.com/AhindraD/turbin3_builders/tree/main/brige-to-turbin3/airdrop)

  - ## To run the programs:

    - Clone the repo:
      ```bash
      git clone https://github.com/AhindraD/turbin3_builders.git
      ```
    - cd to "brige-to-turbin3/airdrop" from root
      ```bash
        cd brige-to-turbin3/airdrop
      ```
    - Install dependencies:
      ```bash
        yarn install
      ```

    <br>

    - ## Keygen:
      Generates a new keypair,
      Add your wallet private key in a file named "wallet.json" in Unit8Array format(from the cli terminal output).
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
      Transfer 1.3 SOL from one wallet to another.
      ```bash
          yarn transfer
      ```

    <br>

    - ## Enroll:
      Completes the prereq program. interacts with the WBA program, more specifically the "complete" instruction with the github username as an input.
      ```bash
          yarn enroll
      ```
      Get the transaction hash from the terminal output. And inspect it in Solana Explorer.

![image](https://github.com/user-attachments/assets/4be89c56-fab3-4c74-99cf-dd9c941fbde8)
