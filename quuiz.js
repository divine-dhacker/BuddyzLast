document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-quiz');
  const quizContainer = document.getElementById('quiz-container');
  const nameContainer = document.getElementById('name-container');
  const shareContainer = document.getElementById('share-container');
  const nextBtn = document.getElementById('next-btn');
  const submitBtn = document.getElementById('submit-btn');
  const shareBtn = document.getElementById('share-btn');
  const quizLinkInput = document.getElementById('quiz-link');

   /* The Questions start from here and make sure they are 50 */
  let allQuestions = [
    {
        question: "Coffee or tea?",
        options: [
            { text: "Coffee", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Coffee" },
            { text: "Tea", image: "https://placehold.co/200x200/6aa84f/ffffff?text=Tea" },
            { text: "Both", image: "https://placehold.co/200x200/ff9900/ffffff?text=Both" },
            { text: "Neither", image: "https://placehold.co/200x200/cccccc/000000?text=Neither" }
        ]
    },
    {
        question: "Morning person or night owl?",
        options: [
            { text: "Morning person", image: "https://placehold.co/200x200/ffd966/000000?text=Morning" },
            { text: "Night owl", image: "https://placehold.co/200x200/351c75/ffffff?text=Night+Owl" },
            { text: "In between", image: "https://placehold.co/200x200/9fc5e8/000000?text=In+Between" },
            { text: "Depends on the day", image: "https://placehold.co/200x200/d5d5d5/000000?text=Depends" }
        ]
    },
    {
        question: "Favorite way to spend a lazy Sunday?",
        options: [
            { text: "Reading", image: "https://placehold.co/200x200/6fa8dc/000000?text=Reading" },
            { text: "Watching movies", image: "https://placehold.co/200x200/cc0000/ffffff?text=Movies" },
            { text: "Going for a walk", image: "https://placehold.co/200x200/93c47d/000000?text=Walking" },
            { text: "Sleeping in", image: "https://placehold.co/200x200/674ea7/ffffff?text=Sleeping" }
        ]
    },
    {
        question: "Best advice you've ever received?",
        options: [
            { text: "Follow your heart", image: "https://placehold.co/200x200/e06666/ffffff?text=Follow+Heart" },
            { text: "Work hard", image: "https://placehold.co/200x200/ff9900/000000?text=Work+Hard" },
            { text: "Be kind", image: "https://placehold.co/200x200/93c47d/000000?text=Be+Kind" },
            { text: "Take risks", image: "https://placehold.co/200x200/cc0000/ffffff?text=Take+Risks" }
        ]
    },
    {
        question: "Dream travel destination?",
        options: [
            { text: "Paris", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Paris" },
            { text: "Tokyo", image: "https://placehold.co/200x200/cc0000/ffffff?text=Tokyo" },
            { text: "New York", image: "https://placehold.co/200x200/000000/ffffff?text=New+York" },
            { text: "Bali", image: "https://placehold.co/200x200/6aa84f/ffffff?text=Bali" }
        ]
    },
    {
        question: "What's your favorite dessert?",
        options: [
            { text: "Cake", image: "https://placehold.co/200x200/d5a6bd/000000?text=Cake" },
            { text: "Ice cream", image: "https://placehold.co/200x200/9fc5e8/000000?text=Ice+Cream" },
            { text: "Chocolate", image: "https://placehold.co/200x200/7f6000/ffffff?text=Chocolate" },
            { text: "Cookies", image: "https://placehold.co/200x200/e69138/000000?text=Cookies" }
        ]
    },
    {
        question: "What's your zodiac sign?",
        options: [
            { text: "Leo", image: "https://placehold.co/200x200/ff9900/000000?text=Leo" },
            { text: "Scorpio", image: "https://placehold.co/200x200/674ea7/ffffff?text=Scorpio" },
            { text: "Gemini", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Gemini" },
            { text: "Capricorn", image: "https://placehold.co/200x200/666666/ffffff?text=Capricorn" }
        ]
    },
    {
        question: "What's your favorite color?",
        options: [
            { text: "Blue", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Blue" },
            { text: "Red", image: "https://placehold.co/200x200/cc0000/ffffff?text=Red" },
            { text: "Green", image: "https://placehold.co/200x200/6aa84f/ffffff?text=Green" },
            { text: "Purple", image: "https://placehold.co/200x200/674ea7/ffffff?text=Purple" }
        ]
    },
    {
        question: "Go-to comfort food?",
        options: [
            { text: "Pizza", image: "https://placehold.co/200x200/e06666/ffffff?text=Pizza" },
            { text: "Burger", image: "https://placehold.co/200x200/e69138/000000?text=Burger" },
            { text: "Fries", image: "https://placehold.co/200x200/ffd966/000000?text=Fries" },
            { text: "Rice & Stew", image: "https://placehold.co/200x200/cc0000/ffffff?text=Rice+Stew" }
        ]
    },
    {
        question: "What's your biggest fear?",
        options: [
            { text: "Heights", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Heights" },
            { text: "Darkness", image: "https://placehold.co/200x200/351c75/ffffff?text=Darkness" },
            { text: "Snakes", image: "https://placehold.co/200x200/38761d/ffffff?text=Snakes" },
            { text: "Failure", image: "https://placehold.co/200x200/666666/ffffff?text=Failure" }
        ]
    },
    {
        question: "Ideal vacation type?",
        options: [
            { text: "Beach", image: "https://placehold.co/200x200/9fc5e8/000000?text=Beach" },
            { text: "Mountains", image: "https://placehold.co/200x200/6aa84f/ffffff?text=Mountains" },
            { text: "City", image: "https://placehold.co/200x200/666666/ffffff?text=City" },
            { text: "Countryside", image: "https://placehold.co/200x200/93c47d/000000?text=Countryside" }
        ]
    },
    {
        question: "How do you express love?",
        options: [
            { text: "Words", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Words" },
            { text: "Gifts", image: "https://placehold.co/200x200/ff9900/000000?text=Gifts" },
            { text: "Time", image: "https://placehold.co/200x200/6aa84f/ffffff?text=Time" },
            { text: "Touch", image: "https://placehold.co/200x200/e06666/ffffff?text=Touch" }
        ]
    },
    {
        question: "Favorite hobby?",
        options: [
            { text: "Dancing", image: "https://placehold.co/200x200/674ea7/ffffff?text=Dancing" },
            { text: "Drawing", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Drawing" },
            { text: "Gaming", image: "https://placehold.co/200x200/000000/ffffff?text=Gaming" },
            { text: "Singing", image: "https://placehold.co/200x200/cc0000/ffffff?text=Singing" }
        ]
    },
    {
        question: "How do you handle stress?",
        options: [
            { text: "Talk it out", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Talk" },
            { text: "Sleep", image: "https://placehold.co/200x200/674ea7/ffffff?text=Sleep" },
            { text: "Music", image: "https://placehold.co/200x200/ff9900/000000?text=Music" },
            { text: "Cry", image: "https://placehold.co/200x200/9fc5e8/000000?text=Cry" }
        ]
    },
    {
        question: "Favorite social media app?",
        options: [
            { text: "Instagram", image: "https://placehold.co/200x200/e1306c/ffffff?text=Instagram" },
            { text: "TikTok", image: "https://placehold.co/200x200/000000/ffffff?text=TikTok" },
            { text: "Snapchat", image: "https://placehold.co/200x200/fffc00/000000?text=Snapchat" },
            { text: "Twitter", image: "https://placehold.co/200x200/1da1f2/ffffff?text=Twitter" }
        ]
    },
    {
        question: "Dog person or cat person?",
        options: [
            { text: "Dog", image: "https://placehold.co/200x200/e69138/000000?text=Dog" },
            { text: "Cat", image: "https://placehold.co/200x200/666666/ffffff?text=Cat" },
            { text: "Both", image: "https://placehold.co/200x200/ff9900/000000?text=Both" },
            { text: "Neither", image: "https://placehold.co/200x200/cccccc/000000?text=Neither" }
        ]
    },
    {
        question: "Favorite genre of music?",
        options: [
            { text: "Pop", image: "https://placehold.co/200x200/ff9900/000000?text=Pop" },
            { text: "Afrobeat", image: "https://placehold.co/200x200/cc0000/ffffff?text=Afrobeat" },
            { text: "Rap", image: "https://placehold.co/200x200/000000/ffffff?text=Rap" },
            { text: "Gospel", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Gospel" }
        ]
    },
    {
        question: "What superpower would you want?",
        options: [
            { text: "Invisibility", image: "https://placehold.co/200x200/666666/ffffff?text=Invisibility" },
            { text: "Flying", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Flying" },
            { text: "Time travel", image: "https://placehold.co/200x200/674ea7/ffffff?text=Time+Travel" },
            { text: "Mind reading", image: "https://placehold.co/200x200/e06666/ffffff?text=Mind+Reading" }
        ]
    },
    {
        question: "Choose a party vibe:",
        options: [
            { text: "Loud & crazy", image: "https://placehold.co/200x200/cc0000/ffffff?text=Loud+Crazy" },
            { text: "Chill & fun", image: "https://placehold.co/200x200/6aa84f/ffffff?text=Chill+Fun" },
            { text: "Games & dance", image: "https://placehold.co/200x200/ff9900/000000?text=Games+Dance" },
            { text: "No parties", image: "https://placehold.co/200x200/cccccc/000000?text=No+Parties" }
        ]
    },
    {
        question: "Introvert or extrovert?",
        options: [
            { text: "Introvert", image: "https://placehold.co/200x200/674ea7/ffffff?text=Introvert" },
            { text: "Extrovert", image: "https://placehold.co/200x200/ff9900/000000?text=Extrovert" },
            { text: "Ambivert", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Ambivert" },
            { text: "Depends", image: "https://placehold.co/200x200/93c47d/000000?text=Depends" }
        ]
    },
    {
        question: "What's your favorite season?",
        options: [
            { text: "Spring", image: "https://placehold.co/200x200/93c47d/000000?text=Spring" },
            { text: "Summer", image: "https://placehold.co/200x200/ffd966/000000?text=Summer" },
            { text: "Autumn", image: "https://placehold.co/200x200/e69138/000000?text=Autumn" },
            { text: "Winter", image: "https://placehold.co/200x200/9fc5e8/000000?text=Winter" }
        ]
    },
    {
        question: "What's your ideal date?",
        options: [
            { text: "Movie night", image: "https://placehold.co/200x200/351c75/ffffff?text=Movie+Night" },
            { text: "Dinner out", image: "https://placehold.co/200x200/e06666/ffffff?text=Dinner+Out" },
            { text: "Beach walk", image: "https://placehold.co/200x200/9fc5e8/000000?text=Beach+Walk" },
            { text: "Game night", image: "https://placehold.co/200x200/ff9900/000000?text=Game+Night" }
        ]
    },
    {
        question: "What's your fashion style?",
        options: [
            { text: "Trendy", image: "https://placehold.co/200x200/ff9900/000000?text=Trendy" },
            { text: "Casual", image: "https://placehold.co/200x200/93c47d/000000?text=Casual" },
            { text: "Sporty", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Sporty" },
            { text: "Classy", image: "https://placehold.co/200x200/674ea7/ffffff?text=Classy" }
        ]
    },
    {
        question: "Favorite type of movie?",
        options: [
            { text: "Comedy", image: "https://placehold.co/200x200/ffd966/000000?text=Comedy" },
            { text: "Horror", image: "https://placehold.co/200x200/351c75/ffffff?text=Horror" },
            { text: "Romance", image: "https://placehold.co/200x200/e06666/ffffff?text=Romance" },
            { text: "Action", image: "https://placehold.co/200x200/cc0000/ffffff?text=Action" }
        ]
    },
    {
        question: "What's your dream job?",
        options: [
            { text: "Actor", image: "https://placehold.co/200x200/ff9900/000000?text=Actor" },
            { text: "Doctor", image: "https://placehold.co/200x200/ffffff/000000?text=Doctor" },
            { text: "Entrepreneur", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Entrepreneur" },
            { text: "Artist", image: "https://placehold.co/200x200/674ea7/ffffff?text=Artist" }
        ]
    },
    {
        question: "What motivates you the most?",
        options: [
            { text: "Success", image: "https://placehold.co/200x200/ffd966/000000?text=Success" },
            { text: "Family", image: "https://placehold.co/200x200/e06666/ffffff?text=Family" },
            { text: "Money", image: "https://placehold.co/200x200/6aa84f/ffffff?text=Money" },
            { text: "Happiness", image: "https://placehold.co/200x200/ff9900/000000?text=Happiness" }
        ]
    },
    {
        question: "Which phone do you prefer?",
        options: [
            { text: "iPhone", image: "https://placehold.co/200x200/000000/ffffff?text=iPhone" },
            { text: "Android", image: "https://placehold.co/200x200/93c47d/000000?text=Android" },
            { text: "Both", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Both" },
            { text: "Neither", image: "https://placehold.co/200x200/cccccc/000000?text=Neither" }
        ]
    },
    {
        question: "Pick a breakfast meal:",
        options: [
            { text: "Pancakes", image: "https://placehold.co/200x200/ffd966/000000?text=Pancakes" },
            { text: "Cereal", image: "https://placehold.co/200x200/9fc5e8/000000?text=Cereal" },
            { text: "Toast", image: "https://placehold.co/200x200/e69138/000000?text=Toast" },
            { text: "Eggs", image: "https://placehold.co/200x200/ffffff/000000?text=Eggs" }
        ]
    },
    {
        question: "Favorite holiday?",
        options: [
            { text: "Christmas", image: "https://placehold.co/200x200/cc0000/ffffff?text=Christmas" },
            { text: "New Year", image: "https://placehold.co/200x200/ffd966/000000?text=New+Year" },
            { text: "Easter", image: "https://placehold.co/200x200/93c47d/000000?text=Easter" },
            { text: "Valentine's", image: "https://placehold.co/200x200/e06666/ffffff?text=Valentine's" }
        ]
    },
    {
        question: "What do you value most in a friend?",
        options: [
            { text: "Loyalty", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Loyalty" },
            { text: "Honesty", image: "https://placehold.co/200x200/ffffff/000000?text=Honesty" },
            { text: "Support", image: "https://placehold.co/200x200/93c47d/000000?text=Support" },
            { text: "Humor", image: "https://placehold.co/200x200/ff9900/000000?text=Humor" }
        ]
    },
    {
        question: "Choose a mode of transport:",
        options: [
            { text: "Car", image: "https://placehold.co/200x200/cc0000/ffffff?text=Car" },
            { text: "Bike", image: "https://placehold.co/200x200/ff9900/000000?text=Bike" },
            { text: "Plane", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Plane" },
            { text: "Train", image: "https://placehold.co/200x200/000000/ffffff?text=Train" }
        ]
    },
    {
        question: "What's your favorite snack?",
        options: [
            { text: "Chips", image: "https://placehold.co/200x200/e69138/000000?text=Chips" },
            { text: "Popcorn", image: "https://placehold.co/200x200/ffd966/000000?text=Popcorn" },
            { text: "Fruit", image: "https://placehold.co/200x200/6aa84f/ffffff?text=Fruit" },
            { text: "Nuts", image: "https://placehold.co/200x200/7f6000/ffffff?text=Nuts" }
        ]
    },
    {
        question: "Your favorite time of day?",
        options: [
            { text: "Morning", image: "https://placehold.co/200x200/ffd966/000000?text=Morning" },
            { text: "Afternoon", image: "https://placehold.co/200x200/ff9900/000000?text=Afternoon" },
            { text: "Evening", image: "https://placehold.co/200x200/674ea7/ffffff?text=Evening" },
            { text: "Night", image: "https://placehold.co/200x200/351c75/ffffff?text=Night" }
        ]
    },
    {
        question: "What scares you the most?",
        options: [
            { text: "Losing loved ones", image: "https://placehold.co/200x200/666666/ffffff?text=Losing+Loved+Ones" },
            { text: "Being alone", image: "https://placehold.co/200x200/cccccc/000000?text=Being+Alone" },
            { text: "The future", image: "https://placehold.co/200x200/3d85c6/ffffff?text=The+Future" },
            { text: "The unknown", image: "https://placehold.co/200x200/351c75/ffffff?text=The+Unknown" }
        ]
    },
    {
        question: "If you could live anywhere, where would it be?",
        options: [
            { text: "Island", image: "https://placehold.co/200x200/9fc5e8/000000?text=Island" },
            { text: "City", image: "https://placehold.co/200x200/666666/ffffff?text=City" },
            { text: "Village", image: "https://placehold.co/200x200/93c47d/000000?text=Village" },
            { text: "Mountains", image: "https://placehold.co/200x200/6aa84f/ffffff?text=Mountains" }
        ]
    },
    {
        question: "Your favorite beverage?",
        options: [
            { text: "Soda", image: "https://placehold.co/200x200/cc0000/ffffff?text=Soda" },
            { text: "Juice", image: "https://placehold.co/200x200/ff9900/000000?text=Juice" },
            { text: "Water", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Water" },
            { text: "Milkshake", image: "https://placehold.co/200x200/d5a6bd/000000?text=Milkshake" }
        ]
    },
    {
        question: "Which would you rather have?",
        options: [
            { text: "Fame", image: "https://placehold.co/200x200/ffd966/000000?text=Fame" },
            { text: "Power", image: "https://placehold.co/200x200/cc0000/ffffff?text=Power" },
            { text: "Love", image: "https://placehold.co/200x200/e06666/ffffff?text=Love" },
            { text: "Wisdom", image: "https://placehold.co/200x200/674ea7/ffffff?text=Wisdom" }
        ]
    },
    {
        question: "Favorite board game?",
        options: [
            { text: "Chess", image: "https://placehold.co/200x200/000000/ffffff?text=Chess" },
            { text: "Ludo", image: "https://placehold.co/200x200/ff9900/000000?text=Ludo" },
            { text: "Monopoly", image: "https://placehold.co/200x200/cc0000/ffffff?text=Monopoly" },
            { text: "Scrabble", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Scrabble" }
        ]
    },
    {
        question: "Pick a talent you'd love to have:",
        options: [
            { text: "Sing", image: "https://placehold.co/200x200/e06666/ffffff?text=Sing" },
            { text: "Dance", image: "https://placehold.co/200x200/674ea7/ffffff?text=Dance" },
            { text: "Paint", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Paint" },
            { text: "Play instrument", image: "https://placehold.co/200x200/ff9900/000000?text=Play+Instrument" }
        ]
    },
    {
        question: "What type of books do you like?",
        options: [
            { text: "Romance", image: "https://placehold.co/200x200/d5a6bd/000000?text=Romance" },
            { text: "Mystery", image: "https://placehold.co/200x200/351c75/ffffff?text=Mystery" },
            { text: "Self-help", image: "https://placehold.co/200x200/ff9900/000000?text=Self-Help" },
            { text: "Fantasy", image: "https://placehold.co/200x200/674ea7/ffffff?text=Fantasy" }
        ]
    },
    {
        question: "What's your favorite type of weather?",
        options: [
            { text: "Sunny", image: "https://placehold.co/200x200/ffd966/000000?text=Sunny" },
            { text: "Rainy", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Rainy" },
            { text: "Cloudy", image: "https://placehold.co/200x200/cccccc/000000?text=Cloudy" },
            { text: "Snowy", image: "https://placehold.co/200x200/ffffff/000000?text=Snowy" }
        ]
    },
   {
        question: "How do you like to celebrate your birthday?",
        options: [
            { text: "Big party", image: "https://placehold.co/200x200/cc0000/ffffff?text=Big+Party" },
            { text: "Small gathering", image: "https://placehold.co/200x200/ff9900/000000?text=Small+Gathering" },
            { text: "Solo day", image: "https://placehold.co/200x200/cccccc/000000?text=Solo+Day" },
            { text: "Adventure trip", image: "https://placehold.co/200x200/6aa84f/ffffff?text=Adventure" }
        ]
    },
    {
        question: "What's your ideal weekend?",
        options: [
            { text: "Relax at home", image: "https://placehold.co/200x200/9fc5e8/000000?text=Relax+Home" },
            { text: "Go out with friends", image: "https://placehold.co/200x200/ff9900/000000?text=Go+Out" },
            { text: "Explore nature", image: "https://placehold.co/200x200/93c47d/000000?text=Explore+Nature" },
            { text: "Catch up on hobbies", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Hobbies" }
        ]
    },
    {
        question: "Pick a pet you'd love to have:",
        options: [
            { text: "Dog", image: "https://placehold.co/200x200/e69138/000000?text=Dog" },
            { text: "Cat", image: "https://placehold.co/200x200/666666/ffffff?text=Cat" },
            { text: "Bird", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Bird" },
            { text: "Fish", image: "https://placehold.co/200x200/9fc5e8/000000?text=Fish" }
        ]
    },
    {
        question: "Favorite school subject?",
        options: [
            { text: "Math", image: "https://placehold.co/200x200/cc0000/ffffff?text=Math" },
            { text: "Art", image: "https://placehold.co/200x200/ff9900/000000?text=Art" },
            { text: "History", image: "https://placehold.co/200x200/7f6000/ffffff?text=History" },
            { text: "Science", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Science" }
        ]
    },
    {
        question: "How do you start your day?",
        options: [
            { text: "Coffee first", image: "https://placehold.co/200x200/7f6000/ffffff?text=Coffee+First" },
            { text: "Workout", image: "https://placehold.co/200x200/cc0000/ffffff?text=Workout" },
            { text: "Scrolling phone", image: "https://placehold.co/200x200/000000/ffffff?text=Scrolling+Phone" },
            { text: "Meditation", image: "https://placehold.co/200x200/674ea7/ffffff?text=Meditation" }
        ]
    },
    {
        question: "Choose a hobby to try:",
        options: [
            { text: "Photography", image: "https://placehold.co/200x200/000000/ffffff?text=Photography" },
            { text: "Cooking", image: "https://placehold.co/200x200/e06666/ffffff?text=Cooking" },
            { text: "Writing", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Writing" },
            { text: "Yoga", image: "https://placehold.co/200x200/93c47d/000000?text=Yoga" }
        ]
    },
    {
        question: "What's your dream car?",
        options: [
            { text: "Tesla", image: "https://placehold.co/200x200/cc0000/ffffff?text=Tesla" },
            { text: "Ferrari", image: "https://placehold.co/200x200/cc0000/ffffff?text=Ferrari" },
            { text: "SUV", image: "https://placehold.co/200x200/000000/ffffff?text=SUV" },
            { text: "Motorbike", image: "https://placehold.co/200x200/666666/ffffff?text=Motorbike" }
        ]
    },
    {
        question: "Pick a type of shoe:",
        options: [
            { text: "Sneakers", image: "https://placehold.co/200x200/ff9900/000000?text=Sneakers" },
            { text: "Boots", image: "https://placehold.co/200x200/7f6000/ffffff?text=Boots" },
            { text: "Heels", image: "https://placehold.co/200x200/d5a6bd/000000?text=Heels" },
            { text: "Sandals", image: "https://placehold.co/200x200/ffd966/000000?text=Sandals" }
        ]
    },
    {
        question: "Which fictional world would you live in?",
        options: [
            { text: "Harry Potter", image: "https://placehold.co/200x200/674ea7/ffffff?text=Harry+Potter" },
            { text: "Marvel", image: "https://placehold.co/200x200/cc0000/ffffff?text=Marvel" },
            { text: "Star Wars", image: "https://placehold.co/200x200/000000/ffffff?text=Star+Wars" },
            { text: "Avatar", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Avatar" }
        ]
    },
    {
        question: "What do you value most in friendship?",
        options: [
            { text: "Loyalty", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Loyalty" },
            { text: "Humor", image: "https://placehold.co/200x200/ff9900/000000?text=Humor" },
            { text: "Support", image: "https://placehold.co/200x200/93c47d/000000?text=Support" },
            { text: "Fun", image: "https://placehold.co/200x200/ffd966/000000?text=Fun" }
        ]
    },
    {
        question: "Which game do you enjoy most?",
        options: [
            { text: "Board games", image: "https://placehold.co/200x200/e69138/000000?text=Board+Games" },
            { text: "Video games", image: "https://placehold.co/200x200/000000/ffffff?text=Video+Games" },
            { text: "Card games", image: "https://placehold.co/200x200/cc0000/ffffff?text=Card+Games" },
            { text: "Sports", image: "https://placehold.co/200x200/3d85c6/ffffff?text=Sports" }
    ]
  }
  ];

  /* The Questions ends here and make sure they are 50 */
  
  
  let quizQuestions = [];
  let currentQuestionIndex = 0;
  let userAnswers = [];

  // Shuffle array and get first 15 questions
  function getRandomQuestions() {
    return [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 15);
  }

  // Start quiz
  startBtn.addEventListener('click', () => {
    const userName = document.getElementById('user-name').value.trim();
    if (!userName) {
      alert("Please enter your name to start the quiz.");
      return;
    }

    nameContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    quizQuestions = getRandomQuestions();
    currentQuestionIndex = 0;
    userAnswers = [];

    renderQuestion();
    nextBtn.style.display = 'block';
    submitBtn.style.display = 'none';
  });

  // Render a question with image options
  function renderQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    const questionContainer = document.getElementById('question-container');

    questionContainer.innerHTML = `
      <h3>${currentQuestionIndex + 1}. ${question.question}</h3>
      <div class="quiz-options">
        ${question.options.map(option => `
          <div class="quiz-option" data-value="${option.text}">
            <img src="${option.image}" alt="${option.text}">
            <div class="option-label">${option.text}</div>
          </div>
        `).join('')}
      </div>
    `;

    document.querySelectorAll('.quiz-option').forEach(optionEl => {
      optionEl.addEventListener('click', () => {
        // Clear previous selections and feedback
        document.querySelectorAll('.quiz-option').forEach(el => {
          el.classList.remove('selected', 'correct', 'wrong');
        });

        optionEl.classList.add('selected');

        const selectedValue = optionEl.dataset.value;
        const correctValue = quizQuestions[currentQuestionIndex].correctAnswer;

        if (typeof correctValue !== 'undefined') {
          if (selectedValue === correctValue) {
            optionEl.classList.add('correct');
          } else {
            optionEl.classList.add('wrong');
          }
        }
      });
    });
  }

  // Get selected answer
  function getSelectedAnswer() {
    const selected = document.querySelector('.quiz-option.selected');
    return selected ? selected.dataset.value : null;
  }

  // Next button logic
  nextBtn.addEventListener('click', () => {
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

    if (currentQuestionIndex < quizQuestions.length) {
      renderQuestion();
    } else {
      nextBtn.style.display = 'none';
      submitBtn.style.display = 'block';
    }
  });

  // Submit quiz
  submitBtn.addEventListener('click', () => {
    // Friend's submission
    if (window.friendQuizID) {
      let score = 0;
      for (let i = 0; i < userAnswers.length; i++) {
        if (userAnswers[i].answer === window.correctAnswers[i]) {
          score++;
        }
      }

      const response = {
        friendName: window.friendName,
        score: score,
        timestamp: Date.now()
      };

      database.ref(`quizzes/${window.friendQuizID}/responses`).push(response)
        .then(() => {
          console.log("Response saved successfully!");
          // Hide quiz and show result board
          quizContainer.style.display = 'none';
          displayResultBoard(window.friendQuizID);
        })
        .catch(error => {
          console.error("Error saving response: ", error);
        });

    } else { // Creator's submission
      const userName = document.getElementById('user-name').value.trim();
      const quizID = generateQuizID();

      // Save quiz to Firebase
      database.ref('quizzes/' + quizID).set({
        name: userName,
        answers: userAnswers
      }).then(() => {
        console.log("Quiz saved successfully!");
        saveQuiz(quizID);

        // Display share link
        quizLinkInput.value = `${window.location.origin}${window.location.pathname}?id=${quizID}`;
        shareContainer.style.display = 'block';
        quizContainer.style.display = 'none';

        // Show friend results (if any)
        displayResultBoard(quizID);
      }).catch((error) => {
        console.error("Error saving quiz: ", error);
      });
    }
  });

  function displayResultBoard(quizID) {
    const resultBoardContainer = document.getElementById('result-board-container');
    const resultList = document.getElementById('result-list');

    database.ref(`quizzes/${quizID}/responses`).once('value').then(snapshot => {
      const responses = snapshot.val();
      if (responses) {
        const sortedResponses = Object.values(responses).sort((a, b) => {
          if (b.score === a.score) {
            return a.timestamp - b.timestamp; // Earliest first
          }
          return b.score - a.score; // Highest score first
        });

        resultList.innerHTML = sortedResponses.map((r, index) => {
          return `<li>#${index + 1}: <strong>${r.friendName}</strong> - ${r.score} / 15</li>`;
        }).join('');

        resultBoardContainer.style.display = 'block';
      }
    });
  }

  // Generate quiz ID
  function generateQuizID(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  function getSavedQuizzes() {
    return JSON.parse(localStorage.getItem('savedQuizzes')) || {};
  }

  function saveQuiz(quizID) {
    const savedQuizzes = getSavedQuizzes();
    savedQuizzes[quizID] = true;
    localStorage.setItem('savedQuizzes', JSON.stringify(savedQuizzes));
  }

  // Check if quiz ID is in URL
  const urlParams = new URLSearchParams(window.location.search);
  const quizID = urlParams.get('id');

  if (quizID) {
    saveQuiz(quizID);
    const nameContainer = document.getElementById('name-container');
    const friendNameContainer = document.getElementById('friend-name-container');

    nameContainer.style.display = 'none';
    friendNameContainer.style.display = 'flex';

    window.friendQuizID = quizID;

    database.ref('quizzes/' + quizID).once('value').then(snapshot => {
      const quizData = snapshot.val();
      if (quizData) {
        const startFriendQuizBtn = document.getElementById('start-friend-quiz');
        const friendNameInput = document.getElementById('friend-name');

        startFriendQuizBtn.addEventListener('click', () => {
          const friendName = friendNameInput.value.trim();
          if (!friendName) {
            alert("Please enter your name to start the quiz.");
            return;
          }

          document.getElementById('friend-name-container').style.display = 'none';
          document.getElementById('quiz-container').style.display = 'block';

          currentQuestionIndex = 0;
          userAnswers = [];

          quizQuestions = quizData.answers.map(q => {
            const originalQuestion = allQuestions.find(aq => aq.question === q.question);
            return {
              question: q.question,
              options: [...originalQuestion.options].sort(() => Math.random() - 0.5)
            };
          });

          window.correctAnswers = quizData.answers.map(q => q.answer);
          window.friendName = friendName;

          renderQuestion();
          nextBtn.style.display = 'block';
          submitBtn.style.display = 'none';
        });

        document.getElementById('user-name').value = quizData.name + "'s Quiz";
      } else {
        alert("Quiz not found!");
      }
    }).catch(error => {
      console.error("Error loading quiz: ", error);
    });
  }

  const shapesContainer = document.getElementById('bg-shapes');

  // Check if the container exists
  if (shapesContainer) {
    const colors = ['#00f2fe', '#ff2b74', '#ffea00'];
    const shapeTypes = ['circle', 'square', 'triangle'];

    const placedPositions = [];
    const minDistance = 10; // Minimum distance between shapes

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

function sharePage() {
  const quizLink = document.getElementById('quiz-link').value; // 👈 get input value

  if (navigator.share) {
    navigator.share({
      title: 'Buddyz',
      text: 'How well do you know Me! Lets find out',
      url: quizLink   // 👈 use input value instead
    })
    .then(() => console.log('Thanks for sharing!'))
    .catch((error) => console.error('Error sharing:', error));
  } else {
    alert('Sharing not supported on this browser.');
  }
}
