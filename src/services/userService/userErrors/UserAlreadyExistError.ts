export class UserAlreadyExistError extends Error {
    constructor(){
        super("Email em uso")
    }
}