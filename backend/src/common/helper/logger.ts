import chalk from "chalk";


const log = console.log;

const sucess = (message: string, data: any) => {
    log(chalk.green('[Sucess]: ') + message + ' ' + data)
}
const fail = (message: string, data: any) => {
    log(chalk.red('[Failure]: ') + message + ' ' + data)
}
const warning = (message: string, data: any) => {
    log(chalk.yellow('[Warning]: ') + message + ' ' + data)
}

export const logger = {
    sucess,
    fail,
    warning
}