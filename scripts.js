
document.addEventListener('DOMContentLoaded',()=>{
     
     const score = document.querySelector('#score');
     score.innerHTML = 0;
     const level = document.querySelector('#level');
     let grid = document.querySelector('.grid');
     let snake = new Snake(45,46);
     let width = 10;
     
     let squareFragment = crateBoard();
     grid.appendChild(squareFragment);
     let squares = document.querySelectorAll('.grid div');


     snake.printSnake(squares);
     createApple(squares);
     let eventLoop = setInterval(()=>{
          appleWasEaten(squares);
          
     },200);

     document.addEventListener('keyup',(e)=>{
          moveSnake(e);
     });

     //move the snake
     function moveSnake(e){

          switch(e.code) {
               case 'ArrowUp':
                    snake.moveSnakeUp(squares,width);
                    break;
               case 'ArrowDown':
                    snake.moveSnakeDown(squares,width);
                    break;
               case 'ArrowLeft':
                    snake.moveSnakeLeft(squares,width);
                    break;
               case 'ArrowRight':
                    snake.moveSnakeRight(squares,width);
                    break;
          }
     }
     
});


//create the apple
const createApple = (board)=>{
     let idCellChosen = Math.round(Math.random() * 99);
     board[idCellChosen].classList.add('apple');
}
//put in the apple on the board
//crate the snake
class Snake{
     constructor(head,tail){
          this.head = head;
          this.body = [];
          this.tail = tail;
          this.isUp = true;
          this.isDown = true;
          this.isRight = true;
          this.isLeft = true;
     }

     growBody(headId){
          this.body.push(headId);
     }

     printSnake(board){
          board[this.tail].classList.add('snake');
          board[this.head].classList.add('snake');
     }

     moveSnakeUp(board,width){
          if(this.isUp === true){
               let oldHead = this.head;
               let oldTail = this.tail;
               this.head -= width;
               this.tail = oldHead;
               this.printSnake(board);
               board[oldTail].classList.remove('snake');
               if(this.isUp){
                    this.isDown = false;
                    this.isRight = true;
                    this.isLeft = true;      
              }
          }
     }
     moveSnakeDown(board,width){
          if(this.isDown === true){ 
               let oldHead = this.head;
               let oldTail = this.tail;
               this.head += width;
               this.tail = oldHead;
               board[oldTail].classList.remove('snake');
               this.printSnake(board);
               if(this.isUp) {
                    this.isUp = false;
                    this.isRight = true;
                    this.isLeft = true;
               }
               
          }
     }
     moveSnakeLeft(board){
          if(this.isLeft === true){ 
               let oldHead = this.head;
               let oldTail = this.tail;
               this.head -= 1;
               this.tail = oldHead;
               board[oldTail].classList.remove('snake');
               this.printSnake(board);
               if(this.isLeft) {
                    this.isUp = true;
                    this.isDown = true;
                    this.isRight = false;
               }
          }
     }
     moveSnakeRight(board){
          if(this.isRight === true){ 
               let oldHead = this.head;
               let oldTail = this.tail;
               this.head += 1;
               this.tail = oldHead;
               board[oldTail].classList.remove('snake');
               this.printSnake(board);
               if(this.isRight){
                    this.isLeft = false;
                    this.isUp =true;
                    this.isDown = true;
               }
               
          }
     }

}
//create the board
const crateBoard = ()=>{
     let fragment = document.createDocumentFragment();
     for(let i = 0; i < 100; i++){
          let square = document.createElement('div');
          square.setAttribute('class','cell');
          square.setAttribute('id',i);
          fragment.appendChild(square);
     }
     return fragment
}
//catch events 'snake ate apple' on the board
const appleWasEaten = (board)=>{
     board.forEach((cell)=>{
          if(cell.classList.contains('snake') && cell.classList.contains('apple')){
               cleanBoard(board);
               createApple(board);
               newScore = parseInt(score.innerHTML) + 1;
               score.innerHTML = newScore;
          }
     })
}

function cleanBoard(board){
     board.forEach((cell)=>{
          if(cell.classList.contains('apple')) cell.classList.remove('apple');
     });
}

//catch collition of snake on walls
//create loop to evaluate all events

//function that grow it speed of snake for each apple eaten