const url1 = "https://api.quotable.io/quotes/random?minLength=90&maxLength=130";
const url2 = "https://type.fit/api/quotes";
const qouteSection= document.getElementById("qoutes");
const userInput =document.getElementById("qoutes-input");
let time=60;
let timer="";
let mistakes=0;
let qoute="";
let timeroff=false;

// using quotable api fetch qoute
async function randomQoutes1(){
    try {
        const response = await fetch(url1)
        .then(function(response) {return response.json()});
            
        qoute=response[0].content;

        //split the qoute into span of each characters 

        let arr =qoute.split("").map((value)=>{
            return "<span class='qoute-chars'>"+value+"</span>"
        })
            
        qouteSection.innerHTML+=arr.join("");

            //console.log(qoute);
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

            let arr =qoute.split("").map((value)=>{
                return "<span class='qoute-chars'>"+value+"</span>"
            })
            qouteSection.innerHTML+=arr.join("");
            
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

    if(userInputChars.length>=qouteChars.length){
        displayResult();
    }
    
    //start timer
    if(!timeroff){
        timeroff=true;
        timeReduce();
    }

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
    timeroff=true;

    userInput.disabled = true;

    let timeTaken = 1; 
    if(time!=0){
        timeTaken= (60-time)/60;
    }

    let typwords= userInput.value.length;

    if( qoute.length < userInput.length ){
        typwords=qoute.length;
    }

    //console.log(typwords);

    
    let acc=((typwords-mistakes)/(typwords==0?1:typwords)*100).toFixed(2);
    let wpm=((typwords-mistakes)/6/timeTaken).toFixed(2);

    if(typwords<mistakes||typwords==0){
        wpm=(0.00).toFixed(2);
        acc=(0.00).toFixed(2);
    }

    // wpm display
    document.getElementById("wpm").innerText = wpm+"wpm";

    //Accuracy display
    document.getElementById("accuracy").innerText = (acc)+"%";

    //Reload
    setTimeout(() => {
        document.location.reload();
      }, 30000);
}


//start test
const startTest = () =>{
    mistakes=0;
    timer="";
    userInput.disabled=false;
    document.getElementById("start-test").style.display="none";
    document.getElementById("stop-test").style.display="block"; 
    //timeReduce();
}

//updateTImer
function updateTimer(){
    if(time==0){
        //End test
        displayResult();
    }
    else{
        document.getElementById("timer").innerText = (--time)+"s";
    }
}

//Set timer
const timeReduce =() =>{
    time=60;
    timer=setInterval(updateTimer,1000);
}

const refreshIcon = document.querySelector(".refresh");

function refreshContent(){
    document.getElementById("refimage").classList.add("refimg");
    //Reload
    setTimeout(() => {
        document.location.reload();
      }, 1200);
};







window.onload = () => {
    userInput.value="";
    document.getElementById("start-test").style.display="block";
    document.getElementById("stop-test").style.display="none";
    userInput.disabled=true;
    randomQoutes1();
    //randomQuotes2();
}




