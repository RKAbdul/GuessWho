export const THEMES = {
    PINK: 'pink',
    YELLOW: 'yellow',
};

const STORAGE_KEY = 'guesswho-theme';

/** Reads the persisted theme choice, defaulting to pink if none is stored. */
export function getStoredTheme() {
    return localStorage.getItem(STORAGE_KEY) === THEMES.YELLOW ? THEMES.YELLOW : THEMES.PINK;
}

/** Applies a theme to the document and persists the choice. */
export function applyTheme(theme) {
    if (theme === THEMES.YELLOW) {
        document.documentElement.setAttribute('data-theme', THEMES.YELLOW);
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem(STORAGE_KEY, theme);
}
