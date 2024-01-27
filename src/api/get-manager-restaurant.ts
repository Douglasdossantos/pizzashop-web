import { api } from "@/lib/axios"

interface GetManagerRestaurante{
    id: string
    name: string
    createdAt: Date| null
    description: string| null
    managerId: string| null
}

export  async function getManagerRestaurant() {
    const response = await api.get<GetManagerRestaurante>('/managed-restaurant')
    return response.data
    
}