// Persists in-progress room state to sessionStorage so an accidental refresh
// or a browser back/forward doesn't wipe an ongoing round. sessionStorage
// (not localStorage) is deliberate: it survives a reload but clears when the
// tab closes, which matches this being a single pass-and-play session rather
// than something that should outlive the device being put away.
const PREFIX = 'guesswho:';

/** Reads the saved { gameId, config, state } blob for a room route, or null. */
export function loadRoomSession(routeKey) {
    try {
        const raw = sessionStorage.getItem(PREFIX + routeKey);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

/** Overwrites the saved blob for a room route. */
export function saveRoomSession(routeKey, gameId, config, state) {
    try {
        sessionStorage.setItem(PREFIX + routeKey, JSON.stringify({ gameId, config, state }));
    } catch {
        // sessionStorage unavailable (private mode, quota, etc.) — persistence
        // is a nice-to-have, so fail silently rather than breaking the game.
    }
}

/** Clears the saved blob for a room route (call on an intentional exit). */
export function clearRoomSession(routeKey) {
    try {
        sessionStorage.removeItem(PREFIX + routeKey);
    } catch {
        // ignore
    }
}
