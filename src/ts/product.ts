// Get product ID
const queryString = window.location.pathname.split("/");
const id = queryString[queryString.length -1];

fetch("http://localhost:8080/api/products/"+id)
    .then(res => res.json())
    .then(product => {
        // console.log(product)
        let html:string = "";
        html += `
            <div class="col-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
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
                                <div class="input-group">
                                    <span class="input-group-text">$</span>
                                    <input type="number" class="form-control" id="price" value="${product.price}">
                                </div>                                
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
        let productHtml = document.getElementById("product-data");
        productHtml ? productHtml.innerHTML = html : console.log("There's no an element with ID product-data");
    })

const helperUpdateProduct = async () => {
    const response = await fetch("http://localhost:8080/api/products/"+id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: (document.getElementById("name") as HTMLInputElement).value,
            description: (document.getElementById("description") as HTMLInputElement).value,
            image: (document.getElementById("image") as HTMLInputElement).value,
            price: (document.getElementById("price") as HTMLInputElement).value,
            stock: (document.getElementById("stock") as HTMLInputElement).value,
            sku: (document.getElementById("sku") as HTMLInputElement).value,
        })
    })
}