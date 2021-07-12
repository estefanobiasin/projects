//variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito=document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn=document.querySelector('#vaciar-carrito');
const listaCursos= document.querySelector('#lista-cursos');
let articulosCarrito= [];


cargarEventListeners();
function cargarEventListeners(){
listaCursos.addEventListener('click', agregarCurso);

//elimina cursos del carrito
carrito.addEventListener('click', eliminarCurso)

//vaciar carrito
vaciarCarritoBtn.addEventListener('click', ()=> {
    articulosCarrito= [];
    vaciarCarrito();
})

}

//Funciones
function agregarCurso(e){
    e.preventDefault();
    if (e.target.classList.contains ('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        //console.log(e.target.parentElement.parentElement);
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e){
   
    if(e.target.classList.contains('borrar-curso')){
        
        
        const cursoId= e.target.getAttribute('data-id');

        articulosCarrito= articulosCarrito.filter( curso => curso.id !== cursoId);
        console.log(articulosCarrito);
        carritoHTML();
    }
}

//lee el contenido del html al que le dimos click y extrae la info del curso
 function leerDatosCurso(curso){
   

    const infoCurso={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad:1,
        
    }

// revisa si un curso ya existe en el carrito

const existe = articulosCarrito.some( curso=> curso.id === infoCurso.id);
if (existe) {
    const cursos = articulosCarrito.map (curso=> {
        if(curso.id === infoCurso.id){
            curso.cantidad++;
            return curso;
        }else{
            return curso;
        }
    } );
    articulosCarrito = [...cursos];
     

}else{
    articulosCarrito= [...articulosCarrito, infoCurso];
}
    //Agrega elementos al carrito
    //articulosCarrito= [...articulosCarrito, infoCurso]
    //console.log(articulosCarrito);
    carritoHTML();
 }

//muestra el carrito en el html

function carritoHTML() {

    vaciarCarrito();

    articulosCarrito.forEach(curso => {
         const row = document.createElement('tr');
         row.innerHTML = `
              <td>  
                   <img src="${curso.imagen}" width=100>
              </td>
              <td>${curso.titulo}</td>
              <td>${curso.precio}</td>
              <td>${curso.cantidad} </td>
              <td>
                   <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
              </td>
         `;
         contenedorCarrito.appendChild(row);
    });

}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
    // forma lenta
    // contenedorCarrito.innerHTML = '';


    // forma rapida (recomendada)
    while(contenedorCarrito.firstChild) {
         contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}
