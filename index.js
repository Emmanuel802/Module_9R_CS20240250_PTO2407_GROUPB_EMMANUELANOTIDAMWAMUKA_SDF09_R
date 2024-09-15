// OBJECT SECTION
// The player object stores the player's name and chips
let player = {
    name: "Emmanuell",
    chips: 200
}

// VARIABLE SECTION
let cards = []                 // Array to hold the cards in the hand
let sum = 0                    // Sum of the card values
let hasBlackJack = false        // Flag for checking if the player has Blackjack
let isAlive = false             // Flag to check if the player is still in the game
let message = ""                // Message that tells the player what's happening

// DOM ELEMENTS SECTION
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

// Display player's name and chips on the screen
playerEl.textContent = player.name + ": $" + player.chips

// FUNCTION TO GET A RANDOM CARD
function getRandomCard() {
    // Generate a random number between 1 and 13
    let randomNumber = Math.floor( Math.random() * 13 ) + 1

    // If the card is greater than 10, count it as 10 (for King, Queen, Jack)
    if (randomNumber > 10) {
        return 10
    // If the card is an Ace (1), count it as 11
    } else if (randomNumber === 1) {
        return 11
    // Otherwise, return the card as is (2-10)
    } else {
        return randomNumber
    }
}

// FUNCTION TO START THE GAME
function startGame() {
    isAlive = true              // Player is now alive (in the game)
    let firstCard = getRandomCard()  // Draw the first card
    let secondCard = getRandomCard() // Draw the second card
    cards = [firstCard, secondCard]  // Store the two cards in the array
    sum = firstCard + secondCard     // Calculate the sum of the cards
    renderGame()                // Render the game (update the screen)
}

// FUNCTION TO RENDER THE GAME STATUS
function renderGame() {
    // Display all the cards
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }

    // Display the sum of the cards
    sumEl.textContent = "Sum: " + sum

    // Check if the player should draw a new card, has Blackjack, or lost
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true      // Player has won
    } else {
        message = "You're out of the game!"
        isAlive = false          // Player lost
    }
    
    // Display the message to the player
    messageEl.textContent = message
}

// FUNCTION TO DRAW A NEW CARD
function newCard() {
    // Only allow drawing a new card if the player is still in the game and doesn't have Blackjack
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()  // Draw a new card
        sum += card                 // Add the new card to the sum
        cards.push(card)            // Add the new card to the cards array
        renderGame()                // Re-render the game
    }
}
