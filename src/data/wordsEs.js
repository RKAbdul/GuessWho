const wordsEs = [
    {
        id: 1,
        family: "Personajes Famosos e Históricos",
        words: ["Einstein", "Napoleón", "Cleopatra", "Julio César", "Leonardo da Vinci", "Mozart", "Beethoven", "Shakespeare", "Winston Churchill", "Abraham Lincoln",
                "George Washington", "Juana de Arco", "Mahatma Gandhi", "Martin Luther King Jr.", "Marie Curie", "Alejandro Magno", "Tesla", "Karl Marx", "Sigmund Freud", "Walt Disney",
                "Isaac Newton", "Pablo Picasso", "Galileo Galilei", "Charles Darwin", "Gengis Kan", "Che Guevara", "Nelson Mandela", "Reina Victoria", "Marco Polo", "Madre Teresa",
                "Sócrates", "Platón", "Aristóteles", "Confucio", "Buda", "Jesucristo", "Mahoma", "Moisés", "Miguel Ángel", "Rafael",
                "Rembrandt", "Van Gogh", "Frida Kahlo", "Salvador Dalí", "Andy Warhol", "Claude Monet", "Edgar Degas", "Auguste Rodin", "Chopin", "Vivaldi",
                "Bach", "Handel", "Tchaikovsky", "Verdi", "Wagner", "Brahms", "Debussy", "Stravinsky", "Homero", "Dante",
                "Cervantes", "Jane Austen", "Charles Dickens", "Mark Twain", "Ernest Hemingway", "Virginia Woolf", "George Orwell", "F. Scott Fitzgerald", "Tolkien", "C.S. Lewis",
                "Voltaire", "Rousseau", "John Locke", "Thomas Hobbes", "Immanuel Kant", "Nietzsche", "Descartes", "Spinoza", "Hegel", "Sartre",
                "Simone de Beauvoir", "Rosa Parks", "Harriet Tubman", "Eleanor Roosevelt", "Ana Frank", "Helen Keller", "Florence Nightingale", "Susan B. Anthony", "Emmeline Pankhurst", "Malala Yousafzai",
                "Cristóbal Colón", "Vasco da Gama", "Fernando de Magallanes", "Capitán Cook", "Amelia Earhart", "Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Louis Pasteur", "Alexander Fleming",
                "Thomas Edison", "Alexander Graham Bell", "Hermanos Wright", "Henry Ford", "Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk", "Jeff Bezos", "Larry Page",
                "Sergey Brin", "Tim Berners-Lee", "Alan Turing", "Ada Lovelace", "Grace Hopper", "Stephen Hawking", "Carl Sagan", "Richard Feynman", "Oppenheimer", "Curie",
                "Rosalind Franklin", "Francis Crick", "James Watson", "Gregor Mendel", "Darwin", "Hipócrates", "Arquímedes", "Pitágoras", "Euclides", "Ptolomeo",
                "Copérnico", "Kepler", "Tycho Brahe", "Edmund Halley", "Benjamin Franklin", "Thomas Jefferson", "John Adams", "Theodore Roosevelt", "Franklin D. Roosevelt", "John F. Kennedy"]
    },
    {
        id: 2,
        family: "Objetos",
        words: ["Silla", "Mesa", "Lámpara", "Sofá", "Espejo", "Reloj", "Alfombra", "Estantería", "Cortinas", "Almohada",
                "Florero", "Cuaderno", "Bolígrafo", "Tijeras", "Mochila", "Toalla", "Cesta", "Taza", "Plato", "Cuchara",
                "Tenedor", "Cuchillo", "Servilleta", "Frasco", "Botella", "Caja", "Gafas", "Cartera", "Paraguas", "Casco",
                "Vela", "Marco de Fotos", "Papelera", "Felpudo", "Ventilador", "Calefactor", "Manta", "Sábana", "Colchón", "Sillón",
                "Cómoda", "Mesita de Noche", "Armario", "Escritorio", "Taburete", "Banco", "Sofá", "Puf", "Gabinete", "Cajón",
                "Cuadro", "Póster", "Calendario", "Grapadora", "Cinta Adhesiva", "Pegamento", "Regla", "Goma de Borrar", "Lápiz", "Marcador",
                "Resaltador", "Clip", "Carpeta de Anillas", "Carpeta", "Sobre", "Sello", "Cuerda Fina", "Cuerda", "Cadena", "Candado",
                "Llave", "Llavero", "Linterna", "Farol", "Pila", "Cargador", "Alargador", "Bombilla", "Enchufe", "Interruptor",
                "Control Remoto", "Termostato", "Detector de Humo", "Extintor", "Escoba", "Trapeador", "Recogedor", "Aspiradora", "Cubo", "Esponja",
                "Jabón para Platos", "Detergente", "Lejía", "Estropajo", "Plumero", "Ambientador", "Caja de Pañuelos", "Papel de Cocina", "Papel Higiénico", "Dispensador de Jabón",
                "Cepillo de Dientes", "Pasta de Dientes", "Champú", "Acondicionador", "Peine", "Cepillo para el Pelo", "Secador de Pelo", "Plancha", "Tabla de Planchar", "Percha",
                "Cesto de Ropa", "Pinza de Ropa", "Kit de Costura", "Hilo", "Aguja", "Botón", "Cremallera", "Cinta Métrica", "Cojín", "Cojín Decorativo",
                "Edredón", "Colcha", "Saco de Dormir", "Silla de Camping", "Nevera Portátil", "Termo", "Botella de Agua", "Fiambrera", "Tupper", "Tabla de Cortar",
                "Abrelatas", "Abridor de Botellas", "Sacacorchos", "Pelador", "Rallador", "Batidor de Varillas", "Espátula", "Cucharón", "Pinzas de Cocina", "Colador"]
    },
    {
        id: 3,
        family: "Comida",
        words: ["Pizza", "Hamburguesa", "Perrito Caliente", "Tacos", "Sushi", "Pasta", "Lasaña", "Pollo Frito", "Bistec", "Burrito",
                "Ensalada", "Sopa", "Curry", "Empanadillas", "Ramen", "Samosa", "Quesadilla", "Falafel", "Tarta de Queso", "Panqueques",
                "Gofres", "Brownie", "Helado", "Galletas", "Donas", "Croissant", "Chocolate", "Muffin", "Pudín", "Pastel",
                "Sándwich", "Bocadillo", "Wrap", "Bagel", "Tostada", "Torrija", "Tortilla Francesa", "Huevos Revueltos", "Huevos Escalfados", "Huevos Fritos",
                "Tocino", "Salchicha", "Jamón", "Chuleta de Cerdo", "Costillas", "Chuleta de Cordero", "Ternera", "Pavo", "Pato", "Codorniz",
                "Salmón", "Atún", "Bacalao", "Camarones", "Langosta", "Cangrejo", "Mejillones", "Ostras", "Almejas", "Vieiras",
                "Calamares", "Tilapia", "Pez Espada", "Caviar", "Sashimi", "Tempura", "Fideos", "Espaguetis", "Fettuccine", "Penne",
                "Ravioles", "Tortellini", "Ñoquis", "Risotto", "Paella", "Biryani", "Arroz Frito", "Pad Thai", "Pho", "Bibimbap",
                "Kimchi", "Rollitos de Primavera", "Rollitos de Huevo", "Wontons", "Bao", "Dim Sum", "Pato Pekín", "Cerdo Agridulce", "Pollo Kung Pao", "Pollo General Tso",
                "Sopa de Miso", "Udon", "Soba", "Yakitori", "Teriyaki", "Katsu", "Gyoza", "Onigiri", "Takoyaki", "Okonomiyaki",
                "Nachos", "Guacamole", "Salsa", "Chili", "Frijoles al Horno", "Ensalada de Col", "Ensalada de Papas", "Ensalada de Macarrones", "Ensalada César", "Ensalada Griega",
                "Ensalada Caprese", "Ensalada Cobb", "Ensalada de Pollo", "Ensalada de Atún", "Ensalada de Huevo", "Gazpacho", "Minestrone", "Sopa de Almejas", "Sopa de Cebolla Francesa", "Sopa de Tomate",
                "Sopa de Pollo con Fideos", "Sopa de Lentejas", "Sopa de Papa", "Sopa de Brócoli y Queso", "Sopa de Tortilla", "Gulash", "Guiso", "Carne Asada en Olla", "Pastel de Carne", "Albóndigas",
                "Pastel del Pastor", "Pastel de Carne al Horno", "Quiche", "Frittata", "Suflé", "Ratatouille", "Musaka", "Empanadas", "Pierogi", "Schnitzel"]
    },
    {
        id: 4,
        family: "Electrónica",
        words: ["Portátil", "Smartphone", "Tableta", "Audífonos", "Reloj Inteligente", "Altavoz", "Cámara", "Micrófono", "Dron", "Impresora",
                "Monitor", "Teclado", "Ratón", "Televisor", "Router", "Consola de Videojuegos", "Visor de Realidad Virtual", "Memoria USB", "Batería Portátil", "Proyector",
                "Radio", "Patinete Eléctrico", "Pulsera de Actividad", "Lector Electrónico", "Tableta Gráfica", "Disco Duro Externo", "Cargador Inalámbrico", "Luz Inteligente", "Barra de Sonido", "Reloj Digital",
                "Computadora de Escritorio", "PC Gamer", "PC Todo en Uno", "Mac Mini", "iMac", "MacBook", "Chromebook", "iPad", "Tableta Android", "Surface Pro",
                "iPhone", "Teléfono Android", "Samsung Galaxy", "Google Pixel", "OnePlus", "Teléfono Xiaomi", "Teléfono Huawei", "Teléfono Nokia", "Teléfono Motorola", "Sony Xperia",
                "Altavoz Bluetooth", "Altavoz Inteligente", "Amazon Echo", "Google Home", "HomePod", "Dispositivo Alexa", "Altavoz Portátil", "Altavoz JBL", "Altavoz Bose", "Altavoz Sonos",
                "Cámara Réflex", "Cámara sin Espejo", "Cámara de Acción", "GoPro", "Cámara Instantánea", "Cámara Polaroid", "Cámara de Película", "Cámara de Seguridad", "Cámara Web", "Timbre Ring",
                "Ratón Gamer", "Teclado Mecánico", "Teclado Inalámbrico", "Ratón Ergonómico", "Panel Táctil", "Lápiz Óptico", "Tableta de Dibujo", "Tableta Wacom", "Audífonos Gamer", "Auriculares Inalámbricos",
                "AirPods", "Auriculares Inalámbricos", "Audífonos con Cancelación de Ruido", "Audífonos de Estudio", "Audífonos Gamer", "Monitor 4K", "Monitor Ultrawide", "Monitor Curvo", "Monitor Gamer", "Monitor Táctil",
                "Televisor LED", "Televisor OLED", "Televisor QLED", "Smart TV", "Televisor 4K", "Televisor 8K", "Televisor de Plasma", "Pantalla de Proyección", "Home Theater", "Dispositivo de Streaming",
                "Roku", "Apple TV", "Fire TV Stick", "Chromecast", "Nvidia Shield", "PlayStation", "Xbox", "Nintendo Switch", "Steam Deck", "Consola Portátil",
                "Teclado Gamer", "Silla Gamer", "Volante de Carreras", "Palanca de Vuelo", "Control de Videojuegos", "Palanca Arcade", "Tira de Luces", "Enchufe Inteligente", "Termostato Inteligente", "Cerradura Inteligente",
                "Timbre con Video", "Monitor de Bebé", "Purificador de Aire", "Humidificador", "Deshumidificador", "Ventilador Eléctrico", "Ventilador de Torre", "Aire Acondicionado", "Calefactor Portátil", "Manta Eléctrica",
                "Aspiradora Robot", "Aspiradora Inalámbrica", "Trapeador a Vapor", "Hidrolavadora", "Parrilla Eléctrica", "Freidora de Aire", "Olla de Cocción Rápida", "Olla de Cocción Lenta", "Arrocera", "Cafetera"]
    },
    {
        id: 5,
        family: "Animales",
        words: ["León", "Tigre", "Elefante", "Jirafa", "Cebra", "Oso", "Lobo", "Zorro", "Ciervo", "Conejo",
                "Mono", "Gorila", "Panda", "Koala", "Canguro", "Pingüino", "Águila", "Búho", "Loro", "Pavo Real",
                "Delfín", "Tiburón", "Ballena", "Pulpo", "Caballito de Mar", "Tortuga", "Cocodrilo", "Serpiente", "Rana", "Mariposa",
                "Leopardo", "Guepardo", "Jaguar", "Pantera", "Puma", "Lince", "Gato Montés", "Hiena", "Chacal", "Coyote",
                "Mapache", "Mofeta", "Tejón", "Nutria", "Castor", "Ardilla", "Ardilla Listada", "Erizo", "Puercoespín", "Armadillo",
                "Perezoso", "Oso Hormiguero", "Ornitorrinco", "Wombat", "Zarigüeya", "Lémur", "Suricato", "Mangosta", "Hurón", "Chinchilla",
                "Cobaya", "Hámster", "Jerbo", "Rata", "Ratón", "Topillo", "Musaraña", "Topo", "Murciélago", "Zorro Volador",
                "Chimpancé", "Orangután", "Babuino", "Mandril", "Gibón", "Macaco", "Mono Capuchino", "Mono Araña", "Mono Aullador", "Tamarino",
                "Rinoceronte", "Hipopótamo", "Búfalo", "Bisonte", "Yak", "Buey", "Alce", "Uapití", "Reno", "Caribú",
                "Antílope", "Gacela", "Impala", "Ñu Azul", "Ñu", "Llama", "Alpaca", "Camello", "Dromedario", "Burro",
                "Caballo", "Poni", "Mula", "Cerdo", "Jabalí", "Puerco", "Oveja", "Cordero", "Cabra", "Vaca",
                "Toro", "Ternero", "Perro", "Gato", "Gatito", "Cachorro", "Gallo", "Pollo", "Gallina", "Pollito",
                "Pato", "Ganso", "Cisne", "Flamenco", "Pelícano", "Cigüeña", "Grulla", "Garza", "Ibis", "Garceta",
                "Gavilán", "Halcón", "Milano", "Buitre", "Cóndor", "Cuervo Grande", "Cuervo", "Urraca", "Arrendajo", "Estornino",
                "Gorrión", "Pinzón", "Canario", "Petirrojo", "Azulejo", "Cardenal", "Pájaro Carpintero", "Colibrí", "Martín Pescador", "Albatros"]
    },
    {
        id: 6,
        family: "Lugares Geográficos",
        words: ["París", "Nueva York", "Londres", "Tokio", "Sídney", "Roma", "Dubái", "Moscú", "Berlín", "Toronto",
                "Los Ángeles", "Hong Kong", "Singapur", "Barcelona", "Ámsterdam", "Venecia", "Bangkok", "Río de Janeiro", "El Cairo", "Estambul",
                "Bombay", "Shanghái", "Ciudad de México", "Seúl", "Atenas", "Lisboa", "Viena", "Chicago", "San Francisco", "Praga"]
    },
    {
        id: 7,
        family: "Colores",
        words: ["Rojo", "Azul", "Verde", "Amarillo", "Morado", "Naranja", "Rosa", "Marrón", "Negro", "Blanco",
                "Gris", "Beige", "Turquesa", "Magenta", "Cian", "Lavanda", "Dorado", "Plateado", "Granate", "Azul Marino",
                "Verde Azulado", "Salmón", "Oliva", "Coral", "Durazno", "Marfil", "Ámbar", "Carmesí", "Lila", "Gris Carbón"]
    },
    {
        id: 8,
        family: "Medios de Transporte",
        words: ["Coche", "Autobús", "Tren", "Bicicleta", "Motocicleta", "Patinete", "Avión", "Barco", "Metro", "Helicóptero",
                "Camión", "Tranvía", "Taxi", "Ferry", "Globo Aerostático", "Yate", "Patineta", "Patines en Línea", "Segway", "Hoverboard",
                "Rickshaw", "Nave Espacial", "Moto de Agua", "Motonieve", "Monorriel", "Teleférico", "Carrito de Golf", "Cuatrimoto", "Coche Eléctrico", "Trolebús"]
    },
    {
        id: 9,
        family: "Trabajos y Profesiones",
        words: ["Doctor", "Ingeniero", "Maestro", "Abogado", "Policía", "Bombero", "Chef", "Artista", "Actor", "Cantante",
                "Científico", "Piloto", "Astronauta", "Enfermero", "Arquitecto", "Fotógrafo", "Periodista", "Dentista", "Farmacéutico", "Carpintero",
                "Electricista", "Mecánico", "Veterinario", "Diseñador de Moda", "Diseñador de Interiores", "Contador", "Banquero", "Psicólogo", "Atleta", "Desarrollador de Software"]
    },
    {
        id: 10,
        family: "Superhéroes y Personajes Ficticios",
        words: ["Batman", "Superman", "Spider-Man", "Iron Man", "Hulk", "Thor", "Capitán América", "Mujer Maravilla", "Flash", "Aquaman",
                "Doctor Extraño", "Pantera Negra", "Lobezno", "Deadpool", "Daredevil", "Linterna Verde", "Cíclope", "Pícara", "Profesor X", "Magneto",
                "Joker", "Lex Luthor", "Venom", "Thanos", "Loki", "Darth Vader", "Yoda", "Harry Potter", "Frodo Bolsón", "Sherlock Holmes"]
    },
    {
        id: 11,
        family: "Países",
        words: [
            // América
            "Estados Unidos", "Canadá", "México", "Brasil", "Argentina", "Chile", "Colombia", "Perú", "Venezuela", "Ecuador",
            "Bolivia", "Paraguay", "Uruguay", "Costa Rica", "Panamá", "Cuba", "Jamaica", "Haití", "República Dominicana", "Guatemala",
            "Honduras", "Nicaragua", "El Salvador", "Belice", "Bahamas", "Trinidad y Tobago", "Barbados", "Guyana", "Surinam",
            // Europa
            "Reino Unido", "Francia", "Alemania", "Italia", "España", "Portugal", "Países Bajos", "Bélgica", "Suiza", "Austria",
            "Grecia", "Polonia", "Ucrania", "Rumania", "República Checa", "Suecia", "Noruega", "Dinamarca", "Finlandia", "Irlanda",
            "Hungría", "Bulgaria", "Serbia", "Croacia", "Eslovaquia", "Lituania", "Letonia", "Estonia", "Eslovenia", "Bosnia y Herzegovina",
            "Albania", "Macedonia del Norte", "Montenegro", "Luxemburgo", "Malta", "Islandia", "Chipre", "Bielorrusia", "Moldavia",
            // Asia
            "China", "India", "Japón", "Corea del Sur", "Indonesia", "Tailandia", "Vietnam", "Filipinas", "Malasia", "Singapur",
            "Pakistán", "Bangladés", "Afganistán", "Irán", "Irak", "Arabia Saudita", "Yemen", "Omán", "Emiratos Árabes Unidos", "Catar",
            "Kuwait", "Baréin", "Jordania", "Líbano", "Siria", "Israel", "Palestina", "Turquía", "Armenia", "Georgia",
            "Azerbaiyán", "Kazajistán", "Uzbekistán", "Turkmenistán", "Kirguistán", "Tayikistán", "Mongolia", "Nepal", "Bután", "Sri Lanka",
            "Myanmar", "Camboya", "Laos", "Brunéi", "Maldivas", "Taiwán", "Hong Kong", "Macao", "Corea del Norte",
            // África
            "Egipto", "Sudáfrica", "Nigeria", "Kenia", "Etiopía", "Marruecos", "Argelia", "Túnez", "Libia", "Sudán",
            "Ghana", "Costa de Marfil", "Senegal", "Uganda", "Tanzania", "Ruanda", "Zambia", "Zimbabue", "Botsuana", "Namibia",
            "Angola", "Mozambique", "Madagascar", "Camerún", "Malí", "Burkina Faso", "Níger", "Chad", "Somalia", "Congo",
            "República Democrática del Congo", "Gabón", "Guinea Ecuatorial", "Mauricio", "Seychelles", "Eritrea", "Yibuti", "Malaui", "Benín", "Togo",
            // Oceanía
            "Australia", "Nueva Zelanda", "Fiyi", "Papúa Nueva Guinea", "Islas Salomón", "Vanuatu", "Samoa", "Tonga", "Palaos", "Micronesia"
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
                "Adobe Acrobat", "Lector de PDF", "Foxit Reader", "GIMP", "Inkscape", "Krita", "Paint.NET", "CorelDRAW", "Affinity Designer", "Affinity Photo",
                "Final Cut Pro", "DaVinci Resolve", "HandBrake", "Plex", "Kodi", "Steam", "Epic Games Launcher", "Origin", "Battle.net", "GOG Galaxy",
                "Minecraft", "Roblox Studio", "Twitch", "YouTube Studio", "TikTok", "Instagram", "Facebook", "Twitter", "LinkedIn", "Reddit"]
    }
    ,
    {
        id: 13,
        family: "Amigos",
        words: ["Abdul", "alfred", "yusuf", "suliman", "gabi", "wilson", "Marco"]
    },
   {     id: 14,
        family: "Troll",
        words: ["No hay nada que ver aqui", "Di lo que quieras", "INVENTATE COSAS", "CUALQUIER COSA VALE", "PON ALGO GRACIOSO" ]
   }
];

export default wordsEs;
