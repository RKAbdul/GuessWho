import { describe, it, expect } from 'vitest';
import { shuffle, sampleUnique, pickOne, randomInt } from './random.js';

// --- Statistical helpers -----------------------------------------------
//
// These tests don't just check "does it run" — they check "is the output
// actually uniformly random", since a biased-but-plausible-looking RNG call
// is exactly the kind of bug that hides in a game like this (e.g. the old
// `array.sort(() => Math.random() - 0.5)` shuffle, which LOOKS random but
// isn't). Uniformity is verified with the standard chi-square goodness-of-fit
// statistic: sum((observed - expected)^2 / expected) across categories.
// Lower means closer to uniform.

function chiSquare(counts, expectedPerCategory) {
    return counts.reduce((sum, observed) => {
        const diff = observed - expectedPerCategory;
        return sum + (diff * diff) / expectedPerCategory;
    }, 0);
}

// Critical values for the chi-square distribution at p = 0.001 (i.e. a
// correct uniform generator only exceeds this by chance 1 in 1000 runs).
// Indexed by degrees of freedom (categories - 1).
const CHI_SQUARE_CRITICAL_P001 = { 2: 13.82, 3: 16.27, 4: 18.47, 5: 20.52 };

function assertUniform(counts, expectedPerCategory) {
    const df = counts.length - 1;
    const critical = CHI_SQUARE_CRITICAL_P001[df];
    const stat = chiSquare(counts, expectedPerCategory);
    expect(stat, `chi-square=${stat.toFixed(2)} exceeds critical=${critical} (df=${df}) — distribution is not uniform`).toBeLessThan(critical);
    return stat;
}

// The historically common (and biased) shuffle this project used to use.
// Reimplemented locally purely to prove, empirically, that the bug was real
// and that `shuffle()` actually fixes it.
function biasedSortShuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

describe('shuffle', () => {
    it('preserves all elements (same multiset, no loss or duplication)', () => {
        const input = [1, 2, 3, 4, 5];
        const result = shuffle(input);
        expect(result).toHaveLength(input.length);
        expect([...result].sort()).toEqual([...input].sort());
    });

    it('does not mutate the input array', () => {
        const input = [1, 2, 3, 4, 5];
        const copy = [...input];
        shuffle(input);
        expect(input).toEqual(copy);
    });

    it('distributes a fixed element uniformly across all output positions', () => {
        const n = 5;
        const trials = 60000;
        const input = [0, 1, 2, 3, 4];
        const positionCounts = new Array(n).fill(0);

        for (let t = 0; t < trials; t++) {
            const result = shuffle(input);
            positionCounts[result.indexOf(0)]++;
        }

        assertUniform(positionCounts, trials / n);
    });

    it('distributes which element lands in position 0 uniformly', () => {
        const n = 5;
        const trials = 60000;
        const input = [0, 1, 2, 3, 4];
        const elementCounts = new Array(n).fill(0);

        for (let t = 0; t < trials; t++) {
            const result = shuffle(input);
            elementCounts[result[0]]++;
        }

        assertUniform(elementCounts, trials / n);
    });

    it('is measurably more uniform than the old sort(() => Math.random() - 0.5) approach', () => {
        // This is the regression test for the original bug report: confirm the
        // biased method actually fails the same statistical bar that shuffle()
        // passes, so the fix is proven rather than assumed.
        const n = 5;
        const trials = 60000;
        const input = [0, 1, 2, 3, 4];
        const expected = trials / n;

        const fixedCounts = new Array(n).fill(0);
        const biasedCounts = new Array(n).fill(0);

        for (let t = 0; t < trials; t++) {
            fixedCounts[shuffle(input).indexOf(0)]++;
            biasedCounts[biasedSortShuffle(input).indexOf(0)]++;
        }

        const fixedStat = chiSquare(fixedCounts, expected);
        const biasedStat = chiSquare(biasedCounts, expected);

        // shuffle() must pass the uniformity bar...
        expect(fixedStat).toBeLessThan(CHI_SQUARE_CRITICAL_P001[n - 1]);
        // ...while the old approach is measurably, substantially worse.
        expect(biasedStat).toBeGreaterThan(fixedStat);
        expect(biasedStat).toBeGreaterThan(CHI_SQUARE_CRITICAL_P001[n - 1]);
    });
});

describe('sampleUnique', () => {
    it('returns the requested count of distinct items drawn from the input', () => {
        const input = ['a', 'b', 'c', 'd', 'e', 'f'];
        const result = sampleUnique(input, 3);
        expect(result).toHaveLength(3);
        expect(new Set(result).size).toBe(3);
        result.forEach(item => expect(input).toContain(item));
    });

    it('returns an empty array when count is 0', () => {
        expect(sampleUnique(['a', 'b', 'c'], 0)).toEqual([]);
    });

    it('returns all items (as a set) when count >= array length', () => {
        const input = ['a', 'b', 'c'];
        const result = sampleUnique(input, 10);
        expect(result).toHaveLength(3);
        expect([...result].sort()).toEqual([...input].sort());
    });

    it('selects every element with roughly equal probability', () => {
        const input = ['a', 'b', 'c', 'd', 'e', 'f'];
        const count = 2;
        const trials = 60000;
        const selectionCounts = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 };

        for (let t = 0; t < trials; t++) {
            sampleUnique(input, count).forEach(item => selectionCounts[item]++);
        }

        const expected = trials * (count / input.length);
        assertUniform(Object.values(selectionCounts), expected);
    });
});

describe('pickOne', () => {
    it('always returns an element from the input array', () => {
        const input = ['x', 'y', 'z'];
        for (let i = 0; i < 100; i++) {
            expect(input).toContain(pickOne(input));
        }
    });

    it('picks each element with roughly equal probability', () => {
        const input = ['a', 'b', 'c', 'd', 'e', 'f'];
        const trials = 60000;
        const counts = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 };

        for (let t = 0; t < trials; t++) {
            counts[pickOne(input)]++;
        }

        assertUniform(Object.values(counts), trials / input.length);
    });
});

describe('randomInt', () => {
    it('always returns an integer within the inclusive [min, max] range', () => {
        for (let i = 0; i < 1000; i++) {
            const value = randomInt(3, 7);
            expect(Number.isInteger(value)).toBe(true);
            expect(value).toBeGreaterThanOrEqual(3);
            expect(value).toBeLessThanOrEqual(7);
        }
    });

    it('reaches both boundary values (catches off-by-one exclusion bugs)', () => {
        const seen = new Set();
        for (let i = 0; i < 2000; i++) {
            seen.add(randomInt(1, 4));
        }
        expect(seen.has(1)).toBe(true);
        expect(seen.has(4)).toBe(true);
    });

    it('distributes values uniformly across the range', () => {
        const min = 1;
        const max = 5;
        const n = max - min + 1;
        const trials = 60000;
        const counts = new Array(n).fill(0);

        for (let t = 0; t < trials; t++) {
            counts[randomInt(min, max) - min]++;
        }

        assertUniform(counts, trials / n);
    });
});
