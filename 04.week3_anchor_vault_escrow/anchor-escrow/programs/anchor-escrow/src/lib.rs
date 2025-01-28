use anchor_lang::prelude::*;

declare_id!("EKb3BJHdBY3UFtCbXBfnQULGZkRDnohqPGkCfbNPC9wv");

pub mod state;
pub use state::*;

pub mod instructions;
pub use instructions::*;

#[program]
pub mod anchor_escrow {
    use super::*;

    pub fn make(ctx: Context<Make>, seed: u64, recieve: u64, deposit: u64) -> Result<()> {
        let _ = ctx.accounts.init_escrow(seed, recieve, &ctx.bumps);
        let _ = ctx.accounts.deposit(deposit);
        Ok(())
    }
}
