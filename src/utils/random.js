// `array.sort(() => Math.random() - 0.5)` is a common but biased way to shuffle:
// comparator-based sort algorithms aren't built for random/non-transitive
// comparators, so the resulting permutation isn't uniform. The helpers below
// use the Fisher-Yates algorithm instead, which is unbiased.

/** Returns a new array with all items shuffled into a uniformly random order. */
export function shuffle(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

/**
 * Returns `count` distinct items chosen uniformly at random from `array`,
 * without duplicates. Only performs `count` swaps (partial Fisher-Yates)
 * instead of shuffling the whole array, so it stays cheap even when picking
 * a handful of items out of a large pool.
 */
export function sampleUnique(array, count) {
    const pool = [...array];
    const picked = [];
    const n = Math.min(count, pool.length);

    for (let i = 0; i < n; i++) {
        const j = i + Math.floor(Math.random() * (pool.length - i));
        [pool[i], pool[j]] = [pool[j], pool[i]];
        picked.push(pool[i]);
    }

    return picked;
}

/** Returns a single item chosen uniformly at random from `array`. */
export function pickOne(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/** Returns a uniformly random integer in the inclusive range [min, max]. */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
