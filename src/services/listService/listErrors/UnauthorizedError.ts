export class UnauthorizedError extends Error {
    constructor(){
        super("Não Autorizado!")
    }
}