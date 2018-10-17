//ESTE ES MI CODIG0
const cardsArray = [
  {
    name: 'card1',
    frontImg: './images/image1.jpg',
    backImg: './images/backimage.jpg'
  },
  {
    name: 'card2',
    frontImg: './images/image2.jpg',
    backImg: './images/backimage.jpg'
  },
  {
    name: 'card3',
    frontImg: './images/image3.jpg',
    backImg: './images/backimage.jpg'
  },
  {
    name: 'card4',
    frontImg: './images/image4.jpg',
    backImg: './images/backimage.jpg'
  },
  {
    name: 'card5',
    frontImg: './images/image5.jpg',
    backImg: './images/backimage.jpg'
  },
  {
    name: 'card6',
    frontImg: './images/image6.jpg',
    backImg: './images/backimage.jpg'
  },
  {
    name: 'card7',
    frontImg: './images/image7.jpg',
    backImg: './images/backimage.jpg'
  },
  {
    name: 'card8',
    frontImg: './images/image8.jpg',
    backImg: './images/backimage.jpg'
  },
  {
    name: 'card9',
    frontImg: './images/image11.jpg',
    backImg: './images/backimage.jpg'
  },
  {
    name: 'card10',
    frontImg: './images/image10.jpg',
    backImg: './images/backimage.jpg'
  }
];

const resetBtn = document.querySelector('.reset');
const startBtn = document.querySelector('.start');
const game = document.getElementById('game');
const grid = document.createElement('section');
const message = document.querySelector('.message p');

const pairsArray = cardsArray.concat(cardsArray);
const shuffleArray = pairsArray.sort(() => 0.5 - Math.random());
let cardsInPlay = [];
let firstCard;
let pairsFound = 0;

grid.setAttribute('class', 'grid');
game.appendChild(grid);



function showAllCards(){
  allCards.forEach(card => card.classList.add('flipped'));
}
function flipAllCardsBack(){
  allCards.forEach(card => card.classList.remove('flipped'));
}

function resetGame(){
  // const cards = document.querySelectorAll('.card');
  // console.log('this is cards', cards);
  // cards.forEach(card => {
  //   // console.log('this isgrid', grid);
  //   // console.log('this is card', card);
  //   grid.removeChild(card);
  //
  // });
  shuffleArray;

  flipAllCardsBack();
  showAllCards();
  setTimeout(function(){
    flipAllCardsBack();
  }, 1500);

  // allCardBacks.forEach(function(card) {
  //   card.addEventListener('click', flipCard);
  // });
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
  // console.log('Checking for match', cardsInPlay);
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
  // console.log('this is the event', event);
  const clickedBack = event.target;
  const clickedCard = clickedBack.parentElement;
  // console.log('this is the clicked card', clickedBack);

  clickedCard.classList.add('flipped');
  cardsInPlay.push(clickedBack.parentElement);
  // console.log('cardsInPlay is', cardsInPlay);
  const targetCard = cardsArray.find(card => card.name === event.target.dataset.name);
  // console.log(targetCard);

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
      // console.log('you found a match geniussssssss');
      cardsInPlay = [];
      if (pairsFound === 2){
        message.innerHTML = 'You won!💥💥💥';
        console.log('you win');
        setTimeout(function(){
          message.innerHTML = '';
        }, 3000);
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
  showAllCards();
  setTimeout(function(){
    flipAllCardsBack();
  }, 1500);
  allCardBacks.forEach(function(card) {
    card.addEventListener('click', flipCard);
  });
});


resetBtn.addEventListener('click', resetGame)
