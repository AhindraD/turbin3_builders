use crate::state::EscrowState;
use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{transfer_checked, Mint, TokenAccount, TokenInterface, TransferChecked},
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
    space=ANCHOR_DISCRIMINATOR_LENGTH+EscrowState::INIT_SPACE,
    seeds = [b"escrow", maker.key().as_ref(), seed.to_le_bytes().as_ref()],
    bump
    )]
    pub ecsrow: Account<'info, EscrowState>,

    #[account(
        init,
        payer=maker,
        associated_token::mint = mint_a,
        associated_token::authority = ecsrow,
    )]
    pub vault: InterfaceAccount<'info, TokenAccount>,

    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

impl<'info> Make<'info> {
    pub fn init_escrow(&mut self, seed: u64, recieve: u64, bumps: &MakeBumps) -> Result<()> {
        self.ecsrow.set_inner(EscrowState {
            seed,
            maker: self.maker.key(),
            mint_a: self.mint_a.key(),
            mint_b: self.mint_b.key(),
            recieve,
            bump: bumps.ecsrow,
        });
        Ok(())
    }

    pub fn deposit(&mut self, deposit: u64) -> Result<()> {
        let ctx_program = self.token_program.to_account_info();
        let ctx_account = TransferChecked {
            from: self.maker_ata_a.to_account_info(),
            to: self.vault.to_account_info(),
            authority: self.maker.to_account_info(),
            mint: self.mint_a.to_account_info(),
        };
        let ctx = CpiContext::new(ctx_program, ctx_account);
        let _ = transfer_checked(ctx, deposit, self.mint_a.decimals);
        Ok(())
    }
}
