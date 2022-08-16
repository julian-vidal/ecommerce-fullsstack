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

    async save(newData) {
        try {
            let newID;
            let positionId;
            let data = await this.readFile();

            if (data.length == 0 || !data) {
                newID = 1;
            } else {
                newID = data[data.length-1].id + 1;
                positionId = await this.checkIfIdExists(data, newID);
                while(positionId != -1) {
                    newID = newID+1;
                    positionId = await this.checkIfIdExists(data, newID);
                }
            }

            newData.id = newID;
            data.push(newData);

            await fs.promises.writeFile(this.fileName, JSON.stringify(data));
            console.log(`A new product with ID ${newID} has been added`);

        } catch( err) {
            console.log(err)
        }
    }
}

module.exports = Container