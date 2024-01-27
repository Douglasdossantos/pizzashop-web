import { api } from "@/lib/axios";
interface GetProfileResponse {
    id: string
    email:string
    name:string
    phone:string
    role: 'manager'| 'customer'
    createdAt: Date| null
    updateAt: Date| null
}

export async function getProfile() {
    const Response = await api.get<GetProfileResponse>('/me')
    return Response.data
    
}