document.addEventListener('DOMContentLoaded',()=>{

     let grid = document.querySelector('.grid');
     let score = document.querySelector('#score');
     let level = document.querySelector('#level');
     let snake = new Snake(45,46);
     let width = 10;
     
     let squareFragment = crateBoard();
     grid.appendChild(squareFragment);

     let squares = document.querySelectorAll('.grid div');

     snake.printSnake(squares);
     let eventLoop = setInterval(()=>{
          createApple(squares);
          //
          //snake.moveSnakeUp(squares,width);
     },1000);

     document.addEventListener('keyup',(e)=>{
          switch(e.code) {
               case 'ArrowUp':
                    console.log('up');
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
     });
     
});

//move the snake

//create the apple
const createApple = (board)=>{
     cleanBoard(board);
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
          this.isVertical = false;
          this.isHorizontal = true;
     }

     growBody(headId){
          this.body.push(headId);
     }

     printSnake(board){
          board[this.head].classList.add('snake');
          board[this.tail].classList.add('snake');
     }

     moveSnakeUp(board,width){
          if(this.isVertical === false){ 
               this.head -= width;
               this.printSnake(board);
               this.isVertical = true;
               this.isHorizontal = false;
          }
     }
     moveSnakeDown(board,width){
          if(this.isVertical === false){ 
               this.head += width;
               this.printSnake(board)
               this.isVertical = true;
               this.isHorizontal = false;
          }
     }
     moveSnakeLeft(board,width){
          if(this.isHorizontal === false){ 
               this.head -= 1;
               this.printSnake(board);
               this.isVertical = false;
               this.isHorizontal = true;
          }
     }
     moveSnakeRight(board,width){
          if(this.isHorizontal === false){ 
               this.head += 1;
               this.printSnake(board);
               this.isVertical = false;
               this.isHorizontal = true;
          }
     }

}
//create the board
const crateBoard = ()=>{
     let fragment = document.createDocumentFragment();
     for(let i = 0; i < 100; i++){
          let square = document.createElement('div');
          square.setAttribute('class','cell');
          fragment.appendChild(square);
     }
     return fragment
}
//catch evants 'snake ate apple' on the board
function cleanBoard(board){
     board.forEach((cell)=>{
          if(cell.classList.contains('apple')) cell.classList.remove('apple');
     });
}
//catch collition of snake on walls
//create loop to evaluate all events

//function that grow it speed of snake for each apple eaten