const questionsData = [
    {
      category: "Gaming",
      questions: [
        ["What game do you always recommend?", "What game do you always warn people about?"],
        ["Which game had the best ending?", "Which game had the worst ending?"],
        ["Which game has the best soundtrack?", "Which game has the most annoying soundtrack?"],
        ["What’s the most addictive game you've played?", "What’s the most frustrating game you've played?"],
        ["Which gaming company do you respect the most?", "Which gaming company do you distrust the most?"],
        ["Which game has the best graphics?", "Which game has the worst art style?"],
        ["What’s the most overrated game?", "What’s the most underrated game?"],
        ["Which game has the best online community?", "Which game has the most toxic community?"],
        ["Which game deserves a remake?", "Which game should never be remade?"],
        ["Which game made you emotional?", "Which game made you rage the most?"],
        ["What’s your favorite gaming genre?", "What’s your least favorite gaming genre?"],
        ["What’s the best battle royale game?", "What’s the worst battle royale game?"],
        ["Which game had the best plot twist?", "Which game had the worst story?"],
        ["Which game do you replay the most?", "Which game do you regret buying?"],
        ["Which game character would you want to be?", "Which game character do you find annoying?"],
        ["What’s the best console ever?", "What’s the worst console ever?"],
        ["Which multiplayer game is the best?", "Which multiplayer game is the most frustrating?"],
        ["Which game has the best level design?", "Which game has the worst level design?"],
        ["What’s your favorite indie game?", "What’s an indie game you didn’t like?"],
        ["Which game deserves a sequel?", "Which game should never get a sequel?"],
        ["Which game series is the best?", "Which game series is overrated?"],
      ]
    },
    {
      category: "Movies & TV Shows",
      questions: [
        ["Which movie has the best plot twist?", "Which movie had the most predictable plot?"],
        ["Which TV show do you wish had another season?", "Which TV show dragged on for too long?"],
        ["What’s a movie everyone loves but you don’t?", "What’s a movie you love that everyone hates?"],
        ["What’s the best animated movie?", "What’s the worst animated movie you've seen?"],
        ["Which director always delivers great movies?", "Which director is overhyped?"],
        ["Which movie has the best plot twist?", "Which movie had the most predictable plot?"],
        ["Which TV show do you wish had another season?", "Which TV show dragged on for too long?"],
        ["What’s a movie everyone loves but you don’t?", "What’s a movie you love that everyone hates?"],
        ["What’s the best animated movie?", "What’s the worst animated movie you've seen?"],
        ["Which actor never disappoints?", "Which actor is overrated?"],
        ["What’s the best comedy movie?", "What’s the least funny comedy movie?"],
        ["Which movie had the best visual effects?", "Which movie had the worst CGI?"],
        ["What’s a show you binge-watched?", "What’s a show you gave up on?"],
        ["Which director is a genius?", "Which director is overhyped?"],
        ["Which horror movie is the scariest?", "Which horror movie was just laughable?"],
        ["What’s the best superhero movie?", "What’s the worst superhero movie?"],
        ["Which TV show has the best intro?", "Which TV show has the most annoying intro?"],
        ["Which movie character would you want to be?", "Which movie character annoys you the most?"],
        ["What’s the best TV show of all time?", "What’s the most overrated TV show?"],
        ["Which movie had the best soundtrack?", "Which movie had the most forgettable music?"],
        ["What’s a movie you’ve watched multiple times?", "What’s a movie you could never rewatch?"],
        ["Which movie has the best action scenes?", "Which movie has the worst fight choreography?"],
        ["Which TV show had the best series finale?", "Which TV show had the worst ending?"],
        ["What’s your favorite sci-fi movie?", "What’s the worst sci-fi movie you’ve seen?"],
      ]
    },
    {
      category: "Food & Drinks",
      questions: [
        ["What’s a weird food combination that you love?", "What’s a weird food combination that disgusts you?"],
        ["What’s the best street food you've ever had?", "What’s the worst fast food meal you've ever had?"],
        ["What’s your go-to comfort food?", "What’s a food that reminds you of bad memories?"],
        ["Which restaurant do you swear by?", "Which restaurant was the biggest disappointment?"],
        ["Which drink do you always order?", "Which drink do you regret ever trying?"],
      ]
    },
    {
      category: "Sports & Fitness",
      questions: [
        ["Who is the greatest athlete of all time?", "Who is the most overrated athlete?"],
        ["What’s the most exciting sport to watch?", "What’s the most boring sport to watch?"],
        ["Which sport has the best fans?", "Which sport has the most toxic fans?"],
        ["What’s the best team in history?", "What’s the most disappointing team ever?"],
        ["Which athlete has the best personality?", "Which athlete do you find arrogant?"],
      ]
    },
    {
      category: "Travel & Adventure",
      questions: [
        ["What’s a place you’d visit again?", "What’s a place you’d never go back to?"],
        ["What’s the most underrated travel destination?", "What’s the most overrated travel destination?"],
        ["What’s your best travel memory?", "What’s your worst travel experience?"],
        ["Which country has the best food?", "Which country has the most underwhelming food?"],
        ["What’s the best thing about traveling?", "What’s the worst part about traveling?"],
      ]
    },
    {
      category: "Technology & Gadgets",
      questions: [
        ["Which tech company do you trust the most?", "Which tech company do you think is the most unethical?"],
        ["What’s the best phone you've ever owned?", "What’s the worst phone you've ever owned?"],
        ["Which app do you use the most?", "Which app do you regret downloading?"],
        ["What’s the best gaming console ever?", "What’s the worst gaming console ever?"],
        ["Which futuristic technology excites you the most?", "Which futuristic technology scares you the most?"],
      ]
    },
    {
      category: "Personality & Opinions",
      questions: [
        ["What’s a habit you admire in people?", "What’s a habit that annoys you?"],
        ["What’s the best compliment you've received?", "What’s the worst insult you've received?"],
        ["What’s a skill you’re proud of?", "What’s a skill you wish you had?"],
        ["What’s your biggest strength?", "What’s your biggest weakness?"],
        ["What’s a piece of advice you always follow?", "What’s a piece of advice you think is terrible?"],
        ["What’s a habit you admire in people?", "What’s a habit that annoys you?"],
        ["What’s the best compliment you've received?", "What’s the worst insult you've received?"],
        ["What’s a skill you’re proud of?", "What’s a skill you wish you had?"],
        ["What’s your biggest strength?", "What’s your biggest weakness?"],
        ["What’s a piece of advice you always follow?", "What’s a piece of advice you think is terrible?"],
        ["What’s your best personality trait?", "What’s your most embarrassing trait?"],
        ["What’s the best thing about you?", "What’s the worst thing about you?"],
        ["What’s something you’re really good at?", "What’s something you absolutely suck at?"],
        ["Which quality do you admire most in others?", "Which quality do you dislike in others?"],
        ["What’s something people always assume about you?", "What’s something people never guess about you?"],
        ["What’s a fear you’ve overcome?", "What’s a fear you still struggle with?"],
        ["What’s your biggest motivation?", "What’s your biggest distraction?"],
        ["What’s the best decision you've made?", "What’s the worst decision you've made?"],
        ["What’s something you’re proud of?", "What’s something you regret?"],
        ["What’s your most unique trait?", "What’s your most relatable trait?"],
      ]
    },
    {
      category: "Random & Fun",
      questions: [
        ["If you could have dinner with any celebrity, who would it be?", "If you could ban any celebrity from TV, who would it be?"],
        ["What’s the best party you've been to?", "What’s the most awkward party experience you've had?"],
        ["What’s the funniest thing you've ever witnessed?", "What’s the most embarrassing thing that’s happened to you?"],
        ["If you could live in any fictional universe, which one would it be?", "If you could erase one fictional universe from existence, which one would it be?"],
        ["What’s your go-to joke?", "What’s the worst joke you've ever heard?"],
      ]
    },
    
  ];
  
  export default questionsData;
  