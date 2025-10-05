const rolesData = [
    {
        id: 'seraphis',
        name: 'Seraphis',
        ability: 'The Final Verdict',
        description: 'When eliminated, this player can immediately eliminate another player without needing a vote.',
        canBeImposter: false,
        revealOn: 'death',
        usageLimit: 1
    },
    {
        id: 'spectra',
        name: 'Spectra',
        ability: 'The Eternal Echo',
        description: 'Can continue voting and speaking even after being eliminated.',
        canBeImposter: false,
        revealOn: 'death',
        usageLimit: null // Passive ability
    },
    {
        id: 'censor',
        name: 'Censor',
        ability: 'Censorship',
        description: 'Can nullify a word or explanation given by another player about their hidden word. Can be used 2 times per game.',
        canBeImposter: true,
        revealOn: 'use',
        usageLimit: 2
    },
    {
        id: 'inquisitor',
        name: 'Inquisitor',
        ability: 'Question',
        description: 'Can ask any player a question at any moment during the game. Can be used 2 times per game.',
        canBeImposter: true,
        revealOn: 'use',
        usageLimit: 2
    }
];

export default rolesData;
