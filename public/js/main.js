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