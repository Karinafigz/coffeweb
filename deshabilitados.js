   // Obtener los productos deshabilitados desde el localStorage
   let productosDeshabilitados = JSON.parse(localStorage.getItem("productosDeshabilitados")) || [];
        
   // Función para listar los productos deshabilitados en la tabla
   function listarProductosDeshabilitados() {
       let dataFila = '';
       if (productosDeshabilitados.length > 0) {
           productosDeshabilitados.forEach(producto => {
               dataFila += "<tr>";
               dataFila += "<td>" + producto.idProducto + "</td>";
               dataFila += "<td>" + producto.nombre + "</td>";
               dataFila += "<td>" + producto.descripcion + "</td>";
               dataFila += "<td>" + producto.cantidad + "</td>";
               dataFila += "<td>" + producto.costo + "</td>";
               dataFila += "<td>" +
                 "<button type='button' class='btn btn-warning btn-espacio' onclick='habilitarProducto(" + producto.idProducto + ")' id='"+ producto.idProducto +"'>Habilitar</button>"+
                 "</td>";
               dataFila += "</tr>";
           });
       } else {
           dataFila += "<tr><td colspan='5'>No hay productos deshabilitados.</td></tr>";
       }
       document.getElementById("dataProductosDeshabilitados").innerHTML = dataFila;
   }
function habilitarProducto(id) {
// Encuentra el índice del producto en el arreglo
const index = productosDeshabilitados.findIndex(producto => producto.idProducto === id);


// Si se encontró el producto, proceder con la eliminación
if (index !== -1) {
 // Confirmación al usuario
 if (confirm("¿Estás seguro de que deseas habilitar este producto?")) {
   let productos = JSON.parse(localStorage.getItem("tablaProductoStorage")) || [];

   productos.push({
     idProducto: id,
     nombre: productosDeshabilitados.find(p => p.idProducto === id).nombre,
     descripcion: productosDeshabilitados.find(p => p.idProducto === id).descripcion,
     cantidad: productosDeshabilitados.find(p => p.idProducto === id).cantidad,
     costo: productosDeshabilitados.find(p => p.idProducto === id).costo,
     // ... (agregar los demás datos del producto)
   });
   // Eliminar el producto del arreglo
   productosDeshabilitados.splice(index, 1);

   // Actualizar el localStorage
   localStorage.setItem("productosDeshabilitados", JSON.stringify(productosDeshabilitados));
   localStorage.setItem("tablaProductoStorage", JSON.stringify(productos));


   // Ocultar visualmente el elemento
   document.getElementById(id).style.display = "none";

   // Actualizar la lista de productos
   listarProductosDeshabilitados();
   console.log("Productos deshabilitados:", productosDeshabilitados);
   window.location.href = "deshabilitados.html";
 } else {
   // Si el usuario cancela, mostrar un mensaje
   alert("Se canceló la operación de habilitado.");
 }
} else {
 // Si el producto no se encuentra, mostrar un mensaje de error
 alert("No se encontró el producto a habilitar.");
}
}
   // Llamar a la función para mostrar los productos deshabilitados al cargar la página
   listarProductosDeshabilitados();