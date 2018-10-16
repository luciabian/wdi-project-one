//ESTE ES MI CODIG0
const cardsArray = [
  {
    name: 'card1',
    frontImg: 'https://i.pinimg.com/564x/2f/6f/3e/2f6f3e1ea7fe1817e2f822121e251760.jpg',
    backImg: 'https://i.pinimg.com/564x/05/6e/f6/056ef64644a17fecaf812c5e0108c00f.jpg'
  },
  {
    name: 'card2',
    frontImg: 'https://i.pinimg.com/564x/f4/b8/89/f4b88916f2e258ccdb3a39a86f6b9066.jpg',
    backImg: 'https://i.pinimg.com/564x/05/6e/f6/056ef64644a17fecaf812c5e0108c00f.jpg'
  },
  {
    name: 'card3',
    frontImg: 'https://i.pinimg.com/564x/c7/36/3f/c7363ff08310ea2208e46625ef77517e.jpg',
    backImg: 'https://i.pinimg.com/564x/05/6e/f6/056ef64644a17fecaf812c5e0108c00f.jpg'
  },
  {
    name: 'card4',
    frontImg: 'https://i.pinimg.com/564x/87/a1/2a/87a12a89dcf5f421ec31d2021e002996.jpg',
    backImg: 'https://i.pinimg.com/564x/05/6e/f6/056ef64644a17fecaf812c5e0108c00f.jpg'
  },
  {
    name: 'card5',
    frontImg: 'https://i.pinimg.com/564x/2b/21/8c/2b218c4338a30de63e2b8c10ff38565c.jpg',
    backImg: 'https://i.pinimg.com/564x/05/6e/f6/056ef64644a17fecaf812c5e0108c00f.jpg'
  },
  {
    name: 'card6',
    frontImg: 'https://i.pinimg.com/564x/60/a2/aa/60a2aa1b669bb93759e01ae0cc3cd0f2.jpg',
    backImg: 'https://i.pinimg.com/564x/05/6e/f6/056ef64644a17fecaf812c5e0108c00f.jpg'
  },
  {
    name: 'card7',
    frontImg: 'https://i.pinimg.com/564x/a6/45/15/a645158d2da5d7a706cdf9c82d7af580.jpg',
    backImg: 'https://i.pinimg.com/564x/05/6e/f6/056ef64644a17fecaf812c5e0108c00f.jpg'
  },
  {
    name: 'card8',
    frontImg: '',
    backImg: 'https://i.pinimg.com/564x/05/6e/f6/056ef64644a17fecaf812c5e0108c00f.jpg'
  },
  {
    name: 'card9',
    frontImg: '',
    backImg: 'https://i.pinimg.com/564x/05/6e/f6/056ef64644a17fecaf812c5e0108c00f.jpg'
  },
  {
    name: 'card10',
    frontImg: '',
    backImg: 'https://i.pinimg.com/564x/05/6e/f6/056ef64644a17fecaf812c5e0108c00f.jpg'
  }
];
// const cards = document.querySelectorAll('.cards');
// const startBtn = document.querySelector('.start');
let cardsInPlay = [];
const game = document.getElementById('game');
const grid = document.createElement('section');

let firstCard;

grid.setAttribute('class', 'grid');
game.appendChild(grid);

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
  // console.log('this is card',card);
}


cardsArray.forEach(item => {
  createCard(item);
  createCard(item);
});
const allCards = document.querySelectorAll('.card');
const allCardBacks = document.querySelectorAll('.back');
const flippedCards = document.querySelectorAll('.flipped');

function checkForMatch() {
  console.log('Checking for match', cardsInPlay);
  const firstCard = cardsInPlay[0].getAttribute('data-name');
  const secondCard = cardsInPlay[1].getAttribute('data-name');
  if (firstCard === secondCard){
    // for (let i = 0; i < 19; i++){
    //   updateInnerHtml(displayScore, `Score is: ${i}`);
    return true;
  } else {
    return false;
  }
}

function flipCard(event){
  // console.log('this is the event', event);
  const clickedBack = event.target;
  const clickedCard = clickedBack.parentElement;
  console.log('this is the clicked card', clickedBack);

  clickedCard.classList.add('flipped');
  cardsInPlay.push(clickedBack.parentElement);
  console.log('cardsInPlay is', cardsInPlay);
  const targetCard = cardsArray.find(card => card.name === event.target.dataset.name);
  console.log(targetCard);

  if(cardsInPlay.length === 1) {
    firstCard = event.target;
  }

  // event.target.style.backgroundImage = `url('${targetCard.frontImg}')`;

  function removeClass(card){
    card.classList.remove('flipped');
    // clickedCard.removeEventListener('click', flipCard);
  }
  function flipBack() {
    removeClass(cardsInPlay[0]);
    removeClass(cardsInPlay[1]);
  }
  if (cardsInPlay.length === 2){
    const match = checkForMatch();
    if(match){
      console.log('you have a match');
      cardsInPlay = [];
    } else {
      const targetCard = cardsArray.find(card => card.name === event.target.dataset.name);
      // console.log(targetCard);
      // console.log(firstCard);
      setTimeout(function() {
        flipBack();
        cardsInPlay = [];
        console.log('it flipped back');
      }, 1000);
      console.log('this is targetCard', targetCard);
    }
  }
}



//START THE GAME
allCardBacks.forEach(function(card) {
  card.addEventListener('click', flipCard);
});
// resetBtn.addEventListener('click', resetGame);
