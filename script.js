function setTheme() {
    const root = document.documentElement;
    const newTheme = root.className ==='Dark' ? 'Light' : 'Dark';
    root.className = newTheme;

    document.querySelector('.theme-toggle').textContent = newTheme;
  }
document.querySelector('.theme-toggle').addEventListener('click', setTheme)

const hitButton = document.querySelector('#hit');
const standButton = document.querySelector('#stand');
const playerSelection = document.querySelectorAll('.playerSelection');
const btnContainer = document.querySelector('.playerAction');
const playerDisplay = document.querySelector('.playerCardDisplay');
const dealerDisplay = document.querySelector('.dealerCardDisplay');
const startBtn = document.querySelector('.start');
const display = document.querySelector('.display');
const container = document.querySelector('.container');

const cardContainerP = document.createElement('div');
cardContainerP.classList.add('cardContainer');
const cardContainerD = document.createElement('div');
cardContainerD.classList.add('cardContainer')


let dealerHand = new Array();
function dealCard(){
  lastCardDealt = callCard();

  if(lastCardDealt[0] === 1){
    playerHandTotal = playerHand.reduce((hand,a) => hand+a,0);
    if(playerHandTotal + 11 > 21)
    {
    
      positionOfAce = playerHand.length;
      lastCardDealt = 1;
      playerHand.push(lastCardDealt);
     
    }
    else{
      positionOfAce = playerHand.length;
      lastCardDealt = 11;
      playerHand.push(lastCardDealt);
    }
    
  }
  else{
    if(playerHandTotal + lastCardDealt > 21 && positionOfAce !== undefined && playerHand[positionOfAce] !== 1)
    {
      playerHand[positionOfAce] = 1;
      playerHand.push(lastCardDealt);
    }
   else{
     playerHand.push(lastCardDealt);
   }
  }
  displayCardsPlayer(lastCardDealt);//sends it to to display cards
  playerHandTotal = playerHand.reduce((hand,a) => hand+a,0)
  if( playerHandTotal > 21)
  {
    displayWinner('Dealer Wins', dealerHand.reduce((hand,a) => hand+a,0));
  }
  
}

function displayCardsPlayer(card)// displays player card values on screen
{
  let lastCardDealt = card;
  const pDisplay = document.createElement('h1');

  pDisplay.textContent = lastCardDealt;
  pDisplay.setAttribute('class', 'pCards');
  cardContainerP.appendChild(pDisplay);
}

function displayCardsDealer(card)
{
  let dealerLastCard = card;
  if(dealerHand.length === 1)
  {
    const dDisplay = document.createElement('h1');
    dDisplay.textContent = dealerLastCard;
    dDisplay.setAttribute('class', 'dCards');
    cardContainerD.appendChild(dDisplay);
  }
  else{
    const dDisplay = document.createElement('h1');
    dDisplay.textContent = ' ';
    dDisplay.setAttribute('class', 'dCards');
    cardContainerD.appendChild(dDisplay);
  }

}
function dealerHits(){
  let dealerCurrentCard;
  const sum = dealerHand.reduce((a, b) => a + b, 0);
    dealerCurrentCard = callCard();
  
  if(dealerCurrentCard[0] === 1)
  {
    
    if(sum + 11 > 21)
    {
       dealerCurrentCard = 1;
      dealerHand.push(dealerCurrentCard);
      displayCardsDealer(dealerCurrentCard);

    }
    else{
      dealerCurrentCard = 11;
      dealerHand.push(dealerCurrentCard);
      displayCardsDealer(dealerCurrentCard);
    }
  } 
  dealerHand.push(dealerCurrentCard);
  displayCardsDealer(dealerCurrentCard);
  return dealerHand.reduce((a, b) => a + b, 0);
  
}
 



const cards = {
  ace : [1,11],
  two : 2,
  three: 3,
  four: 4,
  five: 5, 
  six: 6, 
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  jack: 10,
  queen: 10,
  king: 10,
}

