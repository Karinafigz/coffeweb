  // Obtener los productos desde localStorage
  let tablaProducto = localStorage.getItem("tablaProductoStorage");
  let productos = [];

  try {
    productos = JSON.parse(tablaProducto);
  } catch (error) {
    console.error("Error al parsear los productos:", error);
  }
  // Función para listar los productos en una tabla
  function listar() {
    let dataFila = '';
    if (productos.length > 0) {
      for (const producto of productos) {
        dataFila += "<tr  id="+ producto.idProducto +">";
        dataFila += "<td>" + producto.idProducto + "</td>";
        dataFila += "<td>" + producto.nombre + "</td>";
        dataFila += "<td>" + producto.descripcion + "</td>";
        dataFila += "<td>" + producto.cantidad + "</td>";
        dataFila += "<td>" + producto.costo + "</td>";
        dataFila += "<td>" + "<button type='button' class='btn btn-warning' onclick='deshabilitarProducto(" + producto.idProducto + ")' id='"+ producto.idProducto +"'>Deshabilitar</button>" + "</td>";  
        //  dataFila += "<td>" + "<button type='button' class='btn btn-warning' onclick='abrirForm(" + producto.idProducto + ")'>Desavilitar</button>" + "</td>";
        dataFila += "</tr>";
      }
      document.getElementById("dataProductos").innerHTML = dataFila;
    }
  }
  // Función para abrir el formulario de edición
  function abrirForm(idForm) {
    localStorage.setItem("idForm", JSON.stringify(idForm));
    window.location.replace("productos-form.html");   

  }
  function deshabilitarProducto(id) {
    console.log(id);
    document.getElementById(id).style.display = "none";
  }
  // muestra los productos
  listar();