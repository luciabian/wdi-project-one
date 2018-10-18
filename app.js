const cardsArray = [
  {
    name: 'card1',
    frontImg: './images/1.jpg',
    backImg: './images/pititas.jpg'
  },
  {
    name: 'card2',
    frontImg: './images/2.jpg',
    backImg: './images/pititas.jpg'
  },
  {
    name: 'card3',
    frontImg: './images/3.jpg',
    backImg: './images/pititas.jpg'
  },
  {
    name: 'card4',
    frontImg: './images/4.jpg',
    backImg: './images/pititas.jpg'
  },
  {
    name: 'card5',
    frontImg: './images/5.jpg',
    backImg: './images/pititas.jpg'
  },
  {
    name: 'card6',
    frontImg: './images/6.jpg',
    backImg: './images/pititas.jpg'
  },
  {
    name: 'card7',
    frontImg: './images/7.jpg',
    backImg: './images/pititas.jpg'
  },
  {
    name: 'card8',
    frontImg: './images/8.jpg',
    backImg: './images/pititas.jpg'
  },
  {
    name: 'card9',
    frontImg: './images/9.jpg',
    backImg: './images/pititas.jpg'
  },
  {
    name: 'card10',
    frontImg: './images/10.jpg',
    backImg: './images/pititas.jpg'
  },
  {
    name: 'card11',
    frontImg: './images/11.jpg',
    backImg: './images/pititas.jpg'
  },
  {
    name: 'card12',
    frontImg: './images/12.jpg',
    backImg: './images/pititas.jpg'
  }
];

const resetBtn = document.querySelector('.reset');
const startBtn = document.querySelector('.start');
const game = document.getElementById('game');
const grid = document.createElement('section');
const message = document.querySelector('.message p');
const firstWindow = document.querySelector('.welcome-page');
const gamePage = document.querySelector('.actual-game');
const time = document.querySelector('.timer');

const pairsArray = cardsArray.concat(cardsArray);
const shuffleArray = pairsArray.sort(() => 0.5 - Math.random());
let cardsInPlay = [];
let firstCard;
let pairsFound = 0;
const audio = new Audio('sounds/pew.wav');

grid.setAttribute('class', 'grid');
game.appendChild(grid);


function showAllCards(){
  allCards.forEach(card => card.classList.add('flipped'));
}
function flipAllCardsBack(){
  allCards.forEach(card => card.classList.remove('flipped'));
}

function resetGame(){
  flipAllCardsBack();
  showAllCards();
  setTimeout(function(){
    flipAllCardsBack();
  }, 1500);
  pairsFound = 0;
}

function createCard(item){
  const card = document.createElement('div');
  card.classList.add('card');
  card.classList.add(item.name);
  card.dataset.name = item.name;
  const cardFront = document.createElement('div');
  cardFront.classList = 'front';
  cardFront.style.backgroundImage = `url('${item.frontImg}')`;
  card.appendChild(cardFront);
  const cardBack = document.createElement('div');
  cardBack.classList = 'back';
  cardBack.style.backgroundImage = `url('${item.backImg}')`;
  card.appendChild(cardBack);
  grid.appendChild(card);
}

shuffleArray.forEach(item => {
  createCard(item);
});

const allCards = document.querySelectorAll('.card');
const allCardBacks = document.querySelectorAll('.back');
const flippedCards = document.querySelectorAll('.flipped');

function checkForMatch() {
  const firstCard = cardsInPlay[0].getAttribute('data-name');
  const secondCard = cardsInPlay[1].getAttribute('data-name');
  if (firstCard === secondCard){
    pairsFound++;
    return true;
  } else {
    return false;
  }
}

function flipCard(event){
  const clickedBack = event.target;
  const clickedCard = clickedBack.parentElement;

  clickedCard.classList.add('flipped');
  cardsInPlay.push(clickedBack.parentElement);
  const targetCard = cardsArray.find(card => card.name === event.target.dataset.name);

  if(cardsInPlay.length === 1) {
    firstCard = event.target;
  }

  function removeClass(card){
    card.classList.remove('flipped');
  }

  function flipBack() {
    removeClass(cardsInPlay[0]);
    removeClass(cardsInPlay[1]);
  }

  if (cardsInPlay.length === 2){
    const match = checkForMatch();
    if(match){
      cardsInPlay = [];
      if (pairsFound === 12){
        message.innerHTML = 'You won!';
        message.style.zIndex = 4;
        // console.log('you win');
        setTimeout(function(){
          message.innerHTML = '';
          message.style.zIndex = 0;
        }, 5000);
      }
    } else {
      const targetCard = cardsArray.find(card => card.name === event.target.dataset.name);
      setTimeout(function() {
        flipBack();
        cardsInPlay = [];
      }, 550);
    }
  }
}

//START THE GAME


startBtn.addEventListener('click', function(){
  audio.play();
  firstWindow.style.zIndex = -1;
  gamePage.style.zIndex = 0;
  showAllCards();
  setTimeout(function(){
    flipAllCardsBack();
  }, 1500);
  allCardBacks.forEach(function(card) {
    card.addEventListener('click', flipCard);
  });
});


resetBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', function(){
  audio.play();
});
