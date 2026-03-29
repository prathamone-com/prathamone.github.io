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

import { useEffect } from 'react';
import { useOnlineStatus } from './useOnlineStatus';
import { useProgressStore } from '../store/progress';

/**
 * useSovereignSync
 * Automatically triggers a data sync when the user transitions from offline to online.
 */
export function useSovereignSync(profileId: string | null) {
  const isOnline = useOnlineStatus();
  const syncOfflineProgress = useProgressStore(state => state.syncOfflineProgress);

  useEffect(() => {
    if (isOnline && profileId) {
      console.log("Network Restored: Initiating Sovereign Sync for", profileId);
      syncOfflineProgress(profileId);
    }
  }, [isOnline, profileId, syncOfflineProgress]);
}
