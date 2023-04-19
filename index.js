const divProductos = document.getElementById('productos')
const botonFinalizar = document.getElementById('finalizar')
const thead = document.querySelector('#thead')
const tbody = document.querySelector('#tbody')
const parrafoTotal = document.querySelector('#total')

const fetchProducts = async () => {
    const productApi = await fetch('https://fakestoreapi.com/products')
    const productsJSON = await productApi.json()
    //console.log(productsJSON)
    return productsJSON
}

const fetchOneProduct = async (id) => {
    const productApi = await fetch(`https://fakestoreapi.com/products/${id}`)
    const productJSON = await productApi.json()
    //console.log(productJSON)
    return productJSON
}

const renderProducts = async () => {
    const products = await fetchProducts()
    products.forEach(prod => {
        const { id, title, price, category, image }
            = prod
        divProductos.innerHTML += `
        <div class="card cardProducto" ">
        <img src=${image} class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${price}${category}</p>
         <button id=${id} onclick="agregarProducto(${id})">Agregar</button>
         <button id=${id} onclick="quitarProducto(${id})">Quitar</button>
        </div>
      </div>
        `
    })
}
renderProducts()

let carrito = []

const agregarProducto = async (id) => {
    const product = await fetchOneProduct(id)
    const buscarProductCarrito = carrito.find((prod) => prod.id == product.id)
    if (!buscarProductCarrito) {
        carrito.push({
            id: product.id,
            quantity: 1,
            price: product.price,
            titulo: product.title,

        })
    } else {
        buscarProductCarrito.quantity++
    }
    mensajeProductoAgregado()
    console.log(carrito)
}

const quitarProducto = (id) => {

    const buscarProductCarrito = carrito.find((prod) => prod.id == id)
    if (!buscarProductCarrito) {
        mensajeNoHayProductoAgregado()

    } else {
        if (buscarProductCarrito.quantity === 1) {
            carrito = carrito.filter((prod) => prod.id !== id)


        } else {
            buscarProductCarrito.quantity--
        }
        mensajeProductoQuitado()
    }
    console.log(carrito)
}

const mensajeProductoAgregado = () => {
    Swal.fire({
        text: 'Producto Agregado',
        timer: 1000
    })
}
const mensajeProductoQuitado = () => {
    Swal.fire({
        text: 'Producto Quitado',
        timer: 1000
    })
}

const mensajeNoHayProductoAgregado = () => {
    Swal.fire({
        text: 'No posee este producto en el carrito',
        timer: 1000
    })
}

botonFinalizar.onclick = () => {
    divProductos.remove()
    botonFinalizar.remove()
    thead.innerHTML = `<tr>
    <th scope="col">Producto</th>
      <th scope="col">Cantidad</th>
      <th scope="col">Total</th>
</tr>`

let totalCompra = 0

carrito.forEach(prod=>{
    totalCompra+= prod.quantity*prod.price
    tbody.innerHTML+=`
    <tr>
    <td>${prod.titulo}</td>
    <td>${prod.quantity}</td>
    <td>${prod.quantity*prod.price}</td>
    </tr>
    `
})

parrafoTotal.innerText= `El total de tu compra es ${totalCompra}`

}
