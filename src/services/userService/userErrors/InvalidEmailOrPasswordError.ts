export class InvalidEmailOrPassword extends Error {
    constructor(){
        super("Email ou Senha invalidos!")
    }
}