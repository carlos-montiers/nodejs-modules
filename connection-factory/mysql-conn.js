// Clase para realizar acciones en una base de datos MySQL
// @author Carlos Montiers A. <cmontiers@gmail.com>

class MysqlConn {

    /**
     * Constructor
     * @param {mysql.createConnection} mysqlClient
     */
    constructor(mysqlClient) {
        this._client = mysqlClient
        this._connected = true
    }

    /**
     * Ejecuta sql
     * @param string sql
     * @param {} values
     */
    query(sql, values) {
        return this._client.query(sql, values)
    }

    /**
     * Inicia transacción
     */
    beginTransaction() {
        return this._client.beginTransaction()
    }

    /**
     * Finaliza transacción confirmando los cambios
     */
    commit() {
        return this._client.commit()
    }

    /**
     *  Finaliza transacción cancelando los cambios
     */
    rollback() {
        return this._client.rollback()
    }

    /**
     * Cierra la conexión
     */
    close() {
        if (this._connected) {
            this._client.end()
            this._connected = false
        }
    }

}

module.exports = MysqlConn
