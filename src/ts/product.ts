// Get product ID
const queryString = window.location.pathname.split("/");
const id = queryString[queryString.length -1];
console.log(id)

fetch("http://localhost:8080/api/products/"+id)
    .then(res => res.json())
    .then(product => {
        console.log(product)
        let html:string = "";
        // for (let product of products ) {
            html += `
            <div class="col-4">
                <div class="card" style="width: 18rem;">
                    <img src="${product.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${product.name}</h5>
                      <p class="card-text">${product.description}</p>
                    </div> <!-- // .card-body -->
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item"><b>Price:</b> $${product.price}</li>
                      <li class="list-group-item"><b>Stock:</b> ${product.stock}</li>
                      <li class="list-group-item"><b>SKU:</b> ${product.sku}</li>
                    </ul> <!-- // .list-group.list-group-flush -->
                  </div> <!-- // .card -->
                </div> <!-- // .col-4 -->
                <div class="col-8">
                    <form>
                        <div class="mb-3">
                            <label for="name" class="form-label">Product Name</label>
                            <input type="text" class="form-control" id="name" value="${product.name}">
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <input type="text" class="form-control" id="description" value="${product.description}">
                        </div>
                        <div class="mb-3">
                            <label for="image" class="form-label">Image URL</label>
                            <input type="text" class="form-control" id="image" value="${product.image}">
                        </div>
                        <div class="row mb-3">
                            <div class="col-4">
                                <label for="price" class="form-label">Price</label>
                                <input type="number" class="form-control" id="price" value="${product.price}">
                            </div>
                            <div class="col-4">
                                <label for="stock" class="form-label">Stock</label>
                                <input type="number" class="form-control" id="stock" value="${product.stock}">
                            </div>
                            <div class="col-4">
                                <label for="sku" class="form-label">SKU</label>
                                <input type="text" class="form-control" id="sku" value="${product.sku}">
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary" onclick="helperUpdateProduct()" id="update">Update</button>
                    </form>
                </div>
            `;
        // }
        document.getElementById("product-data").innerHTML = html;
        document.getElementById("update").addEventListener("click", e => e.preventDefault());
    })



// document.getElementById("update")?.
// const updateProduct = () => console.log(document.getElementById("name").value)


const helperUpdateProduct = (async () => {
    const response = await fetch("http://localhost:8080/api/products/"+id, {
        method: "PUT",
        body: JSON.stringify({
            name: document.getElementById("name").value,
            description: document.getElementById("description").value,
            image: document.getElementById("image").value,
            price: document.getElementById("price").value,
            stock: document.getElementById("stock").value,
            sku: document.getElementById("sku").value,
        })
    })

    console.log(response)
}
)()



/*



// Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  postData('https://example.com/answer', { answer: 42 })
    .then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
  


*/