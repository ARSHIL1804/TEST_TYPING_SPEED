const api_url = 'https://api.quotable.io/random';
const quote_area = document.getElementById('quote-area');

const startTypingButton = document.getElementById('startTyping');
const stopTypingButton = document.getElementById('stopTyping');

const display_result = document.getElementById('display-result');
const display_score = document.getElementById('display-score');
const display_error = document.getElementById('display-error');

const progress_bar = document.getElementById('progress-bar');

let cur_index = 0;
let seconds = 0;
let chars;
let typingMode = false;
let errors = 0;
let progress = 0;

document.onload = setup() ;

async function getRandomQuote() {
    return fetch(api_url)
    .then(promise => promise.json())
    .then(quote => quote.content)
}


async function setup() {
    typingMode = false;

    cur_index = 0;
    seconds = 0;
    chars = [];
    typingMode = false;
    errors = 0;
    progress = 0;

    startTypingButton.style.display = 'unset';
    stopTypingButton.style.display = 'none';

    quote_area.innerHTML='';
    
    let quote = await  getRandomQuote();
    quote.split('').forEach(char => {
        let char_element = document.createElement('span');
        char_element.innerHTML=char;
        char_element.classList.add('quote-char-span');
        quote_area.appendChild(char_element)
    });
}


function setupAreaForTyping(){
    let chars = document.getElementsByClassName('quote-char-span');
    for(ch of chars)
    {
        ch.classList.add('not-touched');
    }
}

function startTyping(){
    hideResult();
    startTypingButton.style.display = 'none';
    stopTypingButton.style.display = 'unset';

    cur_index = 0;
    typingMode = true;

    setupAreaForTyping();

    chars = document.getElementsByClassName('quote-char-span');
    chars[cur_index].classList.remove('not-touched');
    chars[cur_index].classList.add('active');

    startTimer();
}

function startTimer() {
    seconds = 0;
    ineterval = setInterval(function () {
        seconds++;
    }, 1000);
}


onkeyup = (event)=>{
    event.target.blur();
    if(!typingMode)return;
    let key = event.key;
    let keyCode = event.keyCode;
    if( !(key == " ") &&  !(keyCode>=48 && keyCode<=57) && !(keyCode>=65 && keyCode<=90) && !(keyCode>=96 && keyCode<=111) && !(keyCode>=186 && keyCode<=222) )return;
    if(chars)
    {

       if(event.key === chars[cur_index].innerHTML)
       {
            setProgress();
            chars[cur_index].classList.remove('active');
            cur_index++;
            if(cur_index < chars.length)
            {
            chars[cur_index].classList.remove('not-touched');
            chars[cur_index].classList.add('active');
            }
            else{
                displayResult();
            }
       }
       else
       {
         chars[cur_index].classList.add('wrong');
         errors++;
         console.log(errors);
       }

    }
}

function setProgress(){
    progress += (100/chars.length);
    progress_bar.style.width = progress+"%";

    console.log(progress);

}

function stopTyping(){
    setup();
}

function displayResult(){
    clearInterval(ineterval);
    let speed = Math.floor( (chars.length * 60) / seconds );
   
    display_result.style.display = 'flex';
    display_score.innerHTML = "Your speed is " + speed + " char per minute"
    display_error.innerHTML = "Total error : " + errors; 

    setup();
}

function hideResult(){
    display_result.style.display = 'none';
}