  // Obtener los productos desde localStorage
  let tablaProducto = localStorage.getItem("tablaProductoStorage");
  let productos = [];

  let productosDeshabilitados = [];

  
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
        dataFila += "<td>" +
        "<button type='button' class='btn btn-warning btn-espacio' onclick='deshabilitarProducto(" + producto.idProducto + ")' id='"+ producto.idProducto +"'>Deshabilitar</button>" +
        "<button type='button' class='btn btn-warning btn-espacio' onclick='abrirForm(" + producto.idProducto + ")'>Editar</button>" +
        "</td>";
        
         // dataFila += "<td>" + "<button type='button' class='btn btn-warning' onclick='abrirForm(" + producto.idProducto + ")'>Editar</button>" + "</td>";
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
    // Encuentra el índice del producto en el arreglo
    const index = productos.findIndex(producto => producto.idProducto === id);
  
    
    // Si se encontró el producto, proceder con la eliminación
    if (index !== -1) {
      // Confirmación al usuario
      if (confirm("¿Estás seguro de que deseas deshabilitar este producto?")) {
        let productosDeshabilitados = JSON.parse(localStorage.getItem("productosDeshabilitados")) || [];

        productosDeshabilitados.push({
          idProducto: id,
          nombre: productos.find(p => p.idProducto === id).nombre,
          descripcion: productos.find(p => p.idProducto === id).descripcion,
          cantidad: productos.find(p => p.idProducto === id).cantidad,
          costo: productos.find(p => p.idProducto === id).costo,
          // ... (agregar los demás datos del producto)
        });
        // Eliminar el producto del arreglo
        productos.splice(index, 1);
  
        // Actualizar el localStorage
        localStorage.setItem("tablaProductoStorage", JSON.stringify(productos));
        localStorage.setItem("productosDeshabilitados", JSON.stringify(productosDeshabilitados));

  
        // Ocultar visualmente el elemento
        document.getElementById(id).style.display = "none";
  
        // Actualizar la lista de productos
        listar();
        console.log("Productos deshabilitados:", productosDeshabilitados);
        window.location.href = "deshabilitados.html";
      } else {
        // Si el usuario cancela, mostrar un mensaje
        alert("Se canceló la operación de deshabilitado.");
      }
    } else {
      // Si el producto no se encuentra, mostrar un mensaje de error
      alert("No se encontró el producto a deshabilitar.");
    }
  }
  listar();