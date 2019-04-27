// Clase para realizar acciones en una base de datos MongoDB
// @author Carlos Montiers A. <cmontiers@gmail.com>

class MongoConn {

    /**
     * Constructor
     * @param mongodb.MongoClient mongoClient
     * @param mongodb.Db mongoDb
     */
    constructor(mongoClient, mongoDb) {
        this._client = mongoClient
        this._db = mongoDb
        this._connected = true
    }

    /**
     * Obtiene colección
     * @param string collectionName
     * @return Promise
     */
    getCollection(collectionName) {
        return new Promise((resolve, reject) => {
            this._db.collection(collectionName, {}, (error, collection) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(collection)
                }
            })
        })
    }

    /**
     * Obtiene documentos
     * @param Collection collection
     * @param PlainObject filterOptions
     * @return Promise
     */
    getDocuments(collection, filterOptions) {
        return new Promise((resolve, reject) => {
            let cursor = collection.find(filterOptions)
            cursor.toArray((error, documents) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(documents)
                }
            })
        })
    }

    /**
     * Cierra la conexión
     */
    close() {
        if (this._connected) {
            this._client.close()
            this._connected = false
        }
    }

}

module.exports = MongoConn
