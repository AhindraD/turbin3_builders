use anchor_lang::prelude::*;

declare_id!("8ZmRFoS6nFAXyUqejCernj9yFYnnz53G3E6zRz1pju3h");

#[program]
pub mod nft_staking {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
