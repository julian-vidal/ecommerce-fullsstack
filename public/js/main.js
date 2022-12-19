let qty = 1;
const inputQty = document.getElementById("quantity")

handlePlusButton = function(stock) {
    if (qty < stock) {
        inputQty.setAttribute("value", qty += 1)
    } 
}


handleMinusButton = function() {
    if (qty > 1) {
        inputQty.setAttribute("value", qty -= 1)
    } 
}

const addProductToCartMsg = (status) => {
    let message

    if(status === 200) {
        message = document.getElementById("success-message")
    } else {
        message = document.getElementById("error-message")
    }

    message.classList.remove("visually-hidden")
}

const addProductToCart = async () => {
    const cartId = "639df2472d5bdb8ca06f42c7"
    let productId = window.location.pathname.split("/")[2]
    const qty = parseInt(document.getElementById("quantity").value)

    let url = `${window.location.origin}/api/carts/${cartId}/products`
    let options = {
        method: "POST",
        body: JSON.stringify({
            id: productId,
            qty
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await fetch(url, options)
    addProductToCartMsg(res.status)
}