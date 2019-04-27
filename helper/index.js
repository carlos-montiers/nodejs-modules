// Clase con métodos útiles
// @author Carlos Montiers A. <cmontiers@gmail.com>

class Helper {

    /**
     * Permite evitar excepción: TypeError: Cannot read property of undefined
     * Uso: getSafe(()=> temp.propA.propB, '0')
     * @param {*} fn
     * @param {*} defaultVal
     */
    static getSafe(fn, defaultVal) {
        let undef = void (0)
        try {
            let value = fn()
            if (value === undef) {
                return defaultVal
            } else {
                return value
            }

        } catch (e) {
            return defaultVal
        }
    }

}

module.exports = Helper
