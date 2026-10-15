const botones = document.querySelectorAll('.boton-acordeon');   // const variable que selecciona todos los elementos con la clase 'boton-acordeon' , document es representa la pagina html, querySelectorAll es un metodo que selecciona todos los elementos que coinciden con el selector especificado, en este caso '.boton-acordeon'

botones.forEach(boton => {   //significa "para cada uno". Es un método que le dice a JavaScript: "toma la caja botones (que tiene 7 elementos adentro) y repite el siguiente código una vez por cada uno de esos 7 botones".
                //boton singular es el nombre que le damos a cada uno de los elementos que estamos recorriendo, es decir, cada uno de los 7 botones.
    boton.addEventListener('click', function() { // agrega un evento de escucha a cada botón, que se activa cuando se hace clic en él. Cuando se hace clic, se ejecuta la función que sigue.
        const respuesta = this.nextElementSibling; // this hace referencia al botón que fue clickeado, nextElementSibling selecciona el siguiente elemento osea respuesta 
        respuesta.classList.toggle('mostrar');   // hace que aparezca 
    });
});

const cajas = document.querySelectorAll('.reglas-grid.alto, .reglas-grid.medio'); // Usamos la clase de los contenedores de CSS
 // Al pasar el ratón, salta ligeramente
cajas.forEach(caja => {
  
  caja.addEventListener('mouseenter', () => {
    caja.style.transform = 'scale(1.05) translateY(-5px)';
    caja.style.transition = 'transform 0.2s ease';
  });// Al pasar el ratón, salta ligeramente

  
  caja.style.transition = 'transform 0.2s ease';
  caja.addEventListener('mouseleave', () => {
    caja.style.transform = 'scale(1) translateY(0)';
  });// Al quitar el ratón, vuelve a su tamaño normal
});

