//1.key press-> starts game => Level 1 starts
//h1 - > cahnge to Level 1
//2. Button flashs
//3.User Input Waiting
//4.Match Game Sequence of ButtonFlash and user input of Buttons
    //Same seq - > Level Up 
    //Not Same - > Game Over
//5.Display Score


//Arrays to track sequence of Buttons
let gameSeq = [];
let userSeq = [];

//choose random colours from this
let btns = ["red","orange","green","violet"];
//class names as array elements

//Game started or not
let started = false;

let level = 0;

let h2 = document.querySelector("h2");


//Game Start by entering an key
document.addEventListener("keypress",function(){
    if(started == false){    //start game only if not yet started
        console.log("Game Start");
        started = true;  //Once started set to true cant start again by keypress unless refreshed




        levelUp();
    }   
});

function levelUp(){
    userSeq = [];
    //1.Increase level
    level++;
    //2.Change h2 heading
    h2.innerText = `Level ${level}`;



    //Choose Buttons Randomly
    //Math.random() -> dec values btw 0 and 1
    //To make it int value btwn 0 to 3 -> Math.floor
    let randIndx = Math.floor(Math.random() * 3);
    console.log(randIndx);  //generate number

    let randColor = btns[randIndx];  //fetches from array
    console.log(randColor); //a class name is selected from the array

    //Push random color generated into gameSeq
    gameSeq.push(randColor);
    console.log(gameSeq);

    let randbtn = document.querySelector(`.${randColor}`);  //select the button with the class name
    console.log(randbtn);
    
    //Button Flash
    gameFlash(randbtn); //pass the button to function flash



}


function gameFlash(btn){
    btn.classList.add("flash");  //add the flash class to the button
    //Once added background changes to white
    //To bring back the og colour - >Flash animation 
    //Use Timeout function where you remove class falsh after 250ms
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userFlash");  //add the flash class to the button
    //Once added background changes to white
    //To bring back the og colour - >Flash animation 
    //Use Timeout function where you remove class falsh after 250ms
    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 250);
}


function checkAns(idx){
    // console.log(`curr level ${level}`)
    // let idx = level - 1;
    if(userSeq[idx] == gameSeq[idx]){
        // console.log("Same Value")
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press any key to start the game`;
        console.log("Game Over");
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },250)
        reset();
    }
}

function btnPress(){
    let btn = this;
//     console.log("Button was pressed");
    console.log(this);
    userFlash(btn);
    //We need to know what button user has pressed:
    //1. Assign unique ids to buttons
    //Get attribute of the pressed btn
    let userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress );
}

function reset(){
    started = false;
    gameSeq= [];
    userSeq = [];
    level = 0;
}