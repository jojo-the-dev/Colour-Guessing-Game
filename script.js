// DOM Elements
const colorBox = document.getElementById("colorBox");
const colorOptions = document.querySelectorAll(".color-option");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");
const instructionButton = document.getElementById("instructionButton");
const instructionModal = document.getElementById("instructionModal");
const closeModal = document.querySelector(".close");

// Variables
let targetColor = ""; // The correct color to guess
let score = 0; // Score counter

// Function to generate a random hex color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to set up a new game
function setupGame() {
  // Generate six random colors
  const colors = [];
  for (let i = 0; i < 6; i++) {
    colors.push(getRandomColor());
  }

  // Pick a random color as the correct color
  targetColor = colors[Math.floor(Math.random() * colors.length)];

  // Update the color box to match the target color (initially hidden)
  colorBox.style.backgroundColor = "transparent";
  colorBox.dataset.color = targetColor; // Store the correct color

  // Assign random colors to buttons and add event listeners
  colorOptions.forEach((button, index) => {
    button.style.backgroundColor = colors[index];
    button.dataset.color = colors[index];
    button.onclick = () => checkGuess(colors[index]);
  });

  // Reset game status message
  gameStatus.textContent = "Choose a color!";
  gameStatus.style.color = "black";
}

// Function to check if the selected color is correct
function checkGuess(selectedColor) {
  if (selectedColor === targetColor) {
    // Correct guess
    gameStatus.textContent = "Correct! 🎉";
    gameStatus.style.color = "green";
    score++; // Increment score
    scoreDisplay.textContent = score;
    colorBox.style.backgroundColor = targetColor; // Reveal the correct color
  } else {
    // Incorrect guess
    gameStatus.textContent = "Wrong! Try again. ❌";
    gameStatus.style.color = "red";
  }
}

// Function to reset the game
function resetGame() {
  setupGame(); // Start a new game
}

// Function to toggle the instructions modal
function toggleModal() {
  instructionModal.style.display =
    instructionModal.style.display === "block" ? "none" : "block";
}

// Event Listeners
newGameButton.addEventListener("click", resetGame); // Start a new game on button click
instructionButton.addEventListener("click", toggleModal); // Show instructions modal
closeModal.addEventListener("click", toggleModal); // Close modal on clicking the close button

// Initialize the game for the first time
setupGame();
