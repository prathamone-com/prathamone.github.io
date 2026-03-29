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
 * Release Date : 29 March 2026
 * Environment  : Production
 * ==========================================================
 */

import { useEffect, useRef } from 'react';
import { useOnlineStatus } from './useOnlineStatus';
import { useProgressStore } from '../store/progress';

/**
 * useSovereignSync
 * Orchestrates technical data bridging between local offline states and the Supabase Cloud.
 * Features:
 * 1. Initial Profile Fetch: Restores status from cloud on mount.
 * 2. Network Recovery Sync: Pushes local changes when online status returns.
 * 3. Change-Triggered Sync: Debounced push on state updates (coins, chapters, etc).
 */
export function useSovereignSync(profileId: string | null) {
  const isOnline = useOnlineStatus();
  const { 
    syncOfflineProgress, 
    fetchSovereignProfile,
    coins,
    completedChapters,
    lastSyncedAt
  } = useProgressStore();

  const syncTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Initial Restore from Cloud
  useEffect(() => {
    if (isOnline && profileId && !lastSyncedAt) {
      console.log("Sovereign Sync: Performing initial cloud restore for", profileId);
      fetchSovereignProfile(profileId);
    }
  }, [isOnline, profileId, fetchSovereignProfile, lastSyncedAt]);

  // 2. Network Recovery Sync
  useEffect(() => {
    const wasOffline = !isOnline;
    if (isOnline && profileId && wasOffline) {
      console.log("Sovereign Sync: Network Restored. Syncing state...");
      syncOfflineProgress(profileId);
    }
  }, [isOnline, profileId, syncOfflineProgress]);

  // 3. Change-Triggered Debounced Sync
  useEffect(() => {
    if (!isOnline || !profileId) return;

    // Clear existing timer
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current);

    // Debounce sync for 5 seconds to avoid excessive DB writes
    syncTimerRef.current = setTimeout(() => {
      console.log("Sovereign Sync: Auto-syncing state changes...");
      syncOfflineProgress(profileId);
    }, 5000);

    return () => {
      if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    };
  }, [coins, completedChapters.length, isOnline, profileId, syncOfflineProgress]);
}
