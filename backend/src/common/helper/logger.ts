import chalk from "chalk";


const log = console.log;

const sucess = (message: any, data: any) => {
    log(chalk.green('[Sucess]: ') + message + '::' + data)
}
const fail = (message: any, data: any) => {
    log(chalk.red('[Failure]: ') + message + '::' + data)
}
const warning = (message: any, data: any) => {
    log(chalk.yellow('[Failure]: ') + message + '::' + data)
}

export const logger = {
    sucess,
    fail,
    warning
}