////////////////////DECLARITIONS///////////////////////////////////
const pickmark = document.querySelectorAll(".pick-mark");
const squares = document.querySelectorAll(".square");
const vsPlayerbtn = document.querySelector(".vs-player-btn");
const playerWin = document.querySelector(".player-win");
const xo = document.querySelector(".player-turn");
let value;
let squarePosition = [0,0,0,0,0,0,0,0,0];
let imgs = {
    silverX:'<img src="assets/icon-x-silver.svg ">',
    silverO:'<img src="assets/icon-o-silver.svg">',
    darkX:'<img src="assets/icon-x-dark.svg">',
    darkO:'<img src="assets/icon-o-dark.svg">',
    blueX:'<img src="assets/icon-x.svg">',
    yellowO:'<img src="assets/icon-o.svg">',
    outlineX:'<img src="assets/icon-x-outline.svg">',
    outlineO:'<img src="assets/icon-o-outline.svg">'
}
let turn = "o";
let winningCombination = [
                            [0,1,2],[0,3,6],[0,4,8],
                            [3,4,5],[6,7,8],[1,4,7],
                            [2,5,8],[2,4,6]
                         ];
///////////////////// ADD EVENT LISTENER ////////////////////////////

pickmark.forEach(btn => {
    btn.addEventListener("click",()=>{
        pickFirstMark(btn);
    });
});

vsPlayerbtn.addEventListener("click",()=>{
    const game = document.querySelector(".game");
    const newGame = document.querySelector(".new-game");
    game.style.display = "block";
    newGame.style.display = "none";
});

squares.forEach((square, index)=>{
    squareOnHover(square, index);
});

squares.forEach((sequare, index)=>{
    sequare.addEventListener("click",function handler(){
        playerTurn(sequare);
        squarePosition[index] = value;
        turn === "o"? squareWinStyle(1, "x-win-class", imgs.darkX, "You Won!", imgs.blueX, "#31C3BD") 
        : squareWinStyle(-1, "o-win-class", imgs.darkO, "OH NO, YOU LOST...!", imgs.yellowO, "#F2B137");
    },{once:true})
});


///////////////////////// FUNCTIONS DECLERATIONS /////////////////////////////////////////

function pickFirstMark(btn){
    const rememberText = document.querySelector(".remember-text");
    if(btn.classList.contains("o-mark-btn")){
        pickmark[1].innerHTML = imgs.darkO;
        pickmark[1].classList.add("is-first");
        pickmark[0].classList.remove("is-first");
        pickmark[0].innerHTML = imgs.silverX;
        rememberText.textContent = "Remember: O goes first";
        xo.firstElementChild.setAttribute("src","assets/icon-o-silver.svg");
        turn = "o";
    }else{
        pickmark[0].innerHTML = imgs.darkX;
        pickmark[0].classList.add("is-first");
        pickmark[1].classList.remove("is-first");
        pickmark[1].innerHTML = imgs.silverO;
        rememberText.textContent = "Remember: X goes first";
        xo.firstElementChild.setAttribute("src","assets/icon-x-silver.svg");
        turn = "x";
    }
}

function squareOnHover(square, index){
    square.addEventListener("mouseover",()=>{
        if(squarePosition[index] === 0){
            turn === "x"? squares[index].innerHTML = imgs.outlineX : squares[index].innerHTML = imgs.outlineO;
        }
    })
    square.addEventListener("mouseout",()=>{
        if(squarePosition[index] === 0 && squares[index].childNodes.length !== 0 ){
            squares[index].innerHTML = "";
        }
    })
}

function playerTurn(btn){
    if(turn === "o"){
        btn.innerHTML = imgs.yellowO;
        xo.firstElementChild.setAttribute("src","assets/icon-x-silver.svg");
        value = -1;
        turn = "x";
    }
    else{
        btn.innerHTML = imgs.blueX;
        xo.firstElementChild.setAttribute("src","assets/icon-o-silver.svg");
        value = 1;
        turn = "o";
    }
}


function checkWin(num){
    return winningCombination.find((combination)=>{
        return combination.every((position)=>{
            return squarePosition[position] === num;
         });
         
    });
}

function squareWinStyle(num, winClass, bgImg, text, winImg, textColor){
    if(checkWin(num) !== undefined){
        for(let i = 0 ;i<3; i++){
            squares[checkWin(num)[i]].classList.add(winClass);
            squares[checkWin(num)[i]].innerHTML = bgImg;
        }
        endGame(text, winImg, textColor);
    }else{
        let tied = true;
        for(let i = 0; i<9; i++){
            if(squarePosition[i] === 0){
                tied = false;
            }
        }
        if(tied)
          playerWin.style.display = "block";
          playerWin.children[0].style.display = "none";
          playerWin.children[1].style.display = "none";
          playerWin.children[2].style.display = "block";
    }
}

function endGame(text, winImg, textColor){
    const takesRound = document.getElementById("takes-round");
    playerWin.style.display = "block";
    playerWin.firstElementChild.innerHTML = text;
    takesRound.insertAdjacentHTML("beforebegin", winImg);
    takesRound.style.color = textColor;
}
console.log(playerWin.children[2]);