use anchor_lang::prelude::*;

declare_id!("94ZdNE4YgaxUUdk7umGc7SZeJSTRBw8v4Qk1GSR8CfDd");

#[program]
pub mod nft_marketplace {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
