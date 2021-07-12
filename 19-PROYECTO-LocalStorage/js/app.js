
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets=[];


eventListeners();


function eventListeners() {
    //Cuando se envia el formulario
    formulario.addEventListener('submit', agregarTweet);

    // Borrar Tweets
    listaTweets.addEventListener('click', borrarTweet);

    // Contenido cargado
    document.addEventListener('DOMContentLoaded', () => {
         tweets = JSON.parse( localStorage.getItem('tweets') ) || []  ;
         console.log(tweets);
         crearHTML();
    });
}


function agregarTweet(e){
    e.preventDefault();
    
    const tweet = document.querySelector('#tweet').value;
    console.log(tweet);

    if(tweet===''){
        mostrarError('Un mensaje no puede ir vacio')
        return;
    }
    const tweetObj = {
        id: Date.now(),
        tweet // tweet : tweet
    }
    tweets=[...tweets,tweetObj];
    crearHTML();
    formulario.reset();
    
}

function mostrarError(error){
    const mensajeError= document.createElement('p');
    mensajeError.textContent=error;
    mensajeError.classList.add('error');
    
    const contenido= document.querySelector('#contenido');
    contenido.appendChild(mensajeError);
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);

}
function crearHTML(){
    
    limpiarHtml()
    if(tweets.length > 0){
        
        tweets.forEach(tweet => {
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText='X'

            btnEliminar.onclick=()=>{
                borrarTweet (tweet.id)

            }
            const li= document.createElement('li');
            li.innerText= tweet.tweet;
            li.appendChild(btnEliminar);
            listaTweets.appendChild(li)
            
        });
    }
    sincronizarStorage();
}

function limpiarHtml(){
    while(listaTweets.firstChild)
    {
        listaTweets.removeChild(listaTweets.firstChild)
    }
}
function sincronizarStorage(){
    
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

function borrarTweet(id){
    tweets = tweets.filter( tweet=> tweet.id !== id );
    crearHTML();

}