function callCard(){
  let random = Math.random();

  if(random < 0.075)
  {
    return cards.ace;
  }
  else if(random < 0.15)
  {
    return cards.two;
  }
  else if(random < 0.22)
  {
    return cards.three;
  }
  else if(random < 0.3)
  {
    return cards.four;
  }
  else if(random < 0.37)
  {
    return cards.five;
  }
  else if(random < 0.44)
  {
    return cards.six;
  }
  else if(random < 0.51)
  {
    return cards.seven;
  }
  else if(random < 0.58)
  {
    return cards.eight;
  }
  else if(random < 0.65)
  {
    return cards.nine;
  }
  else if(random < 0.72)
  {
    return cards.ten;
  }
  else if(random < 0.8)
  {
    return cards.jack;
  }
  else if(random < 0.87)
  {
    return cards.queen;
  }
  else if(random < 1)
  {
    return cards.king;
  }

}//randomly returns a card.() according to math.random



let playerHand = new Array();
let playerHandTotal = 0;
let lastCardDealt;
let positionOfAce = undefined;

hitButton.addEventListener('click',dealCard)
 //when player hits a callcard function is called then the card is pushed to an array of player hand
  // put this in a function tomorrow



startBtn.addEventListener('click', () => {
  playerDisplay.appendChild(cardContainerP);
  dealerDisplay.appendChild(cardContainerD);
  dealCard();
  dealCard();
  dealerHits();
  dealerHits();

  display.removeChild(startBtn);
})

function winner(){
  playerHandTotal = playerHand.reduce((hand,a) => hand+a,0);
  let dealerTotal = dealerHand.reduce((hand,a) => hand+a,0);
  while(dealerTotal < 17)
  {
    dealerTotal = dealerHits();
  }
  let whoWon;
  

  if(dealerTotal === 21){
    whoWon = 'Dealer Wins';
  }
  else if(dealerTotal > 21)
  {
    whoWon = 'Player Wins';
  }
  else if(dealerTotal > playerHandTotal)
  {
    whoWon = 'Dealer Wins';
  }
  else if(playerHandTotal > dealerTotal)
  {
    whoWon = 'Player Wins';
  }

  displayWinner(whoWon, dealerTotal);

}
const resetBtn = document.createElement('button');
const dealerT = document.createElement('p');
const playerT = document.createElement('p');
const winnerDisplayContainer = document.querySelector('.winner');

function displayWinner(whoWon, dealerTotal){ 
  let winner = whoWon;
  let sum = dealerTotal;
  dealerT.textContent = 'Dealer\'s Hand: ' + sum;
  playerT.textContent = 'Player\'s Hand: ' + playerHandTotal;
  winnerDisplayt.textContent = winner;
  winnerDisplayContainer.appendChild(winnerDisplayt);
  winnerDisplayContainer.appendChild(dealerT); 
  winnerDisplayContainer.appendChild(playerT);

  resetBtn.textContent = 'Reset';
  container.appendChild(resetBtn);
}
const winnerDisplayt = document.createElement('h1');
standButton.addEventListener('click', winner);


function reset(){
  playerHand = new Array();
  playerHandTotal = 0;
  positionOfAce = undefined;
  dealerHand = new Array();
  const pCard = document.querySelectorAll('.pCards');
  const dCard = document.querySelectorAll('.dCards');
  pCard.forEach(card => {
    cardContainerP.removeChild(card);
    
  });
  dCard.forEach(card => {
    cardContainerD.removeChild(card);
    
  });
  container.removeChild(resetBtn);
  winnerDisplayContainer.removeChild(winnerDisplayt);
  winnerDisplayContainer.removeChild(dealerT);
  winnerDisplayContainer.removeChild(playerT);
  display.appendChild(startBtn);
}
resetBtn.addEventListener('click', reset);
