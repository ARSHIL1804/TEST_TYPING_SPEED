const api_url='https://api.quotable.io/random';
const text_area=document.getElementById('text-area')
const type_area=document.getElementById('type-area')
let score=0;
const scorre_id=document.getElementById('score');
const timer_id=document.getElementById('timer');
let display_score=document.getElementById('display-score');
const btn=document.getElementById('btn');
const starting=document.getElementById('starting');

type_area.addEventListener('input',()=>{
   const char_array=text_area.querySelectorAll('span');
   const char_array_input=type_area.value.split('');
   let correct=0;
   char_array.forEach((charspan,index)=>{
       const char=char_array_input[index];
       if(char==null)
       {
          charspan.classList.remove('incorrect');
          charspan.classList.remove('correct');

       }
      else if(char===charspan.innerText)
       {
            charspan.classList.add('correct');
           charspan.classList.remove('incorrect');
           correct++; 
       }
      else 
       {
           charspan.classList.add('incorrect');
           charspan.classList.remove('correct');
           correct--;
       }
   })
   if(correct==char_array.length)
   {
       score++;
       scorre_id.innerHTML="SCORE:"+score;
       quoteloop();
   }
})


async function getquote()
{
 return fetch(api_url)
 .then(promise => promise.json())
 .then(quote => quote.content)
}

async function quoteloop()
{
    const quote=await getquote();
    text_area.innerHTML='';
    quote.split('').forEach(char => {
        const characterspan=document.createElement('span');
        characterspan.innerText=char;
        text_area.appendChild(characterspan);
    });
    type_area.value=null;
}
function timer()
{
    let sec=60;
    let ineterval=setInterval(function(){
        timer_id.innerText=sec;
        sec--;
        if(sec==-1)
        {  
           display_score.classList.add("show");
           display_score.innerHTML+="<pre>"+"Opps ! Times Up"+"<br/>"+"    SCORE:"+score+"</pre>";
            createButton();
           clearInterval(ineterval);
        }
    },1000);
}

function createButton()
{
           var btn= document.createElement("button");
           btn.innerHTML="Restart";
           display_score.appendChild(btn);
           btn.classList.add('btn');
           btn.id='btn';
           btn.addEventListener('click',last);
}

function last()
{
    display_score.innerHTML="";
    display_score.classList.remove('show');
    scorre_id.innerHTML="SCORE:"+0;
    start();
}
function start(){
score=0;
starting.classList.add('starting_hidden')
quoteloop();
timer();
}
