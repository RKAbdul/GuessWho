const wordsData = [
    {
        id: 1,
        family: "Famous & Historic Characters",
        words: ["Einstein", "Napoleon", "Cleopatra", "Julius Caesar", "Leonardo da Vinci", "Mozart", "Beethoven", "Shakespeare", "Winston Churchill", "Abraham Lincoln",
                "George Washington", "Joan of Arc", "Mahatma Gandhi", "Martin Luther King Jr.", "Marie Curie", "Alexander the Great", "Tesla", "Karl Marx", "Sigmund Freud", "Walt Disney",
                "Isaac Newton", "Pablo Picasso", "Galileo Galilei", "Charles Darwin", "Genghis Khan", "Che Guevara", "Nelson Mandela", "Queen Victoria", "Marco Polo", "Mother Teresa",
                "Socrates", "Plato", "Aristotle", "Confucius", "Buddha", "Jesus Christ", "Muhammad", "Moses", "Michelangelo", "Raphael",
                "Rembrandt", "Van Gogh", "Frida Kahlo", "Salvador Dali", "Andy Warhol", "Claude Monet", "Edgar Degas", "Auguste Rodin", "Chopin", "Vivaldi",
                "Bach", "Handel", "Tchaikovsky", "Verdi", "Wagner", "Brahms", "Debussy", "Stravinsky", "Homer", "Dante",
                "Cervantes", "Jane Austen", "Charles Dickens", "Mark Twain", "Ernest Hemingway", "Virginia Woolf", "George Orwell", "F. Scott Fitzgerald", "Tolkien", "C.S. Lewis",
                "Voltaire", "Rousseau", "John Locke", "Thomas Hobbes", "Immanuel Kant", "Nietzsche", "Descartes", "Spinoza", "Hegel", "Sartre",
                "Simone de Beauvoir", "Rosa Parks", "Harriet Tubman", "Eleanor Roosevelt", "Anne Frank", "Helen Keller", "Florence Nightingale", "Susan B. Anthony", "Emmeline Pankhurst", "Malala Yousafzai",
                "Christopher Columbus", "Vasco da Gama", "Ferdinand Magellan", "Captain Cook", "Amelia Earhart", "Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Louis Pasteur", "Alexander Fleming",
                "Thomas Edison", "Alexander Graham Bell", "Wright Brothers", "Henry Ford", "Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk", "Jeff Bezos", "Larry Page",
                "Sergey Brin", "Tim Berners-Lee", "Alan Turing", "Ada Lovelace", "Grace Hopper", "Stephen Hawking", "Carl Sagan", "Richard Feynman", "Oppenheimer", "Curie",
                "Rosalind Franklin", "Francis Crick", "James Watson", "Gregor Mendel", "Darwin", "Hippocrates", "Archimedes", "Pythagoras", "Euclid", "Ptolemy",
                "Copernicus", "Kepler", "Tycho Brahe", "Edmund Halley", "Benjamin Franklin", "Thomas Jefferson", "John Adams", "Theodore Roosevelt", "Franklin D. Roosevelt", "John F. Kennedy"]
    },
    {
        id: 2,
        family: "Items",
        words: ["Chair", "Table", "Lamp", "Couch", "Mirror", "Clock", "Rug", "Bookshelf", "Curtains", "Pillow",
                "Vase", "Notebook", "Pen", "Scissors", "Backpack", "Towel", "Basket", "Mug", "Plate", "Spoon",
                "Fork", "Knife", "Napkin", "Jar", "Bottle", "Box", "Glasses", "Wallet", "Umbrella", "Helmet",
                "Candle", "Picture Frame", "Trash Can", "Doormat", "Fan", "Heater", "Blanket", "Bedsheet", "Mattress", "Armchair",
                "Dresser", "Nightstand", "Wardrobe", "Desk", "Stool", "Bench", "Sofa", "Ottoman", "Cabinet", "Drawer",
                "Painting", "Poster", "Calendar", "Stapler", "Tape", "Glue", "Ruler", "Eraser", "Pencil", "Marker",
                "Highlighter", "Paperclip", "Binder", "Folder", "Envelope", "Stamp", "String", "Rope", "Chain", "Lock",
                "Key", "Keychain", "Flashlight", "Lantern", "Battery", "Charger", "Extension Cord", "Light Bulb", "Socket", "Switch",
                "Remote Control", "Thermostat", "Smoke Detector", "Fire Extinguisher", "Broom", "Mop", "Dustpan", "Vacuum Cleaner", "Bucket", "Sponge",
                "Dish Soap", "Detergent", "Bleach", "Scrubber", "Duster", "Air Freshener", "Tissue Box", "Paper Towel", "Toilet Paper", "Soap Dispenser",
                "Toothbrush", "Toothpaste", "Shampoo", "Conditioner", "Comb", "Hairbrush", "Hair Dryer", "Iron", "Ironing Board", "Hanger",
                "Laundry Basket", "Clothes Pin", "Sewing Kit", "Thread", "Needle", "Button", "Zipper", "Measuring Tape", "Cushion", "Throw Pillow",
                "Duvet", "Comforter", "Sleeping Bag", "Camping Chair", "Cooler", "Thermos", "Water Bottle", "Lunch Box", "Tupperware", "Cutting Board",
                "Can Opener", "Bottle Opener", "Corkscrew", "Peeler", "Grater", "Whisk", "Spatula", "Ladle", "Tongs", "Colander"]
    },
    {
        id: 3,
        family: "Food",
        words: ["Pizza", "Burger", "Hotdog", "Tacos", "Sushi", "Pasta", "Lasagna", "Fried Chicken", "Steak", "Burrito",
                "Salad", "Soup", "Curry", "Dumplings", "Ramen", "Samosa", "Quesadilla", "Falafel", "Cheesecake", "Pancakes",
                "Waffles", "Brownie", "Ice Cream", "Cookies", "Donuts", "Croissant", "Chocolate", "Muffin", "Pudding", "Pie",
                "Sandwich", "Sub", "Wrap", "Bagel", "Toast", "French Toast", "Omelette", "Scrambled Eggs", "Poached Eggs", "Fried Eggs",
                "Bacon", "Sausage", "Ham", "Pork Chop", "Ribs", "Lamb Chop", "Veal", "Turkey", "Duck", "Quail",
                "Salmon", "Tuna", "Cod", "Shrimp", "Lobster", "Crab", "Mussels", "Oysters", "Clams", "Scallops",
                "Calamari", "Tilapia", "Swordfish", "Caviar", "Sashimi", "Tempura", "Noodles", "Spaghetti", "Fettuccine", "Penne",
                "Ravioli", "Tortellini", "Gnocchi", "Risotto", "Paella", "Biryani", "Fried Rice", "Pad Thai", "Pho", "Bibimbap",
                "Kimchi", "Spring Rolls", "Egg Rolls", "Wontons", "Bao Buns", "Dim Sum", "Peking Duck", "Sweet and Sour Pork", "Kung Pao Chicken", "General Tso's Chicken",
                "Miso Soup", "Udon", "Soba", "Yakitori", "Teriyaki", "Katsu", "Gyoza", "Onigiri", "Takoyaki", "Okonomiyaki",
                "Nachos", "Guacamole", "Salsa", "Chili", "Baked Beans", "Coleslaw", "Potato Salad", "Macaroni Salad", "Caesar Salad", "Greek Salad",
                "Caprese Salad", "Cobb Salad", "Chicken Salad", "Tuna Salad", "Egg Salad", "Gazpacho", "Minestrone", "Clam Chowder", "French Onion Soup", "Tomato Soup",
                "Chicken Noodle Soup", "Lentil Soup", "Potato Soup", "Broccoli Cheese Soup", "Tortilla Soup", "Goulash", "Stew", "Pot Roast", "Meatloaf", "Meatballs",
                "Shepherd's Pie", "Cottage Pie", "Quiche", "Frittata", "Soufflé", "Ratatouille", "Moussaka", "Empanadas", "Pierogi", "Schnitzel"]
    },
    {
        id: 4,
        family: "Electronics",
        words: ["Laptop", "Smartphone", "Tablet", "Headphones", "Smartwatch", "Speaker", "Camera", "Microphone", "Drone", "Printer",
                "Monitor", "Keyboard", "Mouse", "TV", "Router", "Game Console", "VR Headset", "USB Drive", "Power Bank", "Projector",
                "Radio", "Electric Scooter", "Fitness Tracker", "E-Reader", "Graphics Tablet", "External Hard Drive", "Wireless Charger", "Smart Light", "Soundbar", "Digital Clock",
                "Desktop Computer", "Gaming PC", "All-in-One PC", "Mac Mini", "iMac", "MacBook", "Chromebook", "iPad", "Android Tablet", "Surface Pro",
                "iPhone", "Android Phone", "Samsung Galaxy", "Google Pixel", "OnePlus", "Xiaomi Phone", "Huawei Phone", "Nokia Phone", "Motorola Phone", "Sony Xperia",
                "Bluetooth Speaker", "Smart Speaker", "Amazon Echo", "Google Home", "HomePod", "Alexa Device", "Portable Speaker", "JBL Speaker", "Bose Speaker", "Sonos Speaker",
                "DSLR Camera", "Mirrorless Camera", "Action Camera", "GoPro", "Instant Camera", "Polaroid Camera", "Film Camera", "Security Camera", "Webcam", "Ring Doorbell",
                "Gaming Mouse", "Mechanical Keyboard", "Wireless Keyboard", "Ergonomic Mouse", "Trackpad", "Stylus", "Drawing Tablet", "Wacom Tablet", "Gaming Headset", "Earbuds",
                "AirPods", "Wireless Earbuds", "Noise Cancelling Headphones", "Studio Headphones", "Gaming Headphones", "4K Monitor", "Ultrawide Monitor", "Curved Monitor", "Gaming Monitor", "Touchscreen Monitor",
                "LED TV", "OLED TV", "QLED TV", "Smart TV", "4K TV", "8K TV", "Plasma TV", "Projector Screen", "Home Theater", "Streaming Device",
                "Roku", "Apple TV", "Fire TV Stick", "Chromecast", "Nvidia Shield", "PlayStation", "Xbox", "Nintendo Switch", "Steam Deck", "Handheld Console",
                "Gaming Keyboard", "Gaming Chair", "Racing Wheel", "Flight Stick", "Gaming Controller", "Arcade Stick", "Light Strip", "Smart Plug", "Smart Thermostat", "Smart Lock",
                "Video Doorbell", "Baby Monitor", "Air Purifier", "Humidifier", "Dehumidifier", "Electric Fan", "Tower Fan", "Air Conditioner", "Space Heater", "Electric Blanket",
                "Robot Vacuum", "Cordless Vacuum", "Steam Mop", "Pressure Washer", "Electric Grill", "Air Fryer", "Instant Pot", "Slow Cooker", "Rice Cooker", "Coffee Maker"]
    },
    {
        id: 5,
        family: "Animals",
        words: ["Lion", "Tiger", "Elephant", "Giraffe", "Zebra", "Bear", "Wolf", "Fox", "Deer", "Rabbit",
                "Monkey", "Gorilla", "Panda", "Koala", "Kangaroo", "Penguin", "Eagle", "Owl", "Parrot", "Peacock",
                "Dolphin", "Shark", "Whale", "Octopus", "Seahorse", "Turtle", "Crocodile", "Snake", "Frog", "Butterfly",
                "Leopard", "Cheetah", "Jaguar", "Panther", "Cougar", "Lynx", "Bobcat", "Hyena", "Jackal", "Coyote",
                "Raccoon", "Skunk", "Badger", "Otter", "Beaver", "Squirrel", "Chipmunk", "Hedgehog", "Porcupine", "Armadillo",
                "Sloth", "Anteater", "Platypus", "Wombat", "Opossum", "Lemur", "Meerkat", "Mongoose", "Ferret", "Chinchilla",
                "Guinea Pig", "Hamster", "Gerbil", "Rat", "Mouse", "Vole", "Shrew", "Mole", "Bat", "Flying Fox",
                "Chimpanzee", "Orangutan", "Baboon", "Mandrill", "Gibbon", "Macaque", "Capuchin", "Spider Monkey", "Howler Monkey", "Tamarin",
                "Rhinoceros", "Hippopotamus", "Buffalo", "Bison", "Yak", "Ox", "Moose", "Elk", "Reindeer", "Caribou",
                "Antelope", "Gazelle", "Impala", "Wildebeest", "Gnu", "Llama", "Alpaca", "Camel", "Dromedary", "Donkey",
                "Horse", "Pony", "Mule", "Pig", "Boar", "Hog", "Sheep", "Lamb", "Goat", "Cow",
                "Bull", "Calf", "Dog", "Cat", "Kitten", "Puppy", "Rooster", "Chicken", "Hen", "Chick",
                "Duck", "Goose", "Swan", "Flamingo", "Pelican", "Stork", "Crane", "Heron", "Ibis", "Egret",
                "Hawk", "Falcon", "Kite", "Vulture", "Condor", "Raven", "Crow", "Magpie", "Jay", "Starling",
                "Sparrow", "Finch", "Canary", "Robin", "Bluebird", "Cardinal", "Woodpecker", "Hummingbird", "Kingfisher", "Albatross"]
    },
    {
        id: 6,
        family: "Geographical Places",
        words: ["Paris", "New York", "London", "Tokyo", "Sydney", "Rome", "Dubai", "Moscow", "Berlin", "Toronto",
                "Los Angeles", "Hong Kong", "Singapore", "Barcelona", "Amsterdam", "Venice", "Bangkok", "Rio de Janeiro", "Cairo", "Istanbul",
                "Mumbai", "Shanghai", "Mexico City", "Seoul", "Athens", "Lisbon", "Vienna", "Chicago", "San Francisco", "Prague"]
    },
    {
        id: 7,
        family: "Colors",
        words: ["Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink", "Brown", "Black", "White",
                "Gray", "Beige", "Turquoise", "Magenta", "Cyan", "Lavender", "Gold", "Silver", "Maroon", "Navy",
                "Teal", "Salmon", "Olive", "Coral", "Peach", "Ivory", "Amber", "Crimson", "Lilac", "Charcoal"]
    },
    {
        id: 8,
        family: "Modes of Transport",
        words: ["Car", "Bus", "Train", "Bicycle", "Motorcycle", "Scooter", "Airplane", "Boat", "Subway", "Helicopter",
                "Truck", "Tram", "Taxi", "Ferry", "Hot Air Balloon", "Yacht", "Skateboard", "Rollerblades", "Segway", "Hoverboard",
                "Rickshaw", "Spaceship", "Jet Ski", "Snowmobile", "Monorail", "Cable Car", "Golf Cart", "Quad Bike", "Electric Car", "Trolley"]
    },
    {
        id: 9,
        family: "Jobs & Professions",
        words: ["Doctor", "Engineer", "Teacher", "Lawyer", "Police Officer", "Firefighter", "Chef", "Artist", "Actor", "Singer",
                "Scientist", "Pilot", "Astronaut", "Nurse", "Architect", "Photographer", "Journalist", "Dentist", "Pharmacist", "Carpenter",
                "Electrician", "Mechanic", "Veterinarian", "Fashion Designer", "Interior Designer", "Accountant", "Banker", "Psychologist", "Athlete", "Software Developer"]
    },
    {
        id: 10,
        family: "Superheroes & Fictional Characters",
        words: ["Batman", "Superman", "Spider-Man", "Iron Man", "Hulk", "Thor", "Captain America", "Wonder Woman", "Flash", "Aquaman",
                "Doctor Strange", "Black Panther", "Wolverine", "Deadpool", "Daredevil", "Green Lantern", "Cyclops", "Rogue", "Professor X", "Magneto",
                "Joker", "Lex Luthor", "Venom", "Thanos", "Loki", "Darth Vader", "Yoda", "Harry Potter", "Frodo Baggins", "Sherlock Holmes"]
    },
    {
        id: 11,
        family: "Countries",
        words: [
            // Americas
            "United States", "Canada", "Mexico", "Brazil", "Argentina", "Chile", "Colombia", "Peru", "Venezuela", "Ecuador",
            "Bolivia", "Paraguay", "Uruguay", "Costa Rica", "Panama", "Cuba", "Jamaica", "Haiti", "Dominican Republic", "Guatemala",
            "Honduras", "Nicaragua", "El Salvador", "Belize", "Bahamas", "Trinidad and Tobago", "Barbados", "Guyana", "Suriname",
            // Europe
            "United Kingdom", "France", "Germany", "Italy", "Spain", "Portugal", "Netherlands", "Belgium", "Switzerland", "Austria",
            "Greece", "Poland", "Ukraine", "Romania", "Czech Republic", "Sweden", "Norway", "Denmark", "Finland", "Ireland",
            "Hungary", "Bulgaria", "Serbia", "Croatia", "Slovakia", "Lithuania", "Latvia", "Estonia", "Slovenia", "Bosnia and Herzegovina",
            "Albania", "North Macedonia", "Montenegro", "Luxembourg", "Malta", "Iceland", "Cyprus", "Belarus", "Moldova",
            // Asia
            "China", "India", "Japan", "South Korea", "Indonesia", "Thailand", "Vietnam", "Philippines", "Malaysia", "Singapore",
            "Pakistan", "Bangladesh", "Afghanistan", "Iran", "Iraq", "Saudi Arabia", "Yemen", "Oman", "United Arab Emirates", "Qatar",
            "Kuwait", "Bahrain", "Jordan", "Lebanon", "Syria", "Israel", "Palestine", "Turkey", "Armenia", "Georgia",
            "Azerbaijan", "Kazakhstan", "Uzbekistan", "Turkmenistan", "Kyrgyzstan", "Tajikistan", "Mongolia", "Nepal", "Bhutan", "Sri Lanka",
            "Myanmar", "Cambodia", "Laos", "Brunei", "Maldives", "Taiwan", "Hong Kong", "Macau", "North Korea",
            // Africa
            "Egypt", "South Africa", "Nigeria", "Kenya", "Ethiopia", "Morocco", "Algeria", "Tunisia", "Libya", "Sudan",
            "Ghana", "Ivory Coast", "Senegal", "Uganda", "Tanzania", "Rwanda", "Zambia", "Zimbabwe", "Botswana", "Namibia",
            "Angola", "Mozambique", "Madagascar", "Cameroon", "Mali", "Burkina Faso", "Niger", "Chad", "Somalia", "Congo",
            "Democratic Republic of Congo", "Gabon", "Equatorial Guinea", "Mauritius", "Seychelles", "Eritrea", "Djibouti", "Malawi", "Benin", "Togo",
            // Oceania
            "Australia", "New Zealand", "Fiji", "Papua New Guinea", "Solomon Islands", "Vanuatu", "Samoa", "Tonga", "Palau", "Micronesia"
        ]
    },
    {
        id: 12,
        family: "Software",
        words: ["Microsoft Word", "Excel", "PowerPoint", "Photoshop", "Illustrator", "Premiere Pro", "After Effects", "InDesign", "Lightroom", "Chrome",
                "Firefox", "Safari", "Edge", "Opera", "Brave", "Visual Studio Code", "Sublime Text", "Atom", "Notepad++", "PyCharm",
                "IntelliJ IDEA", "Eclipse", "Android Studio", "Xcode", "Unity", "Unreal Engine", "Blender", "Maya", "AutoCAD", "Revit",
                "SketchUp", "Figma", "Sketch", "Adobe XD", "Canva", "Slack", "Discord", "Teams", "Zoom", "Skype",
                "WhatsApp", "Telegram", "Signal", "Spotify", "iTunes", "VLC Media Player", "Windows Media Player", "Audacity", "GarageBand", "FL Studio",
                "Ableton Live", "Pro Tools", "Logic Pro", "Cubase", "OBS Studio", "Camtasia", "SnagIt", "WinRAR", "7-Zip", "WinZip",
                "FileZilla", "Dropbox", "Google Drive", "OneDrive", "iCloud", "Outlook", "Gmail", "Thunderbird", "Evernote", "OneNote",
                "Notion", "Trello", "Asana", "Monday.com", "Jira", "GitHub Desktop", "SourceTree", "GitKraken", "Docker", "VirtualBox",
                "VMware", "Parallels", "TeamViewer", "AnyDesk", "Remote Desktop", "Putty", "WinSCP", "Postman", "Insomnia", "DBeaver",
                "MySQL Workbench", "pgAdmin", "MongoDB Compass", "Redis", "Tableau", "Power BI", "Salesforce", "SAP", "Oracle", "QuickBooks",
                "Adobe Acrobat", "PDF Reader", "Foxit Reader", "GIMP", "Inkscape", "Krita", "Paint.NET", "CorelDRAW", "Affinity Designer", "Affinity Photo",
                "Final Cut Pro", "DaVinci Resolve", "HandBrake", "Plex", "Kodi", "Steam", "Epic Games Launcher", "Origin", "Battle.net", "GOG Galaxy",
                "Minecraft", "Roblox Studio", "Twitch", "YouTube Studio", "TikTok", "Instagram", "Facebook", "Twitter", "LinkedIn", "Reddit"]
    }
    ,
    {
        id: 13,
        family: "Friends",
        words: ["Abdul", "alfred", "yusuf", "suliman", "gabi", "wilson", "Marco"]
    },
   {     id: 14,
        family: "Troll",
        words: ["No hay nada que ver aqui", "Di lo que quieras", "INVENTATE COSAS", "CUALQUIER COSA VALE", "PON ALGO GRACIOSO" ]
   } 
];

export default wordsData;