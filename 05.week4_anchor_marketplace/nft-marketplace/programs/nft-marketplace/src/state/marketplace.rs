use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct MarketplaceState {
    pub admin: Pubkey,
    #[max_len(32)]
    pub name: String,
    pub fee: u16,
    pub bump: u8,
    pub treasury_bump: u8,
    pub rewards_bump: u8,
}
