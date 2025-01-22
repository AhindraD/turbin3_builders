use crate::Escrow;
use anchor_lang::prelude::*;
use anchor_spl::{
    self,
    associated_token::AssociatedToken,
    token::Token,
    token_interface::{Mint, TokenAccount},
};

const ANCHOR_DISCRIMINATOR_LENGTH: usize = 8;

#[derive(Accounts)]
#[instruction(seed: u64)]
pub struct Make<'info> {
    #[account(mut)]
    pub maker: Signer<'info>,
    pub mint_a: InterfaceAccount<'info, Mint>,
    pub mint_b: InterfaceAccount<'info, Mint>,

    #[account(
        mut,
        associated_token::mint = mint_a,
        associated_token::authority = maker,
    )]
    pub maker_ata_a: InterfaceAccount<'info, TokenAccount>,

    #[account(
    init,
    payer=maker,
    space=ANCHOR_DISCRIMINATOR_LENGTH+Escrow::INIT_SPACE,
    seeds = [b"escrow", maker.key().as_ref(), seed.to_le_bytes().as_ref()],
    bump
    )]
    pub ecsrow: Account<'info, Escrow>,

    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}
