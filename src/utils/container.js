const fs = require("fs");
const encoding = "utf-8";


class Container {
    constructor(fileName) {
        this.fileName = fileName;
        this.createFileIfNotExists();
    }
    async readFile() {
        try {
            let data = await fs.promises.readFile(this.fileName, encoding);
            data = JSON.parse(data)
            return data;
        } catch (err) {
            console.log(err)
        }
        
    }

    createFileIfNotExists() {
        if (!fs.existsSync(this.fileName)) {
            fs.writeFileSync(this.fileName, "[]")
        }
    }

    async checkIfIdExists(data,id) {
        try {
            let positionId = data.findIndex(obj => obj.id === id);
            return positionId;
        } catch (err) {
            console.log(err)
        }
    }

    async assignId(array) {
        let newId;
        if (array.length == 0 || !array) {
            newId = 1;
        } else {
            newId = array[array.length-1].id + 1;
            let newPositionId = await this.checkIfIdExists(array, newId);
            while (newPositionId != -1) {
                newId = newId + 1;
                newPositionId = await this.checkIfIdExists(array, newId);
            }
        }
        console.log(`new ID: ${newId}`)
        return(newId)
    }

    async save(newData, objectType) {
        try {
            
            let data = await this.readFile();
            newData.id = await this.assignId(data)
            newData.timestap = Date.now()
            data.push(newData);

            await fs.promises.writeFile(this.fileName, JSON.stringify(data));
            const response = `A new ${objectType} with ID ${newData.id} has been added`
            console.log(response);
            return response
        } catch( err) {
            console.log(err)
        }
    }

    async deleteById(id, objectType) {
        try {
            let data = await this.readFile();
            let positionId = await this.checkIfIdExists(data,id);
            let response;
            if (positionId == -1) {
                response = `There's no a ${objectType} with ID ${id}`;
                console.log(response)
                return response
            } else {
                data.splice(positionId,1);
                await fs.promises.writeFile(this.fileName, JSON.stringify(data));
                response = `The ${objectType} with ID ${id} has been deleted`
                console.log(response)
                return response
            }
        } catch (error) {
            console.log(error)
        }
    }

    async updateById(newData, id, objectType) {
        try {
            let data = await this.readFile();
            let positionId = await  this.checkIfIdExists(data,id);
            let response;
            if (positionId == -1) {
                response = `There's no a ${objectType} with ID ${id}`
                console.log(response)
                return ({response: response})
            } else {
                newData.timestap = Date.now();
                data.splice(positionId, 1, newData);
                await fs.promises.writeFile(this.fileName, JSON.stringify(data));
                response = `The ${objectType} with ID ${id} has been updated`
                console.log(response);
                return response;
            }
        } catch(err) {
            console.log(err);
        }
    }

    async getById(id, objectType) {
        try {
            let data = await this.readFile();
            let positionId = await this.checkIfIdExists(data,id);
            let response;

            if(positionId == -1) {
                response = `There's no a ${objectType} with ID ${id}`
                console.log(response)
                return {response}
            } else {
                response = data[positionId];
                console.log(response);
                return response
            }
        } catch(err) {
            console.log(err)
        }
    }

    // Exclusive for the cart endpoint

    async addProductToCart(newProduct, cartId, cart) {
        try {
            let data = await this.readFile();
            let positionId = await  this.checkIfIdExists(data,cartId);
            let response;
            
            if (positionId == -1) {
                response = `There's no a cart with ID ${cartId}`
                console.log(response)
                return (response)
            } else {
                newProduct.id = await this.assignId(cart.products);
                newProduct.timestap = Date.now();
                cart.products.push(newProduct)
                data.splice(positionId, 1, cart);
                await fs.promises.writeFile(this.fileName, JSON.stringify(data));
                response = `The cart with ID ${cartId} has been updated`
                console.log(response);
                return response;
            }
        } catch(err) {
            console.log(err);
        }
    }

    async deleteProductFromCart(idCart, idProd, cart) {
        try {
            let data = await this.readFile();
            const positionIdCart = await this.checkIfIdExists(data,idCart);
            let response;

            if (positionIdCart == -1) {
                response = `There's no a cart with ID ${idCart}`;
                console.log(response)
                return response
            } else {

                const positionIdProduct = await this.checkIfIdExists(cart.products, idProd);

                if (positionIdProduct == -1) {
                    response = `There's no a product with ID ${idProd} at the cart ID ${idCart}`;
                    console.log(response)
                    return response
                } else {
                    cart.products.splice(positionIdProduct,1);
                    response = await this.updateById(cart, idCart, "cart")
                    console.log(response)
                    return response
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Container