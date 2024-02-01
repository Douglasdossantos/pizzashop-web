import { api } from "@/lib/axios";

export interface GetMonthCanceldOrdersAmount {
    amount: number
    diffFromLastMonth: number
}

export async function getMonthCanceldOrdersAmount(){
    const response = await api.get<GetMonthCanceldOrdersAmount>(
        '/metrics/month-canceled-orders-amount',
    )
    
    return response.data
}