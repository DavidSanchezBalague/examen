
window.onload = function(){
    localStorage.clear();
    //EJ1
    setInterval(creaCarrusel, 3000);

    //EJ2
    var ing = document.getElementsByName("ing");
        for (var i = 0; i < ing.length; i++) {
        ing[i].onclick = doble;
    }

    //EJ3
    var btnGuardar = document.getElementById("guardar")
    btnGuardar.onclick = guardar;

    //EJ4
    var btnMostrar = document.getElementById("mostrar")
    btnMostrar.onclick = mostrar;

    //EJ5
    var btnEliminarr = document.getElementById("eliminar")
    btnEliminarr.onclick = eliminar;
    
    // 😎✔
}

var indexImg = 0;
var imagenes = ["imagenes/1.jpg" , "imagenes/2.jpg" , "imagenes/3.jpg","imagenes/4.jpg", "imagenes/5.jpg" ];
var carrusel = document.getElementById("carrusel");

// Función que cambia la imagen en el carrusel cada vez que se llama.
function creaCarrusel() {
// Incrementar el índice de la imagen.
indexImg++;

// Verificar si se alcanzó el final de la lista de imágenes.
if (indexImg >= imagenes.length) {
// Reiniciar el índice si se llegó al final.
indexImg = 0;
}

// Obtener el elemento de imagen con el ID "img1".
var img = document.getElementById("img1");

// Establecer la fuente de la imagen con la URL de la imagen correspondiente al índice actual.
img.src = imagenes[indexImg];
}



// Función que se ejecuta cuando se hace clic en un elemento con el nombre "ing".
function doble(){
gestionarIngredientes();
resetRadio();
}

// Función que gestiona la lista de ingredientes basada en la opción seleccionada.
function gestionarIngredientes() {
// Obtener el elemento select con el ID "ingredientes".
var selectIngredientes = document.getElementById("ingredientes");

// Obtener el elemento de entrada (input) con el ID "ingrediente".
var inputIngrediente = document.getElementById("ingrediente");

// Obtener el valor del radio seleccionado dentro del grupo con el nombre "ing".
var radio = document.querySelector('input[name="ing"]:checked').id;

// Comprobar si el radio seleccionado es "A" (Agregar) y si el valor del ingrediente no está vacío.
if (radio === "A" && inputIngrediente.value !== "") {
// Crear un nuevo elemento de opción (option) para el select.
var nuevoIngrediente = document.createElement("option");

// Establecer el valor y texto del nuevo ingrediente con el valor del input.
nuevoIngrediente.value = inputIngrediente.value;
nuevoIngrediente.text = inputIngrediente.value; 

// Agregar el nuevo ingrediente al select.
selectIngredientes.add(nuevoIngrediente);

// Limpiar el valor del input de ingrediente.
inputIngrediente.value = ""; 
} else if (radio === "Q") {
// Si el radio es "Q" (Quitar), obtener el índice del elemento seleccionado en el select.
var indiceSeleccionado = selectIngredientes.selectedIndex;

// Verificar si se ha seleccionado un elemento en el select.
if (indiceSeleccionado !== -1) {
    // Quitar el elemento seleccionado del select.
    selectIngredientes.remove(indiceSeleccionado);
}
} 
}


// Función que restablece la selección del radio a la opción predeterminada.
function resetRadio() {
// Obtener todos los elementos con el nombre "ing" (grupo de botones de radio).
var radios = document.getElementsByName("ing");

// Iterar sobre cada elemento del grupo de botones de radio.
for (var i = 0; i < radios.length; i++) {
// Si el valor del radio es "E" (suponiendo que "E" significa la opción por defecto).
if (radios[i].value === "E") {
    // Marcar este radio como seleccionado.
    radios[i].checked = true;
} else {
    // Desmarcar todos los demás radios.
    radios[i].checked = false;
}
}
}


