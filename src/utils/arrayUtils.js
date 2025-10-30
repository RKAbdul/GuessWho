/**
 * Fisher-Yates shuffle algorithm - O(n) time complexity
 * More efficient and truly random compared to Array.sort(() => Math.random() - 0.5)
 * which has O(n log n) complexity and biased distribution
 */
export function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Randomly select n unique items from an array - O(n) time complexity
 * More efficient than using while loops with duplicate checks
 */
export function selectRandomItems(array, count) {
    if (count >= array.length) {
        return shuffleArray(array);
    }
    
    const shuffled = shuffleArray(array);
    return shuffled.slice(0, count);
}

/**
 * Select random indices from an array - O(n) time complexity
 * Useful for selecting imposters by index
 */
export function selectRandomIndices(length, count) {
    if (count >= length) {
        return Array.from({ length }, (_, i) => i);
    }
    
    const indices = Array.from({ length }, (_, i) => i);
    const shuffled = shuffleArray(indices);
    return shuffled.slice(0, count);
}
