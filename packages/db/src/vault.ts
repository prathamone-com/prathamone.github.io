/**
 * ==========================================================
 * AITDL AI AGENT BUILD SIGNATURE
 * ==========================================================
 * Architect    : Jawahar R Mallah
 * Designation  : AI Systems Architect & Author
 * Organization : AITDL Network | PrathamOne
 * Framework    : Autonomous AI Agent Development
 * Authored By  : Jawahar R Mallah
 * Version      : 1.0.0
 * Release Date : 28 March 2026
 * Environment  : Production
 *
 * Signature    : Engineered by Jawahar R Mallah
 * Motto        : Crafted with Logic, Vision & AI
 * ==========================================================
 */

import { createBrowserClient } from './client';

export interface Wallet {
  user_id: string;
  balance: number;
  total_recharged: number;
  updated_at: string;
}

export interface RechargePack {
  id: string;
  name: string;
  credits: number;
  price_in_paisa: number;
  description?: string;
}

export interface WalletTransaction {
  id: string;
  user_id: string;
  type: 'RECHARGE' | 'USAGE' | 'REFUND' | 'ADJUSTMENT';
  amount: number;
  price_paid_paisa: number;
  metadata: any;
  created_at: string;
}

/**
 * Deducts AI credits for a query.
 * Updates the transaction ledger for auditability.
 */
export async function deductCredits(userId: string, amount: number = -1, reason: string = 'AI Query') {
  const supabase = createBrowserClient();
  
  const { data: transaction, error } = await supabase
    .from('wallet_transactions')
    .insert({
      user_id: userId,
      type: 'USAGE',
      amount: amount,
      metadata: { reason }
    })
    .select()
    .single();

  if (error) throw error;
  return transaction;
}

/**
 * Retrieves the current student wallet balance.
 */
export async function getWalletBalance(userId: string): Promise<number> {
  const supabase = createBrowserClient();
  const { data, error } = await supabase
    .from('ai_token_wallets')
    .select('balance')
    .eq('user_id', userId)
    .single();

  if (error) return 0;
  return data.balance;
}

/**
 * Fetches available recharge packs for the UI.
 */
export async function getRechargePacks() {
  const supabase = createBrowserClient();
  const { data, error } = await supabase
    .from('recharge_packs')
    .select('*')
    .eq('is_active', true)
    .order('price_in_paisa', { ascending: true });

  if (error) throw error;
  return data;
}
