use anchor_lang::prelude::*;

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
