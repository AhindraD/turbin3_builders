use anchor_lang::prelude::*;

pub mod context;
pub use context::*;
pub mod state;
pub use state::*;

declare_id!("94ZdNE4YgaxUUdk7umGc7SZeJSTRBw8v4Qk1GSR8CfDd");

#[program]
pub mod nft_marketplace {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, name: String, fee: u16) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}
