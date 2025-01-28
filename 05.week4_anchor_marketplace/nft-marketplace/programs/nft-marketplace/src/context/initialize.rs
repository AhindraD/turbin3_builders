use crate::state::marketplace::MarketplaceState;
use anchor_lang::prelude::*;
use anchor_spl::token_interface::{Mint, TokenInterface};

const ANCHOR_DISCRIMINATOR_SIZE: usize = 8;

#[derive(Accounts)]
#[instruction(name: String)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(
        init,
        payer = admin,
        space = ANCHOR_DISCRIMINATOR_SIZE + MarketplaceState::INIT_SPACE,
        seeds = [b"marketplace", name.as_str()],
        bump
    )]
    pub marketplace: Account<'info, MarketplaceState>,

    #[account(
        seeds = [b"treasury", marketplace.key().as_ref()],
        bump
    )]
    pub treasury: SystemAccount<'info>,

    #[account(
        seeds = [b"rewards", marketplace.key().as_ref()],
        bump
    )]
    pub rewards_mint: InterfaceAccount<'info, Mint>,

    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}
