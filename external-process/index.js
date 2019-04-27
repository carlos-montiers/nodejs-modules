// Clase wrapper para lanzar procesos usando spawn
// @author Carlos Montiers A. <cmontiers@gmail.com>

const spawn = require('child_process').spawn

class ExternalProcess {

    constructor(program, args, path) {
        this.program = program
        this.args = args
        this.path = path
    }

    async execute() {
        let undef = void (0)
        let command = this.program
        let args = this.args || []
        let cwd = this.path || undef
        let options = { cwd }

        return new Promise((resolve, reject) => {

            const proc = spawn(command, args, options)
            let result = {
                code: null,
                stdOut: '',
                stdErr: ''
            }

            proc.stdout.on('data', (data) => {
                result.stdOut += data
            })

            proc.stderr.on('data', (data) => {
                result.stdErr += data
            })

            proc.on('close', (code) => {
                result.code = code
                resolve(result)
            })

            proc.on('error', (error) => {
                reject(error)
            })
        })
    }
}

module.exports = ExternalProcess
