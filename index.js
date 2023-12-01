const url1 = "https://api.quotable.io/quotes/random?minLength=100&maxLength=140";
const url2 = "https://type.fit/api/quotes";
const qouteSection= document.getElementById("qoutes");
const userInput =document.getElementById("qoutes-input");
let time=60;
let timer="";
let mistakes=0;
let qoute="";

// using quotable api fetch qoute
async function randomQoutes1(){
    try {
        const response = await fetch(url1)
        .then(function(response) {return response.json()});
            qoute=response[0].content;
            let arr =qoute.split("").map((value)=>{
                return "<span class='qoute-chars'>"+value+"</span>"
            })
            qouteSection.innerHTML+=arr.join("");
    }
    catch(error){
        console.log(error);
    }
}

// using typt fit api fetch qoute
async function randomQoutes2(){
    try {
        const response = await fetch(url2)
        .then(function(response) {return response.json()});

            let x=Math.floor((Math.random() * response.length) - 1);
            qoute=response[x].text;
            //qouteSection.innerHTML=`<span class="qoute-chars">${qoute}</span>`;
    }
    catch(error){
        console.log(error);
    }
}

//compare userInput with qoute
userInput.addEventListener("input",(async) => {
    let qouteChars = document.querySelectorAll(".qoute-chars");
    userInput.classList.add("rainbow");
     
    //Array of qoute chars
    qouteChars=Array.from(qouteChars);

    //Array of input chars
    let userInputChars=userInput.value.split("");
    
    //start timer

    qouteChars.forEach((char,index)=>{
        //Check for Equality
        if(char.innerText == userInputChars[index]){
            if(char.classList.contains("fail")){
                char.classList.remove("fail");
            }
            char.classList.add("success");
        }
        else if(userInputChars[index] ==null){
            if(char.classList.contains("success")){
                char.classList.add("success");
            }
            else{
                char.classList.remove("fail");
            }
        }
        else{
            if(!char.classList.contains("fail")){
                mistakes++;
                char.classList.add("fail");
            }
            document.getElementById("mistakes").innerText=mistakes;
        }


        let check = qouteChars.every((element)=>{
            return element.classList.contains("success");
        });
        if(check){
            displayResult();
        }
    });
})

const displayResult = () =>{
    document.querySelector(".result").style.display = "block";
    document.getElementById("stop-test").style.display="none";
    
    clearInterval(timer);

    userInput.disabled = true;

    let timeTaken = 1; 
    if(time!=0){
        timeTaken= (60-time)/100;
    }
    document.getElementById("wpm").innerText = (userInput.value.length/6/timeTaken).toFixed(2)+"wpm";
}


//start test
const startTest = () =>{
    mistakes=0;
    timer="";
    userInput.disabled=false;
    document.getElementById("start-test").style.display="none";
    document.getElementById("stop-test").style.display="block"; 
    timeReduce();
}

//updateTImer
function updateTimer(){
    if(time==0){
        //End test
        displayResult();
    }
    else{
        document.getElementById("timer").innertext = (--time)+"s";
    }
}

//Set timer
const timeReduce =() =>{
    time=60;
    timer=setInterval(updateTimer,1000);
}

window.onload = () => {
    userInput.value="";
    document.getElementById("start-test").style.display="block";
    document.getElementById("stop-test").style.display="none";
    userInput.disabled=true;
    randomQoutes1();
    //randomQuotes2();
}


