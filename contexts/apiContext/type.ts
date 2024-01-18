import { HttpRequestMethods, ValueTypes } from "@/constants/enums"

export interface Api {
    id: number
    method: HttpRequestMethods
    appId: number,
    endpoint: string,
    params: Parameter[],
    body: string
    headers: Header[]
}



export type Parameter = {
    name: string,
    type?: ValueTypes
    description?: string
}

export type Header = {
    id?: number,
    key: string,
    value: string
}