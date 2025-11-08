// Global keydown listener for keyboard navigation (A, B, C, D for options; Enter for Next/Submit)
document.addEventListener('keydown', (event) => {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer || quizContainer.style.display !== 'flex') {
        return; // Only process keys when the quiz is visible
    }

    const key = event.key.toUpperCase();
    
    // --- 1. Handle Option Selection (A, B, C, D) ---
    if (['A', 'B', 'C', 'D'].includes(key)) {
        const optionIndex = key.charCodeAt(0) - 'A'.charCodeAt(0); // A=0, B=1, C=2, D=3
        const options = document.querySelectorAll('.quiz-option');

        if (optionIndex >= 0 && optionIndex < options.length) {
            event.preventDefault(); // Stop default browser actions
            
            const selectedOption = options[optionIndex];
            
            // Programmatically simulate click behavior: clear previous selections and select the current one
            document.querySelectorAll('.quiz-option').forEach(el => {
                el.classList.remove('selected');
            });
            selectedOption.classList.add('selected');
        }
    }
    
    // --- 2. Handle Submission/Advancement (Enter Key) ---
    else if (event.key === 'Enter') {
        const nextBtn = document.getElementById('next-btn');
        const submitBtn = document.getElementById('submit-btn');
        
        event.preventDefault(); 
        
        // Trigger Next or Submit button click if visible
        if (nextBtn && nextBtn.style.display !== 'none') {
            nextBtn.click();
        } else if (submitBtn && submitBtn.style.display !== 'none') {
            submitBtn.click();
        }
    }
});


