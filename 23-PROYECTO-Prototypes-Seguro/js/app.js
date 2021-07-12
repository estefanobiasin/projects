
//Constructores


function Seguro(marca,year,tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

function UI(){

}


UI.prototype.llenarOpciones= ()=>{
    const max = new Date().getFullYear(),
        min = max -20;
    const selectYear = document.querySelector('#year');
    for (let i = max; i> min ; i--){
        let option = document.createElement('option');
        option.value=i;
        option.textContent =i;
        selectYear.appendChild(option);
    }
}

UI.prototype.mostrarMensaje = (mensaje, tipo) =>{
    const div= document.createElement('div');
    console.log(tipo)
    if(tipo ==='error'){
        div.classList.add('error')
    }else{
        div.classList.add('correcto')
    }
    div.classList.add('mensaje', 'mt-10')
    div.textContent = mensaje;
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('resultado'));
}


const ui = new UI()

document.addEventListener('DOMContentLoaded',()=>{
    ui.llenarOpciones();
})

EventListener ();

function EventListener(){
    const formulario = document.querySelector('#cotizar-seguro');
    
    formulario.addEventListener('submit', cotizarSeguro)
}

function cotizarSeguro(e){
    e.preventDefault();
    
    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked');
    
    if (marca===''|| year==='' || tipo===''){
        ui.mostrarMensaje('Todos los campos sin obligatorios')
    }else{
        console.log('si paso la validacion')
    }
}