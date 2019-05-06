// Clase con métodos para manejo de números con decimales
// @author Carlos Montiers A. <cmontiers@gmail.com>

class NumberHelper {

    /**
     * Retorna si es un string de número integer
     * @param strDbl {string}
     * @returns {boolean}
     */
    static isStrInt(strInt) {
        return /^([+-]?\d+)$/.test(strInt);
    }

    /**
     * Retorna si es un string de número double
     * @param strDbl {string}
     * @returns {boolean}
     */
    static isStrDbl(strDbl) {
        return /^((([+-]?\d+)?([.,]\d+))|([+-]?\d+))$/.test(strDbl);
    }

    /**
     * Formatea un string que contiene un double truncando decimales según parámetro numDecimales:
     * 0 sin decimales
     * -1 todos los decimales
     * n decimales
     * Si rmDecZero es true se remueven los ceros finales de la parte decimal
     * y si el resultado es vacío se devuelve solo la parte entera
     * @param strDbl {string}
     * @param numDecimales {number}
     * @param rmDecZero {boolean}
     * @returns {string}
     * @author Carlos Montiers A.
     */
    static formatStrDblToString(strDbl, numDecimales, rmDecZero) {
        strDbl = String(strDbl).replace(/[,]/g, ".");


        if (numDecimales === undefined) {
            numDecimales = -1;
        }

        let parteEntera, parteDecimal;

        if (strDbl.indexOf(".") !== -1) {
            let partes = strDbl.split(".");
            parteEntera = partes[0];
            parteDecimal = partes[1];
        } else {
            parteEntera = strDbl;
            parteDecimal = "";
        }

        if (numDecimales === 0) {
            parteDecimal = "";
        } else if (numDecimales > 0) {
            parteDecimal = parteDecimal.substr(0, numDecimales);
            let diff = numDecimales - parteDecimal.length;
            for (let i = 0; i < diff; i++) {
                parteDecimal += "0";
            }
        }

        parteEntera = parteEntera.replace(/^[+]/, "");
        parteEntera = parteEntera.replace(/^([-]?)0+/, "$1");

        if (parteEntera === "") {
            parteEntera = "0";
        }
        else if (parteEntera === "-") {
            parteEntera = "-0";
        }

        let str;
        if (parteDecimal === '') {
            str = "" + parteEntera;
        } else {
            if (rmDecZero && /^0+$/.test(parteDecimal)) {
                str = "" + parteEntera;
            } else if (rmDecZero && /0+$/.test(parteDecimal)) {
                str = "" + parteEntera + "." + parteDecimal.replace(/0+$/g, "");
            } else {
                str = "" + parteEntera + "." + parteDecimal;
            }
        }

        return str;
    }

    /**
     * Formatea el número sin aproximar
     * @param dblNum {number}
     * @param numDecimales {number}
     * @returns {string}
     * @author Carlos Montiers A.
     */
    static formatDoubleToStringNoRound(dblNum, numDecimales) {
        // Lo formateo con el máximo número de presición de decimales en js
        let strNum = Number(dblNum).toFixed(17);
        // Truncamos
        let endPos = strNum.indexOf(".");
        if (numDecimales > 0) {
            endPos += numDecimales + 1;
        }
        return strNum.substring(0, endPos);
    }

}

module.exports = NumberHelper
