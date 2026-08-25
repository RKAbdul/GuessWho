// User-facing changelog shown in the "What's New" modal on the home screen.
// Keep entries in plain, non-technical language — this is for players, not developers.
// Newest release first.
const changelog = [
    {
        version: "3",
        date: "August 2026",
        sections: [
            {
                title: "New",
                icon: "🎉",
                items: [
                    {
                        heading: "Describe & Guess — a brand new team mode",
                        detail: "Split into teams of two (or a team of three if your group is an odd number). One player describes a word without saying it while their team races the clock to guess it. Before each turn, your team can veto one of the categories on offer. Most points after a few rounds wins."
                    },
                    {
                        heading: "Choose your categories",
                        detail: "Before starting a game, you can now turn specific word categories on or off, so you only play with the ones your group actually enjoys."
                    },
                    {
                        heading: "New category: Video Games",
                        detail: "Added a huge collection of iconic video game titles — nearly 500 of them — as a brand new category to guess and describe."
                    },
                    {
                        heading: "Play in Spanish or English",
                        detail: "You can switch the game's language from the setup screen at any time — all the words, questions, and categories update to match."
                    },
                ]
            },
            {
                title: "Improvements",
                icon: "✨",
                items: [
                    {
                        heading: "Games no longer restart if the page reloads",
                        detail: "Accidentally refresh, rotate your phone, or tap back? Your game now picks up right where you left off instead of starting a new random round."
                    },
                    {
                        heading: "Bigger Animals and Jobs & Professions categories",
                        detail: "Added a big batch of new entries — more fish, insects, and animals, plus a wider range of professions."
                    },
                    {
                        heading: "Imposter status is now shown by default",
                        detail: "Players are now told right away if they're the imposter (you can still turn this off in setup if your group prefers to guess blind)."
                    },
                    {
                        heading: "Cleaner setup screen",
                        detail: "The imposter-count option only appears when there's actually a choice to make, and the categories list is now tucked into a collapsible section so it doesn't clutter the screen."
                    },
                    {
                        heading: "Better on phones",
                        detail: "The mode selection screen now scrolls properly on smaller screens instead of cutting off."
                    },
                ]
            },
            {
                title: "Fixes",
                icon: "🐛",
                items: [
                    {
                        heading: "Fixed a couple of duplicate words",
                        detail: "A few words had accidentally snuck into the Spanish word lists twice, which could very rarely cause the same word to show up as both the main word and the imposter's word."
                    },
                ]
            }
        ]
    }
];

export default changelog;
