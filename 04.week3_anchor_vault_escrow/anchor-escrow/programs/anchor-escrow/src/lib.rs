use anchor_lang::prelude::*;

declare_id!("EKb3BJHdBY3UFtCbXBfnQULGZkRDnohqPGkCfbNPC9wv");

pub mod state;
pub use state::*;

pub mod instructions;
pub use instructions::*;

#[program]
pub mod anchor_escrow {
    use super::*;

    pub fn make(ctx: Context<Make>) -> Result<()> {
        Ok(())
    }
}
