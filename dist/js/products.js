"use strict";
fetch("http://localhost:8080/api/products")
    .then(res => res.json())
    .then(products => {
    // console.log(products[0])
    // console.log(products)
    let html = "";
    for (let product of products) {
        html += `
            <div class="col-4">
                <div class="card">
                    <img src="https://via.placeholder.com/500" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${product.name}</h5>
                      <p class="card-text">${product.description}</p>
                    </div> <!-- // .card-body -->
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item"><b>Price:</b> $${product.price}</li>
                      <li class="list-group-item"><b>Stock:</b> ${product.stock}</li>
                      <li class="list-group-item"><b>SKU:</b> ${product.sku}</li>
                    </ul> <!-- // .list-group.list-group-flush -->
                    <div class="card-body">
                      <a href="#" class="card-link">Update</a>
                      <a href="#" class="card-link">Edit</a>
                    </div> <!-- // .card-body -->
                  </div> <!-- // .card -->
            </div> <!-- // .col -->
            `;
    }
    document.getElementById("products-container").innerHTML = html;
});
