class MongoContainer {
    constructor(modelName) {
        this.modelName = modelName;
    }

    async getAll() {
        try {
            const data = await this.modelName.find();
            return data
        } catch(err) {
            return err
        }
    }

    async save(newRecord) {
        try {
            const data = new this.modelName(newRecord)
            const res = await data.save();
            return res
        } catch (err) {
            return err
        }
    }
}

module.exports = MongoContainer