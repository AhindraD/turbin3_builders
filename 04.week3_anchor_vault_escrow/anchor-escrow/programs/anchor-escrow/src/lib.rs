use anchor_lang::prelude::*;

declare_id!("EKb3BJHdBY3UFtCbXBfnQULGZkRDnohqPGkCfbNPC9wv");

#[program]
pub mod anchor_escrow {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
