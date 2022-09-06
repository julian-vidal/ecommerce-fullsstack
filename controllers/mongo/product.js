const ContainerMongo = require("../../utils/containerMongo")
const { Product } = require("../../models/product");

class ProductMongo extends ContainerMongo {
    constructor(modelName){
        super(modelName)
    }

    async getAllProducts() {
        try {
            return await this.getAll()
        } catch (err) {
            return err
        }
    }

    async saveProduct(newProduct) {
        try {
            return await this.save(newProduct)
        } catch(err) {
            return err
        }
    }
}


// module.exports = {
//     getAllProducts,
//     saveProduct
// }

module.exports = ProductMongo