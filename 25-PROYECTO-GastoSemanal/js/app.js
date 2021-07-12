//variables

const formulario= document.querySelector('#agregar-gasto');
const gastosListado= document.querySelector('#gastos ul');

//eventos

eventListeners();

function eventListeners(){
   
    document.addEventListener('DOMContentLoaded', preguntarPresuspuesto);
    formulario.addEventListener('submit',agregarGasto);
}

//clases

class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];

    }
    nuevoGasto(gasto){
       this.gastos=[...this.gastos,gasto]
       console.log(this.gastos);
        this.calcularRestante();
    }
    calcularRestante(){
        const gastado = this.gastos.reduce((total, gasto)=> total + gasto.cantidad, 0);
        this.restante = this.presupuesto-gastado;
    }
    eliminarGasto(id){
        this.gastos=this.gastos.filter(gastos => gastos.id !== id)
        this.calcularRestante();
    }

}


class UI{
    insertarPresupuesto (cantidad){
        
        const {presupuesto, restante} = cantidad;
        document.querySelector('#total').textContent= presupuesto;
        document.querySelector('#restante').textContent= restante;
    }
    imprimirAlerta(mensaje,tipo){
        const divMensaje= document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if (tipo==='error'){
            divMensaje.classList.add('alert-danger');
        }else {
            divMensaje.classList.add('alert-success');
        }
        divMensaje.textContent= mensaje;
        document.querySelector('.primario').insertBefore(divMensaje, formulario);
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);

    }
   
    mostrarGastos(gastos) {

        // Limpiar HTML
        this.limpiarHTML();

        // Iterar sobre los gastos 
        gastos.forEach(gasto => {
            const {nombre, cantidad, id } = gasto;

            // Crear un LI
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;

            // Insertar el gasto
            nuevoGasto.innerHTML = `
                ${nombre}
                <span class="badge badge-primary badge-pill">$ ${cantidad}</span>
            `;

            // boton borrar gasto.
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML='Borrar &times;'
            btnBorrar.onclick= ()=>{
                eliminarGasto(id);
            }
            nuevoGasto.appendChild(btnBorrar);

            // Insertar al HTML
            gastosListado.appendChild(nuevoGasto);
        });
   }
   
   limpiarHTML(){
       while (gastosListado.firstChild){
       gastosListado.removeChild(gastosListado.firstChild)}
   }

   actualizarRestante(restante){
    document.querySelector('#restante').textContent= restante;
   }
   comprobarPresupuesto(presupuestoObj){
       const {presupuesto, restante} = presupuestoObj;
       const restanteDiv=document.querySelector('.restante')
       //comprobar el 25%
       if((presupuesto/4) > restante){

        restanteDiv.classList.remove('alert-success', 'alert-warning');
        restanteDiv.classList.add('alert-danger'); 

       }else if ((presupuesto/2) > restante){
        restanteDiv.classList.remove('alert-success');
        restanteDiv.classList.add('alert-warning'); 
           
       }else{
           restanteDiv.classList.remove('alert-danger', 'alert-warning');
           restanteDiv.classList.add('alert-success'); 
           
       }
       
   }
}

const ui=new UI();

let presupuesto;
//funciones

function preguntarPresuspuesto(){
    const presupuestoUsuario = prompt('Cual es tu presupuesto ?')
    Number(presupuestoUsuario);
    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario ) || presupuestoUsuario <=0){
        window.location.reload();
    }
    presupuesto = new Presupuesto(presupuestoUsuario);
    
    ui.insertarPresupuesto(presupuesto);
}

function aagregarGasto(e){
    e.preventDefault()
    const nombre= document.querySelector('#gasto').value
    const cantidad= Number(document.querySelector('#cantidad').value);

    if( nombre==='' || cantidad===''){
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
      }else if (cantidad <= 0 || isNaN(cantidad)){
          ui.imprimirAlerta('Cantidad no valida','error')
          return;
      }
      //generar obj con gasto
    
      const gasto = {nombre, cantidad, id:Date.now} // objeto literal, lo contrario a destruccturin

      presupuesto.nuevoGasto(gasto);

      ui.imprimirAlerta('Gasto Agregado Correctamente')

   //imprimir los gastos
      const {gastos}= presupuesto;
      
      ui.mostrarGastos(presupuesto);

      formulario.reset();

    }

    function agregarGasto(e) {
        e.preventDefault();
    
         // Leer del formulario de Gastos
         const nombre = document.querySelector('#gasto').value;
         const cantidad = Number( document.querySelector('#cantidad').value);
    
         // Comprobar que los campos no esten vacios
         if(nombre === '' || cantidad === '') {
              // 2 parametros: mensaje y tipo
              ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
         } else if(cantidad <= 0 || isNaN(cantidad )) {
    
              // si hay una cantidad negativa o letras...
              ui.imprimirAlerta('Cantidad no válida', 'error')
         } else {
                const gasto = { nombre, cantidad, id: Date.now() };
    
                // Añadir nuevo gasto 
                presupuesto.nuevoGasto(gasto)
    
                // Insertar en el HTML
                ui.imprimirAlerta('Correcto', 'correcto');
    
                // Pasa los gastos para que se impriman...
                const { gastos, restante} = presupuesto;
                ui.mostrarGastos(gastos);
                ui.actualizarRestante(restante);
                // Cambiar la clase que nos avisa si se va terminando
                ui.comprobarPresupuesto(presupuesto);
    
                // Actualiza el presupuesto restante
                //const { restante } = presupuesto;
    
                
    
                // Reiniciar el form
                formulario.reset();
         }
    }

function eliminarGasto(id){
    presupuesto.eliminarGasto(id);
    const {gastos, restante}=presupuesto;
    ui.mostrarGastos(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);
    

}