// Función que guarda una nueva receta en el almacenamiento local.
function guardar() {
// Obtener elementos del DOM necesarios.
var selectRecetas = document.getElementById("recetas");
var inputReceta = document.getElementById("receta");
var selectIngredientes = document.getElementById("ingredientes");

// Verificar que el campo de nombre de receta no esté vacío y que haya al menos un ingrediente en el select.
if (inputReceta.value !== "" && selectIngredientes.options.length > 0) {
// Crear un objeto que represente una nueva receta con nombre y lista de ingredientes.
var nuevaReceta = {
    nombre: inputReceta.value,
    ingredientes: []
};

// Recorrer todas las opciones en el select de ingredientes y agregar sus textos a la lista de ingredientes de la nueva receta.
for (var i = 0; i < selectIngredientes.options.length; i++) {
    nuevaReceta.ingredientes.push(selectIngredientes.options[i].text);
}

// JSON.parse() se aplica a esa cadena de texto para convertirla en un objeto JavaScript.
// La expresión || [] se utiliza para proporcionar un valor predeterminado en caso de que la conversión mediante JSON.parse() 
// devuelva null. En este caso, si no hay recetas guardadas en el almacenamiento local o si hay algún problema con el formato, se inicializa recetasGuardadas como un array vacío.
var recetasGuardadas = JSON.parse(localStorage.getItem("recetas")) || [];

// Agregar la nueva receta al array de recetas guardadas.
recetasGuardadas.push(nuevaReceta);

//Almacenar el array actualizado en el almacenamiento local, convirtiéndolo a formato JSON.
//JSON.stringify(recetasGuardadas): Convierte el array recetasGuardadas (que contiene objetos JavaScript) en una cadena de texto JSON.
//Esto es necesario porque el localStorage solo puede almacenar cadenas de texto.
//JSON.stringify() se utiliza para convertir un objeto JavaScript en una cadena JSON antes de almacenarlo en el localStorage
localStorage.setItem("recetas", JSON.stringify(recetasGuardadas));

// Crear una nueva opción en el select de recetas con el nombre de la nueva receta.
var nuevaOpcion = document.createElement("option");
nuevaOpcion.value = inputReceta.value;
nuevaOpcion.text = inputReceta.value; 
selectRecetas.add(nuevaOpcion);

// Limpiar los campos de entrada y selección para preparar para la próxima entrada.
inputReceta.value = "";
selectIngredientes.innerHTML = "";
}
}


// Función que muestra los detalles de una receta seleccionada.
function mostrar() {
// Obtener elementos del DOM necesarios.
var selectRecetas = document.getElementById("recetas");
var labelVer = document.getElementById("ver");

// Obtener el índice de la receta seleccionada en el select.
var indiceSeleccionado = selectRecetas.selectedIndex;

// Verificar si se ha seleccionado una receta en el select.
if (indiceSeleccionado !== -1) {
// Obtener las recetas guardadas del almacenamiento local o inicializar un array vacío si no hay recetas guardadas.
var recetasGuardadas = JSON.parse(localStorage.getItem("recetas")) || [];

// Obtener la receta seleccionada usando el índice del select.
var recetaSeleccionada = recetasGuardadas[indiceSeleccionado];

// Actualizar el contenido del elemento con ID "ver" con los detalles de la receta seleccionada.
labelVer.textContent = `Receta: ${recetaSeleccionada.nombre}, Ingredientes: ${recetaSeleccionada.ingredientes.join(", ")}`;
}
}


// Función que elimina una receta seleccionada del almacenamiento local y del elemento select.
function eliminar() {
// Obtener elementos del DOM necesarios.
var selectRecetas = document.getElementById("recetas");
var recetasGuardadas = JSON.parse(localStorage.getItem("recetas")) || [];
var labelVer = document.getElementById("ver");

// Obtener el índice de la receta seleccionada en el select.
var indiceSeleccionado = selectRecetas.selectedIndex;

// Verificar si se ha seleccionado una receta en el select.
if (indiceSeleccionado !== -1) {
// Eliminar la receta seleccionada del array de recetas guardadas.
recetasGuardadas.splice(indiceSeleccionado, 1);

// Actualizar las recetas guardadas en el almacenamiento local.
localStorage.setItem("recetas", JSON.stringify(recetasGuardadas));

// Eliminar la opción seleccionada del select de recetas.
selectRecetas.remove(indiceSeleccionado);

// Limpiar el contenido del elemento con ID "ver".
labelVer.innerHTML = "";
}
}