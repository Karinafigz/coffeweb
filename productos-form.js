let tablaProducto=localStorage.getItem("tablaProductoStorage");
tablaProducto = JSON.parse(tablaProducto) || [];
if(tablaProducto ==null){
     tablaProducto= [];
}

let idForm=localStorage.getItem("idForm");
idForm=JSON.parse(idForm);
if(idForm==null){
    idForm=0;
}

cargarPagina();
function guardar() {
    Swal.fire({
      title: 'Guardar',
      text: '¿Desea guardar los cambios?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#be9c79',
      cancelButtonColor: '#d33',
      confirmButtonText:   
   'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed)   
   {
        // Obtener los valores de los campos
        const nombre = document.getElementById("IdNombre").value.trim().toLowerCase();
        const descripcion = document.getElementById("IdDescripcion").value;
        const cantidad = parseInt(document.getElementById("IdCantidad").value);
        const costo = parseFloat(document.getElementById("IdCosto").value);
  
        // Crear un objeto con los datos del nuevo producto
        const nuevoProducto = {
          idProducto: (idForm > 0) ? idForm : (tablaProducto.length + 1),
          nombre,
          descripcion,
          cantidad,
          costo,
          habilitado: true
        };
  
        // Validaciones

        //que el nombre no sea repetido
        if (tablaProducto.some(producto => producto.nombre === nuevoProducto.nombre)) {
          Swal.fire('Error', 'Ya existe un producto con ese nombre.', 'error');
          return;
        }
         //que el campo no este vacio
         if (!nombre) {
            Swal.fire('Error', 'El campo "Nombre" es obligatorio.', 'error');
            return;
          }
          if (!descripcion) {
            Swal.fire('Error', 'El campo "Descripción" es obligatorio.', 'error');
            return;
          }
        //que la antidad sea mayor a 0
        if (cantidad <= 0) {
            Swal.fire('Error', 'La cantidad debe ser mayor a 0.', 'error');
            return;
        }
        //que la cantidad no supere las 800 unidades
        if ( cantidad > 800) {
            Swal.fire('Error', 'La cantidad no puede exceder de 800 unidades.', 'error');
            return;
          }
          //que el costo sea mayor a 0
          if(costo <=0){
            Swal.fire('Error', 'El costo  debe ser mayor a 0.', 'error');
            return;
          }
        if (idForm > 0) {
          // Actualizar el producto existente
          tablaProducto = tablaProducto.map(producto => {
            return producto.idProducto === idForm ? nuevoProducto : producto;
          });
        } else {
          // Agregar un nuevo producto
          tablaProducto.push(nuevoProducto);
        }
        // Guardar los cambios en localStorage
        localStorage.setItem("tablaProductoStorage", JSON.stringify(tablaProducto));
        // Mostrar mensaje de éxito 
        Swal.fire('¡Cambios guardados!', '', 'success').then(() => {
          window.location.replace("productos.html");
        });
      }
    });
  }
  function cargarPagina(){
    if(idForm>0){
        for(const i in tablaProducto){
            let Producto= JSON.parse(tablaProducto[i]);
            if(Producto.idProducto==idForm){
                document.getElementById("IdProducto").value=Producto.idProducto;
                document.getElementById("IdNombre").value=Producto.nombre;
                document.getElementById("IdDescripcion").value=Producto.descripcion;
                document.getElementById("IdCantidad").value=Producto.cantidad;
                document.getElementById("IdCosto").value=Producto.costo;
                break;
            }
        }

    }
}