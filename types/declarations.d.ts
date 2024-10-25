declare type UserCreationRequestPaylod = {
    name : string,
    email : string,
    password : string
}
declare type SendMailParams = {
    email : string,
    emailType : string,
    userId : number
}