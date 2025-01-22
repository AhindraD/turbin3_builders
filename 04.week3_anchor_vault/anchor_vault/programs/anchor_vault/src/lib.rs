use std::io::Result;

use anchor_lang::{
    prelude::*,
    system_program::{transfer, Transfer},
};

declare_id!("AsaWZFHPYynJtnp2r5zqaksCEi7ufLv8ECDbo9zeZafL");

const ANCHOR_DISCRIMINATOR: usize = 8;

#[program]
pub mod anchor_vault {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[account]
#[derive(InitSpace)]
pub struct VaultState {
    pub vault_bump: u8,
    pub state_bump: u8,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init,
        payer=user,
        space=ANCHOR_DISCRIMINATOR+VaultState::INIT_SPACE,
        seeds=[b"state",user.key().as_ref()],
        bump,
    )]
    pub state: Account<'info, VaultState>,

    #[account(
        seeds=[b"vault",state.key().as_ref()],
        bump,
    )]
    pub vault: SystemAccount<'info>,

    pub system_program: Program<'info, System>,
}

impl<'info> Initialize<'info> {
    pub fn initialize(&mut self, bumps: &InitializeBumps) -> Result<()> {
        self.state.vault_bump = bumps.vault;
        self.state.state_bump = bumps.state;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Payments<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        seeds=[b"state",user.key().as_ref()],
        bump=state.state_bump,
    )]
    pub state: Account<'info, VaultState>,

    #[account(
        mut,
        seeds=[b"vault",state.key().as_ref()],
        bump=state.vault_bump,
    )]
    pub vault: SystemAccount<'info>,

    pub system_program: Program<'info, System>,
}

impl<'info> Payments<'info> {
    pub fn deposit(&mut self, amount: u64) -> Result<()> {
        let cpi_program = self.system_program.to_account_info();
        let cpi_accounts = Transfer {
            from: self.user.to_account_info(),
            to: self.vault.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        let _ = transfer(cpi_ctx, amount);
        Ok(())
    }
}
