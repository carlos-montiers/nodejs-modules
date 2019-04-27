// Clase que encapsula conexiones a bases de datos
// de tipo relacional y documental
// @author Carlos Montiers A. <cmontiers@gmail.com>

const mysql = require('promise-mysql')
const mongo = require('mongodb')
const MysqlConn = require('./mysql-conn')
const MongoConn = require('./mongo-conn')

class ConnectionFactory {

    /**
     *
     * @param {Object} conf
     * @return Promise
     */
    static getMysqlConnection(conf) {
        let mysqlConfig = {
            database: conf.database,
            host: conf.host || '127.0.0.1',
            port: conf.port || '3306',
            user: conf.user,
            password: conf.password,
        }
        return new Promise((resolve, reject) => {
            mysql.createConnection(mysqlConfig)
                .then((conn) => {
                    let mysqlConn = new MysqlConn(conn)
                    resolve(mysqlConn)
                }).catch((error) => {
                    reject(error)
                })
        })
    }

    /**
     *
     * @param {Object} conf
     * @return Promise
     */
    static getMongoConnection(conf) {
        let mongoConfig = {
            database: conf.database,
            host: conf.host || '127.0.0.1',
            port: conf.port || '27017',
        }

        const mongoUri = 'mongodb://' + mongoConfig.host + ':' + mongoConfig.port

        const client = new mongo.MongoClient(mongoUri, { useNewUrlParser: true })
        return new Promise((resolve, reject) => {
            client.connect(function (err) {
                if (err) {
                    reject(err)
                } else {
                    const db = client.db(mongoConfig.database)
                    let mongoConn = new MongoConn(client, db)
                    resolve(mongoConn)
                }
            })
        })
    }

}

module.exports = ConnectionFactory
