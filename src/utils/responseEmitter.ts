import { NextResponse } from "next/server"

export const ResponseEmiiter = {
    BadResponse: (message: string = "bad Request", status=404) => {
        return NextResponse.json({ message: message, success: false }, { status: status })
    },
    SuccessfullResponse: (data: any = null, message: string = 'Succesfull', status = 200) => {
        return NextResponse.json({ data: data, message: message, success: true }, { status: status })
    },
    UnAuthenticatedReponse: (status= 'unauthenticated') => {
        return NextResponse.json({status: status }, { status: 200 })
    },
    AuthenticatedResponse : (user:any , status='authenticated') =>{
        return NextResponse.json({user:user , status: status}, {status : 200})
    },
    InternelServerErrorResponse: (message = 'Internal Server Error') => {
        return NextResponse.json({ message: message, success: false }, { status: 500 })
    },
    customResponse: (data: any, message: string, success: boolean, status: number) => {
        return NextResponse.json({ data: data, message: message, success : success } , {status:status})
    }
}