document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-quiz');
  const quizContainer = document.getElementById('quiz-container');
  const nameContainer = document.getElementById('name-container');
  const shareContainer = document.getElementById('share-container');
  const nextBtn = document.getElementById('next-btn');
  const submitBtn = document.getElementById('submit-btn');
  const skipBtn = document.getElementById('skip-btn');
  const quizLinkInput = document.getElementById('quiz-link');
  
  const TARGET_ANSWERED_QUESTIONS = 10; // Target number of non-skipped answers
  
  /* The Questions start from here and make sure they are 50 */
  let allQuestions = [
    // --- START OF NAIJA-FLAVORED QUESTIONS (50 Total) ---

    // 1. Food Staple
    {
        question: "What's your preferred swallow?",
        options: [
            { text: "Pounded Yam", image: "https://placehold.co/200x200/cc0000/ffffff?text=Pounded+Yam" },
            { text: "Fufu/Akpu", image: "https://placehold.co/200x200/6aa84f/ffffff?text=Fufu/Akpu" },
            { text: "Eba/Garri", image: "https://placehold.co/200x200/ff9900/000000?text=Eba/Garri" },
            { text: "Semovita", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Semovita" }
        ]
    },
    
    // 2. Jollof Comparison
    {
        question: "Which Jollof is superior?",
        options: [
            { text: "Nigerian Jollof", image: "https://placehold.co/200x200/e06666/ffffff?text=Naija+Jollof" },
            { text: "Ghana Jollof", image: "https://placehold.co/200x200/ffd966/000000?text=Ghana+Jollof" },
            { text: "Party Jollof (Smoky)", image: "https://placehold.co/200x200/e69138/000000?text=Party+Jollof" },
            { text: "White Rice & Stew", image: "https://placehold.co/200x200/cccccc/000000?text=White+Rice" }
        ]
    },
    // 3. Traffic Style
    {
        question: "How do you handle Lagos traffic (Go Slow)?",
        options: [
            { text: "Play loud music", image: "https://placehold.co/200x200/ff9900/000000?text=Loud+Music" },
            { text: "Sleep/Nap", image: "https://placehold.co/200x200/351c75/ffffff?text=Nap/Sleep" },
            { text: "Bemoan the government", image: "https://placehold.co/200x200/cc0000/ffffff?text=Complain" },
            { text: "Buy something from a hawker", image: "https://placehold.co/200x200/93c47d/000000?text=Hawker" }
        ]
    },
    // 4. Naija Phrase
    {
        question: "Which Nigerian slang do you use the most?",
        options: [
            { text: "E choke/E sweet", image: "https://placehold.co/200x200/e06666/ffffff?text=E+Choke" },
            { text: "I can't coman kill myself", image: "https://placehold.co/200x200/ffd966/000000?text=No+Stress" },
            { text: "Wahala be like...", image: "https://placehold.co/200x200/000000/ffffff?text=Wahala" },
            { text: "Omo!", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Omo" }
        ]
    },
    // 5. Naija Party Role
    {
        question: "Your primary role at a Nigerian party (Owambe)?",
        options: [
            { text: "Dancer/On the floor", image: "https://placehold.co/200x200/d5a6bd/000000?text=Dancer" },
            { text: "Food critic/Eating", image: "https://placehold.co/200x200/6aa84f/ffffff?text=Food+Critic" },
            { text: "Spraying money", image: "https://placehold.co/200x200/ff9900/000000?text=Sprayer" },
            { text: "Sitting with elders", image: "https://placehold.co/200x200/674ea7/ffffff?text=Elders+Table" }
        ]
    },
    // 6. Nigerian Movie
    {
        question: "Nollywood genre you watch most?",
        options: [
            { text: "Epic/Old Nollywood", image: "https://placehold.co/200x200/e69138/000000?text=Epic" },
            { text: "Modern/New Nollywood", image: "https://placehold.co/200x200/3d85c6/ffffff?text=New+Nollywood" },
            { text: "Yoruba/Igbo Language Film", image: "https://placehold.co/200x200/cc0000/ffffff?text=Indigenous" },
            { text: "Comedy Skits", image: "https://placehold.co/200x200/ffd966/000000?text=Skits" }
        ]
    },
    // 7. Beverage Choice
    {
        question: "Your go-to soft drink/beverage?",
        options: [
            { text: "Coca-Cola", image: "https://placehold.co/200x200/cc0000/ffffff?text=Coca-Cola" },
            { text: "Fanta/Sprite", image: "https://placehold.co/200x200/ff9900/000000?text=Fanta/Sprite" },
            { text: "Malt/Non-alcoholic", image: "https://placehold.co/200x200/351c75/ffffff?text=Malt" },
            { text: "Zobo/Fresh Juice", image: "https://placehold.co/200x200/93c47d/000000?text=Zobo" }
        ]
    },
    // 8. Naija Parent Reaction
    {
        question: "How do you escape punishment (koboko)?",
        options: [
            { text: "Hide the cane", image: "https://placehold.co/200x200/cccccc/000000?text=Hide+Cane" },
            { text: "Apologize profusely", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Apologize" },
            { text: "Cry dramatically", image: "https://placehold.co/200x200/e06666/ffffff?text=Cry" },
            { text: "Run outside", image: "https://placehold.co/200x200/6aa84f/ffffff?text=Run" }
        ]
    },
    // 9. Side Hustle
    {
        question: "If you had a side hustle, it would be:",
        options: [
            { text: "Crypto/Forex trading", image: "https://placehold.co/200x200/351c75/ffffff?text=Trading" },
            { text: "Content creation (TikTok/IG)", image: "https://placehold.co/200x200/d5a6bd/000000?text=Content+Creator" },
            { text: "Selling clothes/shoes", image: "https://placehold.co/200x200/e69138/000000?text=E-Commerce" },
            { text: "Graphic design/Tech", image: "https://placehold.co/200x200/000000/ffffff?text=Tech/Design" }
        ]
    },
    // 10. Naija Music
    {
        question: "Your favorite style of Naija music?",
        options: [
            { text: "Afrobeats (Wizkid/Davido)", image: "https://placehold.co/200x200/ff9900/000000?text=Afrobeats" },
            { text: "Street Pop (Portable/Naira Marley)", image: "https://placehold.co/200x200/cc0000/ffffff?text=Street+Pop" },
            { text: "Afro-R&B/Soul (Fireboy/Tems)", image: "https://placehold.co/200x200/674ea7/ffffff?text=Afro-R&B" },
            { text: "Gospel", image: "https://placehold.co/200x200/93c47d/000000?text=Gospel" }
        ]
    },
    // 11. Travel Method
    {
        question: "Which do you prefer for inter-state travel?",
        options: [
            { text: "Luxury Bus/Motor Park", image: "https://placehold.co/200x200/e69138/000000?text=Luxury+Bus" },
            { text: "Train (If available)", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Train" },
            { text: "Flying (Aeroplane)", image: "https://placehold.co/200x200/d5a6bd/000000?text=Flying" },
            { text: "Personal Car/Hired Driver", image: "https://placehold.co/200x200/ff9900/000000?text=Private+Car" }
        ]
    },
    // 12. Phone Brand
    {
        question: "Your preferred phone brand?",
        options: [
            { text: "iPhone", image: "https://placehold.co/200x200/cccccc/000000?text=iPhone" },
            { text: "Samsung", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Samsung" },
            { text: "Tecno/Infinix/Gionee", image: "https://placehold.co/200x200/6aa84f/ffffff?text=Infinix/Tecno" },
            { text: "Other Android/No preference", image: "https://placehold.co/200x200/000000/ffffff?text=Other+Android" }
        ]
    },
    // 13. Street Food
    {
        question: "Favorite Nigerian street snack?",
        options: [
            { text: "Suya", image: "https://placehold.co/200x200/cc0000/ffffff?text=Suya" },
            { text: "Puff Puff", image: "https://placehold.co/200x200/ffd966/000000?text=Puff+Puff" },
            { text: "Akara/Moi Moi", image: "https://placehold.co/200x200/e69138/000000?text=Akara" },
            { text: "Roasted Corn/Pear (Ube)", image: "https://placehold.co/200x200/93c47d/000000?text=Corn/Ube" }
        ]
    },
    // 14. Naija Wedding
    {
        question: "What's the best part of a Nigerian wedding?",
        options: [
            { text: "The Aso-Ebi outfit", image: "https://placehold.co/200x200/d5a6bd/000000?text=Aso-Ebi" },
            { text: "The food and drinks", image: "https://placehold.co/200x200/6aa84f/ffffff?text=Food" },
            { text: "The dancing competition", image: "https://placehold.co/200x200/e06666/ffffff?text=Dancing" },
            { text: "Watching the couple cry", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Crying" }
        ]
    },
    // 15. Career Goal
    {
        question: "Which career path appeals to you most?",
        options: [
            { text: "Medicine/Healthcare", image: "https://placehold.co/200x200/cc0000/ffffff?text=Medicine" },
            { text: "Tech/Engineering", image: "https://placehold.co/200x200/351c75/ffffff?text=Tech" },
            { text: "Law/Politics", image: "https://placehold.co/200x200/ff9900/000000?text=Law/Politics" },
            { text: "Arts/Entertainment", image: "https://placehold.co/200x200/674ea7/ffffff?text=Arts" }
        ]
    },
    // 16. Local Market
    {
        question: "Where do you prefer to buy groceries?",
        options: [
            { text: "Local Market (e.g., Balogun)", image: "https://placehold.co/200x200/e69138/000000?text=Local+Market" },
            { text: "Supermarket (Shoprite/Spar)", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Supermarket" },
            { text: "Online Ordering", image: "https://placehold.co/200x200/000000/ffffff?text=Online" },
            { text: "Hawkers/Roadside Sellers", image: "https://placehold.co/200x200/93c47d/000000?text=Roadside" }
        ]
    },
    // 17. Naija Dish Combo
    {
        question: "Best pairing for your rice?",
        options: [
            { text: "Dodo (Fried Plantain)", image: "https://placehold.co/200x200/ffd966/000000?text=Dodo" },
            { text: "Fried Chicken/Turkey", image: "https://placehold.co/200x200/cc0000/ffffff?text=Fried+Meat" },
            { text: "Salad/Coleslaw", image: "https://placehold.co/200x200/6aa84f/ffffff?text=Salad" },
            { text: "Fried Eggs/Boiled Eggs", image: "https://placehold.co/200x200/cccccc/000000?text=Eggs" }
        ]
    },
    // 18. Financial Wisdom
    {
        question: "Which financial advice do your parents give most?",
        options: [
            { text: "Save money always", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Save" },
            { text: "Study hard and get a good job", image: "https://placehold.co/200x200/674ea7/ffffff?text=Study+Hard" },
            { text: "Trust no one (except family)", image: "https://placehold.co/200x200/000000/ffffff?text=Trust+No+One" },
            { text: "Send money home always", image: "https://placehold.co/200x200/ff9900/000000?text=Send+Home" }
        ]
    },
    // 19. Nigerian Currency
    {
        question: "Best way to handle Naira scarcity?",
        options: [
            { text: "Bank transfers (online)", image: "https://placehold.co/200x200/351c75/ffffff?text=Transfer" },
            { text: "POS cash withdrawal", image: "https://placehold.co/200x200/e06666/ffffff?text=POS" },
            { text: "Barter with friends/family", image: "https://placehold.co/200x200/93c47d/000000?text=Barter" },
            { text: "Use foreign currency", image: "https://placehold.co/200x200/d5a6bd/000000?text=Foreign+Currency" }
        ]
    },
    // 20. Naija Church Service
    {
        question: "Your favorite part of a church service (if applicable)?",
        options: [
            { text: "Praise and worship (Dancing)", image: "https://placehold.co/200x200/d5a6bd/000000?text=Praise" },
            { text: "The Pastor's sermon", image: "https://placehold.co/200x200/ff9900/000000?text=Sermon" },
            { text: "Giving of offerings/Tithe", image: "https://placehold.co/200x200/ffd966/000000?text=Offering" },
            { text: "Greeting and fellowship", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Fellowship" }
        ]
    },
    // 21. Naija Snack Brand
    {
        question: "Favorite Nigerian biscuit/snack brand?",
        options: [
            { text: "Digestive biscuits", image: "https://placehold.co/200x200/cccccc/000000?text=Digestive" },
            { text: "Cabin biscuits", image: "https://placehold.co/200x200/e69138/000000?text=Cabin" },
            { text: "Gala/Sausage Rolls", image: "https://placehold.co/200x200/cc0000/ffffff?text=Gala" },
            { text: "Meat Pie/Egg Roll", image: "https://placehold.co/200x200/6aa84f/ffffff?text=Meat+Pie" }
        ]
    },
    // 22. University Major
    {
        question: "If you studied in Nigeria, what course would you aim for?",
        options: [
            { text: "Computer Science/IT", image: "https://placehold.co/200x200/351c75/ffffff?text=Comp+Sci" },
            { text: "Accounting/Economics", image: "https://placehold.co/200x200/ff9900/000000?text=Economics" },
            { text: "Mass Communication", image: "https://placehold.co/200x200/674ea7/ffffff?text=Mass+Comm" },
            { text: "Any course to escape ASUU strike", image: "https://placehold.co/200x200/e06666/ffffff?text=ASUU+Escape" }
        ]
    },
    // 23. Energy Source
    {
        question: "How do you cope with power outages (NEPA/PHCN)?",
        options: [
            { text: "Generator (I beta pass my neighbor)", image: "https://placehold.co/200x200/000000/ffffff?text=Generator" },
            { text: "Inverter/Solar", image: "https://placehold.co/200x200/93c47d/000000?text=Solar" },
            { text: "Go to a friend's house", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Visit+Friend" },
            { text: "Just manage the heat", image: "https://placehold.co/200x200/cc0000/ffffff?text=Manage+Heat" }
        ]
    },
    // 24. Weekend Hangout
    {
        question: "Ideal weekend activity in a Nigerian city?",
        options: [
            { text: "Clubbing/Lounge with friends", image: "https://placehold.co/200x200/e06666/ffffff?text=Clubbing" },
            { text: "Beach outing (Lekki/Tarkwa)", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Beach" },
            { text: "Relax at home and stream", image: "https://placehold.co/200x200/351c75/ffffff?text=Stream+Home" },
            { text: "Visit a traditional landmark/museum", image: "https://placehold.co/200x200/e69138/000000?text=Landmark" }
        ]
    },
    // 25. Fashion Sense
    {
        question: "Your go-to style of clothing?",
        options: [
            { text: "Traditional (Native wears)", image: "https://placehold.co/200x200/d5a6bd/000000?text=Native+Wear" },
            { text: "Streetwear/Casual", image: "https://placehold.co/200x200/ff9900/000000?text=Streetwear" },
            { text: "Corporate/Formal", image: "https://placehold.co/200x200/cccccc/000000?text=Formal" },
            { text: "Afrocentric/Bohemian", image: "https://placehold.co/200x200/6aa84f/ffffff?text=Bohemian" }
        ]
    },
    // 26. Dating Norms
    {
        question: "What's a must-have in a potential Nigerian partner?",
        options: [
            { text: "Must be rich/have money", image: "https://placehold.co/200x200/ffd966/000000?text=Money" },
            { text: "Must be tall/fine", image: "https://placehold.co/200x200/e06666/ffffff?text=Good+Looks" },
            { text: "Must be God-fearing", image: "https://placehold.co/200x200/93c47d/000000?text=God-fearing" },
            { text: "Must be supportive/kind", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Supportive" }
        ]
    },
    // 27. Naija Internet
    {
        question: "Which network gives you the most *gbas gbos* (reliable data)?",
        options: [
            { text: "MTN", image: "https://placehold.co/200x200/ff9900/000000?text=MTN" },
            { text: "Airtel", image: "https://placehold.co/200x200/cc0000/ffffff?text=Airtel" },
            { text: "Glo", image: "https://placehold.co/200x200/6aa84f/ffffff?text=Glo" },
            { text: "9mobile", image: "https://placehold.co/200x200/3d85c6/ffffff?text=9mobile" }
        ]
    },
    // 28. Naija Dish
    {
        question: "Best soup to eat with swallow?",
        options: [
            { text: "Egusi", image: "https://placehold.co/200x200/ffd966/000000?text=Egusi" },
            { text: "Ogbono", image: "https://placehold.co/200x200/e69138/000000?text=Ogbono" },
            { text: "Efo Riro/Vegetable Soup", image: "https://placehold.co/200x200/93c47d/000000?text=Efo+Riro" },
            { text: "Oha/Bitterleaf Soup", image: "https://placehold.co/200x200/674ea7/ffffff?text=Oha" }
        ]
    },
    // 29. Nigerian Celeb
    {
        question: "Which Nigerian celebrity are you crushing on?",
        options: [
            { text: "A Singer (Afrobeats)", image: "https://placehold.co/200x200/ff9900/000000?text=Afrobeats+Star" },
            { text: "A Skitmaker/Comedian", image: "https://placehold.co/200x200/e06666/ffffff?text=Skitmaker" },
            { text: "An Actor/Actress", image: "https://placehold.co/200x200/d5a6bd/000000?text=Nollywood+Actor" },
            { text: "A BBNaija Star", image: "https://placehold.co/200x200/3d85c6/ffffff?text=BBNaija" }
        ]
    },
    // 30. Naija Wedding Gift
    {
        question: "Ideal wedding gift to give?",
        options: [
            { text: "Cash (No stress)", image: "https://placehold.co/200x200/cc0000/ffffff?text=Cash" },
            { text: "Home appliances (Blender/TV)", image: "https://placehold.co/200x200/351c75/ffffff?text=Appliance" },
            { text: "A unique experience (Trip)", image: "https://placehold.co/200x200/674ea7/ffffff?text=Experience" },
            { text: "Bible/Quran", image: "https://placehold.co/200x200/cccccc/000000?text=Holy+Book" }
        ]
    },
    // 31. Pidgin Usage
    {
        question: "How often do you speak Pidgin?",
        options: [
            { text: "Every day/Most conversations", image: "https://placehold.co/200x200/ff9900/000000?text=Always" },
            { text: "Only with close friends", image: "https://placehold.co/200x200/93c47d/000000?text=With+Friends" },
            { text: "Only when angry/excited", image: "https://placehold.co/200x200/e06666/ffffff?text=Emotionally" },
            { text: "Hardly ever/Only English", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Hardly+Ever" }
        ]
    },
    // 32. Naija Party Drinks
    {
        question: "If you're buying drinks, you pick:",
        options: [
            { text: "Beer/Guinness Stout", image: "https://placehold.co/200x200/000000/ffffff?text=Beer" },
            { text: "Soft Drinks (Coke/Fanta)", image: "https://placehold.co/200x200/cc0000/ffffff?text=Soft+Drink" },
            { text: "Wine/Champagne", image: "https://placehold.co/200x200/d5a6bd/000000?text=Wine" },
            { text: "Malt/Non-alcoholic options", image: "https://placehold.co/200x200/6aa84f/ffffff?text=Malt" }
        ]
    },
    // 33. Naija School Life
    {
        question: "Your favorite memory from secondary school?",
        options: [
            { text: "Inter-House Sports", image: "https://placehold.co/200x200/93c47d/000000?text=Sports" },
            { text: "Social Night/Prom", image: "https://placehold.co/200x200/e06666/ffffff?text=Social+Night" },
            { text: "End of Year Dinner/Parties", image: "https://placehold.co/200x200/ff9900/000000?text=Parties" },
            { text: "The drama in the dormitory/hostel", image: "https://placehold.co/200x200/674ea7/ffffff?text=Hostel+Drama" }
        ]
    },
    // 34. Naija Proverb
    {
        question: "Which proverb do you believe in most?",
        options: [
            { text: "No food for lazy man", image: "https://placehold.co/200x200/cc0000/ffffff?text=Hardwork" },
            { text: "Better late than never", image: "https://placehold.co/200x200/ffd966/000000?text=Late" },
            { text: "Patience is a virtue", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Patience" },
            { text: "What money cannot do, more money can do", image: "https://placehold.co/200x200/e69138/000000?text=Money+Talks" }
        ]
    },
    // 35. Local Spot
    {
        question: "Best place to meet friends?",
        options: [
            { text: "A buka/local spot", image: "https://placehold.co/200x200/e69138/000000?text=Buka" },
            { text: "Fast food joint (Chicken Republic)", image: "https://placehold.co/200x200/ff9900/000000?text=Fast+Food" },
            { text: "At home/Online gaming", image: "https://placehold.co/200x200/351c75/ffffff?text=Home" },
            { text: "Coffee shop/Fancy restaurant", image: "https://placehold.co/200x200/d5a6bd/000000?text=Fancy" }
        ]
    },
    // 36. Naija Politics
    {
        question: "If you were President for a day, what's your priority?",
        options: [
            { text: "Fix electricity", image: "https://placehold.co/200x200/000000/ffffff?text=Electricity" },
            { text: "Fix roads/transport", image: "https://placehold.co/200x200/cc0000/ffffff?text=Roads" },
            { text: "Improve education funding", image: "https://placehold.co/200x200/674ea7/ffffff?text=Education" },
            { text: "Fight corruption", image: "https://placehold.co/200x200/e06666/ffffff?text=Corruption" }
        ]
    },
    // 37. House Chores
    {
        question: "The house chore you hate the most?",
        options: [
            { text: "Washing dishes", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Dishes" },
            { text: "Sweeping/Mopping", image: "https://placehold.co/200x200/6aa84f/ffffff?text=Mopping" },
            { text: "Washing clothes by hand", image: "https://placehold.co/200x200/cccccc/000000?text=Washing" },
            { text: "Cleaning the toilet/bathroom", image: "https://placehold.co/200x200/ffd966/000000?text=Toilet" }
        ]
    },
    // 38. Naija Football
    {
        question: "Favorite Nigerian football team/Super Eagles moment?",
        options: [
            { text: "Super Eagles (Men)", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Super+Eagles" },
            { text: "Super Falcons (Women)", image: "https://placehold.co/200x200/e06666/ffffff?text=Super+Falcons" },
            { text: "Local league team", image: "https://placehold.co/200x200/93c47d/000000?text=Local+League" },
            { text: "I don't watch Nigerian football", image: "https://placehold.co/200x200/000000/ffffff?text=No+Interest" }
        ]
    },
    // 39. Naija Travel
    {
        question: "Which Nigerian city would you live in?",
        options: [
            { text: "Lagos (The Hustle)", image: "https://placehold.co/200x200/ff9900/000000?text=Lagos" },
            { text: "Abuja (The Calm)", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Abuja" },
            { text: "Port Harcourt (Garden City)", image: "https://placehold.co/200x200/6aa84f/ffffff?text=PHC" },
            { text: "Ibadan (The History)", image: "https://placehold.co/200x200/e69138/000000?text=Ibadan" }
        ]
    },
    // 40. Dating Red Flag
    {
        question: "Biggest dating red flag in a Nigerian context?",
        options: [
            { text: "Doesn't respect elders/parents", image: "https://placehold.co/200x200/cc0000/ffffff?text=Disrespectful" },
            { text: "Talks too much about village people", image: "https://placehold.co/200x200/674ea7/ffffff?text=Village+People" },
            { text: "Is always broke (Ashawo money)", image: "https://placehold.co/200x200/ff9900/000000?text=Always+Broke" },
            { text: "Doesn't know how to cook", image: "https://placehold.co/200x200/ffd966/000000?text=Can't+Cook" }
        ]
    },
    // 41. Naija Dance Move
    {
        question: "Your go-to dance move at a party?",
        options: [
            { text: "Zanku/Shaku Shaku", image: "https://placehold.co/200x200/e06666/ffffff?text=Zanku" },
            { text: "Galala/Old School", image: "https://placehold.co/200x200/351c75/ffffff?text=Old+School" },
            { text: "Waving hands/Simple steps", image: "https://placehold.co/200x200/d5a6bd/000000?text=Waving" },
            { text: "Just vibing and nodding", image: "https://placehold.co/200x200/cccccc/000000?text=Nodding" }
        ]
    },
    // 42. School Punishment
    {
        question: "Worst punishment in a Nigerian school?",
        options: [
            { text: "Kneeling down and raising hands", image: "https://placehold.co/200x200/e69138/000000?text=Kneeling" },
            { text: "Beating with a cane (koboko)", image: "https://placehold.co/200x200/cc0000/ffffff?text=Cane" },
            { text: "Cutting grass/Cleaning gutters", image: "https://placehold.co/200x200/6aa84f/ffffff?text=Cutting+Grass" },
            { text: "Sent home/Suspended", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Suspended" }
        ]
    },
    // 43. Naija Hustle
    {
        question: "Best source of information/gossip?",
        options: [
            { text: "Twitter/X", image: "https://placehold.co/200x200/000000/ffffff?text=Twitter" },
            { text: "WhatsApp Status/Groups", image: "https://placehold.co/200x200/93c47d/000000?text=WhatsApp" },
            { text: "Friends/Gossips circle", image: "https://placehold.co/200x200/ff9900/000000?text=Gossip" },
            { text: "Blog sites (Linda Ikeji)", image: "https://placehold.co/200x200/d5a6bd/000000?text=Blogs" }
        ]
    },
    // 44. Local Transport
    {
        question: "Your favorite local transport?",
        options: [
            { text: "Keke Napep", image: "https://placehold.co/200x200/ffd966/000000?text=Keke" },
            { text: "Okada (Motorcycle)", image: "https://placehold.co/200x200/cc0000/ffffff?text=Okada" },
            { text: "BRT Bus", image: "https://placehold.co/200x200/3d85c6/ffffff?text=BRT" },
            { text: "Bolt/Uber Ride", image: "https://placehold.co/200x200/351c75/ffffff?text=Ride+App" }
        ]
    },
    // 45. Naija Party Food
    {
        question: "If there's only one item left on the party food table, you grab:",
        options: [
            { text: "Gizdodo (Gizzard & Plantain)", image: "https://placehold.co/200x200/e69138/000000?text=Gizdodo" },
            { text: "Fried Fish (Titus/Mackerel)", image: "https://placehold.co/200x200/6aa84f/ffffff?text=Fried+Fish" },
            { text: "Small chops (Spring Rolls)", image: "https://placehold.co/200x200/ff9900/000000?text=Small+Chops" },
            { text: "Assorted meat/Ponmo", image: "https://placehold.co/200x200/cc0000/ffffff?text=Assorted+Meat" }
        ]
    },
    // 46. School Discipline
    {
        question: "Who was the scariest person in your school?",
        options: [
            { text: "The Principal/Head Teacher", image: "https://placehold.co/200x200/000000/ffffff?text=Principal" },
            { text: "The Disciplinary Master/Mistress", image: "https://placehold.co/200x200/cc0000/ffffff?text=Discipline+Master" },
            { text: "The Senior Prefect", image: "https://placehold.co/200x200/674ea7/ffffff?text=Senior+Prefect" },
            { text: "The cook/canteen attendant", image: "https://placehold.co/200x200/ffd966/000000?text=Canteen+Cook" }
        ]
    },
    // 47. Naija Time
    {
        question: "If a Nigerian says 'I'm coming now', they will arrive in:",
        options: [
            { text: "Under 10 minutes", image: "https://placehold.co/200x200/3d85c6/ffffff?text=10+Minutes" },
            { text: "30 minutes to 1 hour", image: "https://placehold.co/200x200/ff9900/000000?text=30-60+Minutes" },
            { text: "A few hours/Maybe tomorrow", image: "https://placehold.co/200x200/e06666/ffffff?text=Hours+Later" },
            { text: "They are not coming at all", image: "https://placehold.co/200x200/cccccc/000000?text=Not+Coming" }
        ]
    },
    // 48. Naija Travel Place
    {
        question: "Best local tourism site?",
        options: [
            { text: "Lekki Conservation Centre", image: "https://placehold.co/200x200/6aa84f/ffffff?text=LCC" },
            { text: "Yankari Game Reserve", image: "https://placehold.co/200x200/93c47d/000000?text=Yankari" },
            { text: "The National Museum", image: "https://placehold.co/200x200/351c75/ffffff?text=National+Museum" },
            { text: "Obudu Cattle Ranch", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Obudu" }
        ]
    },
    // 49. Naija Attitude
    {
        question: "How do you respond to 'How far?'",
        options: [
            { text: "I'm fine/I dey o", image: "https://placehold.co/200x200/d5a6bd/000000?text=I+Dey+O" },
            { text: "Nothing much/Just chilling", image: "https://placehold.co/200x200/ffd966/000000?text=Chilling" },
            { text: "E no easy o", image: "https://placehold.co/200x200/e06666/ffffff?text=E+No+Easy" },
            { text: "I reply with 'How far' back", image: "https://placehold.co/200x200/ff9900/000000?text=Reply+How+Far" }
        ]
    },
    // 50. Social Situation
    {
        question: "You see a friend and their parent in the market, you:",
        options: [
            { text: "Shout their name and run over", image: "https://placehold.co/200x200/e06666/ffffff?text=Shout+and+Run" },
            { text: "Politely greet the parent first", image: "https://placehold.co/200x200/93c47d/000000?text=Greet+Parent" },
            { text: "Wave from a distance and keep moving", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Wave+Distance" },
            { text: "Pretend you didn't see them", image: "https://placehold.co/200x200/cccccc/000000?text=Pretend+Not+See" }
        ]
    }
  ];

  /* The Questions ends here and make sure they are 50 */
  
  
  let quizQuestions = []; // The pool of 50 questions, shuffled
  let userAnswers = [];   // Stores the final 10 answers (or more, if skipped and replaced)
  let currentQuestionIndex = 0; // Index into the quizQuestions pool
  let answeredCount = 0; // Tracks how many non-skipped questions have been answered. This is the new stopping condition.

  // Shuffle array and use the whole pool for dynamic replacement
  function getRandomQuestions() {
    return [...allQuestions].sort(() => Math.random() - 0.5);
  }

  // Start quiz
  startBtn.addEventListener('click', () => {
    const userName = document.getElementById('user-name').value.trim();
    if (!userName) {
      alert("Please enter your name to start the quiz.");
      return;
    }

    nameContainer.style.display = 'none';
    quizContainer.style.display = 'flex'; 
    
    quizQuestions = getRandomQuestions(); // All 50 questions, shuffled
    currentQuestionIndex = 0;
    userAnswers = [];
    answeredCount = 0; // Reset counter for new game
    
    if (skipBtn) skipBtn.style.display = 'block'; 

    renderQuestion();
    nextBtn.style.display = 'block';
    submitBtn.style.display = 'none';
  });

  // Render a question with image options
  function renderQuestion() {
    // Check if we reached the target number of answered questions
    if (answeredCount >= TARGET_ANSWERED_QUESTIONS) {
        // If answeredCount reaches 10, stop the quiz and prompt submission.
        nextBtn.style.display = 'none';
        if (skipBtn) skipBtn.style.display = 'none';
        submitBtn.style.display = 'block';
        
        // Optionally display a final message or just stop the loop
        document.getElementById('question-container').innerHTML = `
            <h3 style="color: var(--color-primary);">Quiz Complete!</h3>
            <p>You have successfully answered ${TARGET_ANSWERED_QUESTIONS} questions (plus any you chose to skip and replace). Click **Submit Quiz** below.</p>
        `;
        return; 
    }

    // Ensure we don't go out of bounds of the shuffled pool
    if (currentQuestionIndex >= quizQuestions.length) {
        // Fallback: This should ideally not happen if only 10 are needed from 50
        console.error("Ran out of questions in the pool!");
        nextBtn.style.display = 'none';
        if (skipBtn) skipBtn.style.display = 'none';
        submitBtn.style.display = 'block';
        return;
    }
      
    const question = quizQuestions[currentQuestionIndex];
    const questionContainer = document.getElementById('question-container');

    // Update buttons based on the *target* answered count
    const isFinalQuestion = answeredCount === TARGET_ANSWERED_QUESTIONS - 1;
    
    submitBtn.style.display = isFinalQuestion ? 'block' : 'none';
    nextBtn.style.display = isFinalQuestion ? 'none' : 'block';

    const isCreator = !window.friendQuizID;
    if (skipBtn) {
        skipBtn.style.display = isCreator && !isFinalQuestion ? 'block' : 'none';
    }

    // Add keyboard hint (A, B, C, D) to options
    const keyboardHints = ['A', 'B', 'C', 'D'];
    
    // Display the current question number based on the *answered* count + 1
    const displayQuestionNumber = answeredCount + 1;
    
    questionContainer.innerHTML = `
      <h3 style="color: var(--color-primary);">${displayQuestionNumber}/${TARGET_ANSWERED_QUESTIONS}. ${question.question}</h3>
      <div class="quiz-options">
        ${question.options.map((option, index) => `
          <div class="quiz-option" data-value="${option.text}">
            <img src="${option.image}" alt="${option.text}" onerror="this.onerror=null;this.src='https://placehold.co/200x200/333333/ffffff?text=Option';">
            <div class="option-label">
                <span class="keyboard-hint">${keyboardHints[index]}</span>
                ${option.text}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    document.querySelectorAll('.quiz-option').forEach(optionEl => {
      optionEl.addEventListener('click', () => {
        document.querySelectorAll('.quiz-option').forEach(el => {
          el.classList.remove('selected');
        });

        optionEl.classList.add('selected');
      });
    });
  }

  // Get selected answer
  function getSelectedAnswer() {
    const selected = document.querySelector('.quiz-option.selected');
    return selected ? selected.dataset.value : null;
  }

  // Helper function to advance the quiz state
  function advanceQuiz(answerValue) {
      if (currentQuestionIndex < quizQuestions.length) {
        // Record the answer for the current question
        userAnswers.push({
          question: quizQuestions[currentQuestionIndex].question,
          answer: answerValue
        });
      }
      
      // Only increment the answeredCount if the answer is NOT skipped
      if (answerValue !== '__SKIPPED__') {
          answeredCount++;
      }
      
      // Always move to the next question in the overall pool, even if skipped
      currentQuestionIndex++; 

      // Check if we need to render the next question or stop
      if (answeredCount < TARGET_ANSWERED_QUESTIONS) {
          renderQuestion();
      } else {
          // Target reached, go to final submit state
          renderQuestion(); // This will trigger the final message and submit button
      }
  }

  // Next button logic
  nextBtn.addEventListener('click', () => {
    if (window.friendQuizID) return; // This handler is for the creator only

    const selectedAnswer = getSelectedAnswer();
    if (!selectedAnswer) {
      alert("Please select an answer before proceeding.");
      return;
    }
    advanceQuiz(selectedAnswer);
  });
  
  // Skip button logic
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
        // Only the creator can skip, and they don't need to select an option first.
        if (!window.friendQuizID) {
            // Check if skipping would exceed the available pool
            if (currentQuestionIndex + 1 >= quizQuestions.length) {
                alert("You cannot skip this question as you have run out of unique questions in the pool!");
                return;
            }
            advanceQuiz('__SKIPPED__'); 
        } else {
            alert("Skipping is only allowed when creating your quiz.");
        }
    });
  }


  // Submit quiz
  submitBtn.addEventListener('click', () => {
    const selectedAnswer = getSelectedAnswer();
    
    // Process the last question's answer if the target was just reached
    if (selectedAnswer && answeredCount < TARGET_ANSWERED_QUESTIONS) {
        advanceQuiz(selectedAnswer);
    }
    
    // Final check for creator submission
    if (!window.friendQuizID && answeredCount !== TARGET_ANSWERED_QUESTIONS) {
         alert(`Please answer ${TARGET_ANSWERED_QUESTIONS} questions before submitting.`);
         // The logic above in advanceQuiz/renderQuestion should prevent this, 
         // but this is a final safety check.
         return;
    }
    
    // Friend's submission
    if (window.friendQuizID) {
      let score = 0;
      let possiblePoints = 0; 
      
      // Iterate through the creator's answers (window.correctAnswers)
      for (let i = 0; i < window.correctAnswers.length; i++) {
        const creatorAnswer = window.correctAnswers[i];
        
        if (creatorAnswer !== '__SKIPPED__') {
            possiblePoints++; // Only count non-skipped questions towards the total possible score
            
            // The friend's answers (userAnswers) only contain non-skipped questions.
            // We need to match the friend's answer to the creator's non-skipped question.
            const friendAnswer = userAnswers[possiblePoints - 1]?.answer; // possiblePoints acts as the index + 1 here.

            if (friendAnswer && friendAnswer === creatorAnswer) {
              score++;
            }
        }
      }

      const response = {
        friendName: window.friendName,
        score: score,
        possiblePoints: possiblePoints,
        timestamp: Date.now()
      };

      database.ref(`quizzes/${window.friendQuizID}/responses`).push(response)
        .then(() => {
          console.log("Response saved successfully!");
          quizContainer.style.display = 'none';
          displayResultBoard(window.friendQuizID);
        })
        .catch(error => {
          console.error("Error saving response: ", error);
          alert("Error submitting quiz. Please try again.");
        });

    } else { // Creator's submission
      const userName = document.getElementById('user-name').value.trim();
      const quizID = generateQuizID();
      
      // The final list of answers, including any skipped questions
      const finalAnswersToSave = userAnswers;

      database.ref('quizzes/' + quizID).set({
        name: userName,
        answers: finalAnswersToSave,
        // The maxScore is simply the number of non-skipped answers collected
        maxScore: finalAnswersToSave.filter(a => a.answer !== '__SKIPPED__').length
      }).then(() => {
        console.log("Quiz saved successfully!");
        saveQuiz(quizID);

        quizLinkInput.value = `${window.location.origin}${window.location.pathname}?id=${quizID}`;
        shareContainer.style.display = 'flex';
        quizContainer.style.display = 'none';
        
        displayResultBoard(quizID);
      }).catch((error) => {
        console.error("Error saving quiz: ", error);
        alert("Error creating quiz. Please check your connection.");
      });
    }
  });

  /**
   * Deletes a friend's response from Firebase and refreshes the result board.
   */
  window.handleDeleteResponse = function(quizID, responseKey) {
      if (!confirm("Are you sure you want to delete this result?")) {
          return;
      }

      database.ref(`quizzes/${quizID}/responses/${responseKey}`).remove()
          .then(() => {
              console.log(`Response ${responseKey} deleted successfully.`);
              // Refresh the result board after deletion
              displayResultBoard(quizID);
          })
          .catch((error) => {
              console.error("Error deleting response: ", error);
              alert("Error deleting response. Please try again.");
          });
  };

  /**
   * Updates the result board with formatted, ranked results.
   */
  function displayResultBoard(quizID) {
    const resultBoardContainer = document.getElementById('result-board-container');
    const resultList = document.getElementById('result-list');
    
    let defaultTotalQuestions = TARGET_ANSWERED_QUESTIONS; 
    const isCreator = !window.friendQuizID;

    const headerRow = resultList.querySelector('.result-header');
    resultList.innerHTML = headerRow ? headerRow.outerHTML : '';


    database.ref(`quizzes/${quizID}`).once('value').then(quizSnapshot => {
      const quizData = quizSnapshot.val();
      
      let maxPossibleScore = quizData ? quizData.maxScore : defaultTotalQuestions;

      database.ref(`quizzes/${quizID}/responses`).once('value').then(responsesSnapshot => {
          const responses = responsesSnapshot.val();
          
          if (responses) {
            const responseEntries = Object.entries(responses);
            
            const sortedEntries = responseEntries.sort(([, a], [, b]) => {
              if (b.score !== a.score) {
                return b.score - a.score;
              }
              return a.timestamp - b.timestamp; 
            });

            const resultsHTML = sortedEntries.map(([key, r], index) => {
              const rank = index + 1;
              
              // Use the stored possiblePoints (or the calculated maxPossibleScore)
              // maxPossibleScore for the creator quiz is now stored in the quiz root as 'maxScore'
              const denominator = r.possiblePoints !== undefined ? r.possiblePoints : maxPossibleScore; 
              
              const deleteButton = isCreator ? 
                `<button class="delete-btn" data-key="${key}" title="Delete Result" onclick="handleDeleteResponse('${quizID}', '${key}')">🗑️</button>` : '';

              return `
                <li data-key="${key}">
                    <div class="result-info">
                        <strong>${rank}. ${r.friendName}</strong>
                        <span>${r.score} / ${denominator}</span>
                    </div>
                    ${deleteButton}
                </li>
              `;
            }).join('');
            
            resultList.innerHTML += resultsHTML;
            resultBoardContainer.style.display = 'flex'; 

          } else {
             resultList.innerHTML += `
                <li>
                    <strong>No friends have taken this quiz yet!</strong>
                    <span style="color: var(--color-text-muted); text-align: right;">0 / ${maxPossibleScore}</span>
                </li>
              `;
              resultBoardContainer.style.display = 'flex';
          }
      });
    }).catch(error => {
      console.error("Error loading quiz data for result board: ", error);
    });
  }

  // Generate quiz ID (unchanged)
  function generateQuizID(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  // Local storage functions (unchanged)
  function getSavedQuizzes() {
    return JSON.parse(localStorage.getItem('savedQuizzes')) || {};
  }

  function saveQuiz(quizID) {
    const savedQuizzes = getSavedQuizzes();
    savedQuizzes[quizID] = true;
    localStorage.setItem('savedQuizzes', JSON.stringify(savedQuizzes));
  }

  // URL Parameter Handling (mostly unchanged)
  const urlParams = new URLSearchParams(window.location.search);
  const quizID = urlParams.get('id');

  if (quizID) {
    saveQuiz(quizID);
    const nameContainer = document.getElementById('name-container');
    const friendNameContainer = document.getElementById('friend-name-container');

    nameContainer.style.display = 'none';
    friendNameContainer.style.display = 'flex';

    window.friendQuizID = quizID;
    
    if (skipBtn) skipBtn.style.display = 'none';

    database.ref('quizzes/' + quizID).once('value').then(snapshot => {
      const quizData = snapshot.val();
      if (quizData) {
        const startFriendQuizBtn = document.getElementById('start-friend-quiz');
        const friendNameInput = document.getElementById('friend-name');
        
        document.getElementById('quiz-heading').textContent = `Guess ${quizData.name}'s Answers!`;

        // Store original answers (including skipped ones)
        window.correctAnswers = quizData.answers.map(q => q.answer); 

        // Filter out skipped questions for the friend to answer
        const nonSkippedQuestions = quizData.answers
            .filter(q => q.answer !== '__SKIPPED__'); 
          

        startFriendQuizBtn.addEventListener('click', () => {
          const friendName = friendNameInput.value.trim();
          if (!friendName) {
            alert("Please enter your name to start the quiz.");
            return;
          }

          document.getElementById('friend-name-container').style.display = 'none';
          document.getElementById('quiz-container').style.display = 'flex';

          currentQuestionIndex = 0; // The index for the friend's filtered quizQuestions
          userAnswers = []; // Answers the friend provides
          answeredCount = 0; // Not strictly needed here, but good practice

          // Re-map the non-skipped questions with options for the friend
          quizQuestions = nonSkippedQuestions.map(q => {
              const originalQuestion = allQuestions.find(aq => aq.question === q.question);
              // Ensure we get the correct options, even if the creator skipped the question (though that shouldn't matter here)
              const options = originalQuestion ? [...originalQuestion.options] : [];
              const randomizedOptions = options.sort(() => Math.random() - 0.5);

              return {
                  question: q.question,
                  options: randomizedOptions,
              };
          });
          
          window.friendName = friendName;
          
          if (quizQuestions.length === 0) {
              document.getElementById('quiz-container').style.display = 'none';
              // Fallback for an empty quiz (all skipped)
              displayResultBoard(quizID);
              return;
          }
          
          // Friend quiz uses the length of non-skipped questions as the target
          const friendTotalQuestions = quizQuestions.length;
          
          // Redefine friend's render function to use the filtered list and correct total
          function renderFriendQuestion() {
            if (currentQuestionIndex >= friendTotalQuestions) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'block';
                return; 
            }
              
            const question = quizQuestions[currentQuestionIndex];
            const questionContainer = document.getElementById('question-container');
            const keyboardHints = ['A', 'B', 'C', 'D'];
            
            questionContainer.innerHTML = `
              <h3 style="color: var(--color-primary);">${currentQuestionIndex + 1}/${friendTotalQuestions}. ${question.question}</h3>
              <div class="quiz-options">
                ${question.options.map((option, index) => `
                  <div class="quiz-option" data-value="${option.text}">
                    <img src="${option.image}" alt="${option.text}" onerror="this.onerror=null;this.src='https://placehold.co/200x200/333333/ffffff?text=Option';">
                    <div class="option-label">
                        <span class="keyboard-hint">${keyboardHints[index]}</span>
                        ${option.text}
                    </div>
                  </div>
                `).join('')}
              </div>
            `;

            document.querySelectorAll('.quiz-option').forEach(optionEl => {
              optionEl.addEventListener('click', () => {
                document.querySelectorAll('.quiz-option').forEach(el => {
                  el.classList.remove('selected');
                });
                optionEl.classList.add('selected');
              });
            });
            
            // Re-check buttons after rendering
            if (currentQuestionIndex < friendTotalQuestions - 1) {
                nextBtn.style.display = 'block';
                submitBtn.style.display = 'none';
            } else {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'block';
            }
          }
          
          // Override advanceQuiz for friend
          nextBtn.onclick = () => {
            const selectedAnswer = getSelectedAnswer();
            if (!selectedAnswer) {
              alert("Please select an answer before proceeding.");
              return;
            }
            
            userAnswers.push({
                question: quizQuestions[currentQuestionIndex].question,
                answer: selectedAnswer
            });
            currentQuestionIndex++;
            renderFriendQuestion();
          };


          renderFriendQuestion();
        });

      } else {
        alert("Quiz not found!");
      }
    }).catch(error => {
      console.error("Error loading quiz: ", error);
    });
  }

  // Shape generation logic (condensed - unchanged)
  const shapesContainer = document.getElementById('bg-shapes');
  if (shapesContainer) { 
    const colors = ['#00f2fe', '#ff2b74', '#ffea00'];
    const shapeTypes = ['circle', 'square', 'triangle'];
    const placedPositions = [];
    const minDistance = 10;
    
    function isFarEnough(x, y) {
        return placedPositions.every(pos => {
            const dx = pos.x - x;
            const dy = pos.y - y;
            return Math.sqrt(dx * dx + dy * dy) > minDistance;
        });
    }

    for (let i = 0; i < 30; i++) {
        let attempts = 0;
        let x, y;
        do {
            x = Math.random() * 100;
            y = Math.random() * 100;
            attempts++;
            if (attempts > 100) break;
        } while (!isFarEnough(x, y));

        placedPositions.push({ x, y });
        const shape = document.createElement('div');
        const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];

        shape.classList.add('shape', type);
        shape.style.top = `${y}%`;
        shape.style.left = `${x}%`;
        shape.style.opacity = `${Math.random() * 0.4 + 0.2}`;
        shape.style.backgroundColor = color;

        shapesContainer.appendChild(shape);
    }
  }
});

/**
 * Handles sharing the quiz link, with a clipboard fallback.
 */
function sharePage() {
  const quizLink = document.getElementById('quiz-link').value;

  if (navigator.share) {
    navigator.share({
      title: 'Buddyz Quiz Challenge',
      text: 'Think you know me? Take my personalized BFF Quiz!',
      url: quizLink
    })
    .then(() => console.log('Successfully shared!'))
    .catch((error) => {
        console.error('Error sharing:', error);
        copyToClipboard(quizLink);
    });
  } else {
    copyToClipboard(quizLink);
  }
}

/**
 * Copies text to the clipboard using a temporary textarea element.
 */
function copyToClipboard(text) {
    if (document.execCommand) {
        try {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = 0;
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('Link copied to clipboard! Share it with your friends.');
        } catch (err) {
            console.error('Failed to copy text using execCommand: ', err);
            alert('Failed to copy link. Please manually copy the link from the box.');
        }
    } else {
        alert('Sharing is not supported on this browser. Please manually copy the link from the box.');
    }
}
