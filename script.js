const noteContainer=document.querySelector('.note-container');
const startBtn=document.querySelector('.start-btn')
const gameContent=document.querySelector('.game-content');
const score=document.querySelector('.score span');
const moves=document.querySelector('.moves span');
const cardContainer=document.querySelector('.card-container');
const resultContainer=document.querySelector('.result');
const gameResult=document.querySelector('.game-result');
const gameScore=document.querySelector('.game-score');
const restartBtn=document.querySelector('.restart')

const images=['deer', 'elephants', 'lion', 'monkey', 'panda', 'rabbit', 'squirrel', 'tiger'];
let clicks=0;
let card1, card2, firstCard, secondCard, cards;

// function for shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i>=0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  };

  // adding event listener to start button
startBtn.addEventListener('click', ()=>{
  noteContainer.style.display='none';
  resultContainer.style.display='none';
  gameContent.style.display='flex';
  score.innerText=0;
  moves.innerText=15;
  loadGame();
});

// function for loding game
function loadGame(){
 let=imgArr=shuffle(images.concat(images));

//for loop to create imges inside image container.
 for(let i=0; i<16; i++){
  let cardDiv=document.createElement('div');
  let frontDiv=document.createElement('div');
  let backDiv=document.createElement('div');
  let imgFront=document.createElement('img');
  let imgBack=document.createElement('img');
  cardDiv.setAttribute('class', 'card');
  frontDiv.setAttribute('class', 'front');
  backDiv.setAttribute('class', 'back');
  frontDiv.appendChild(imgFront);
  backDiv.appendChild(imgBack);
  cardDiv.append(frontDiv, backDiv);
  cardContainer.appendChild(cardDiv);
  imgFront.src='./images/star-icon.svg';
  imgBack.src=`./images/${imgArr[i]}.jpg`;
  }
  const cards=document.querySelectorAll('.card');
  match(cards);
}

// function for matching clicked cards
function match(cards){
  cards.forEach((card)=>{
    card.classList.remove('matched', 'flip-card');
    card.addEventListener('click', ()=>{
      if(!(card.classList.contains('matched'))){
        clicks++;
        
        // adding flip effects to clicked cards
        if(clicks<=2){
          card.classList.add('flip-card')
        }
        if(clicks==1){
          firstCard=card;
          firstCard.style.pointerEvents='none';
          card1=card.querySelector('.back img');
        }
        else if(clicks==2){
          secondCard=card;
          secondCard.style.pointerEvents='none';
          card2=card.querySelector('.back img');
          
          // checking the match of cards
          if(card1.src==card2.src){
            correctMatch();
            firstCard.classList.replace('flip-card', 'matched');
            secondCard.classList.replace('flip-card', 'matched');
          }else{
            wrongMatch();
            setTimeout(()=>{
            firstCard.classList.remove('flip-card');
            secondCard.classList.remove('flip-card');
            firstCard.style.pointerEvents='auto';
            secondCard.style.pointerEvents='auto';
            }, 1000);
          }

          // time out function to set next move
          setTimeout(()=>{
            clicks=0;
            gameContent.style.backgroundColor='#237685';
            moves.innerText--;
            if(moves.innerText==0){
              endGame(moves.innerText, score.innerText);
            }
            firstCard='';
            secondCard='';
          }, 1500);
        };
      };
    });
  });
};
 
// function to set audio and bgcolor for correct match
function correctMatch(){
  setTimeout(()=>{
    let sound=new Audio('./sounds/correct.mp3');
    sound.play();
  }, 1000);
    
  setTimeout(()=>{
    gameContent.style.backgroundColor='#0a6b2a';
    score.innerText++;
    if(score.innerText==8){
      endGame(moves.innerText, score.innerText);
    }
  }, 1100);
};

// function to set audio and bgcolor for correct match
function wrongMatch(){
  setTimeout(()=>{
    let sound=new Audio('./sounds/wrong.mp3');
    sound.play();
  }, 1000);
  
  setTimeout(()=>{
   gameContent.style.backgroundColor='#991910';
  }, 1100);
};

// function to end game at the last move or max score
function endGame(m, s){
  if(m==0 || s==8){
    noteContainer.style.display='none';
    gameContent.style.display='none';
    resultContainer.style.display='flex';
    gameScore.textContent=`Your Score Is : ${s}/8`;
    
    if(s>=5){
      gameResult.textContent='Congrats! 🤗😊  You Won The Game' ;
      resultContainer.style.backgroundColor='#0a6b2a'
    }else{
      gameResult.textContent='Sorry!! 😯😌 You Lost The Game';
      resultContainer.style.backgroundColor='#991910'
    }
  };
};

// adding event listener to restart button
restartBtn.addEventListener('click', ()=>{
  noteContainer.style.display='none';
  gameContent.style.display='flex';
  resultContainer.style.display='none';
  cardContainer.innerHTML="";
  score.innerText=0;
  moves.innerText=15;
  loadGame();
})