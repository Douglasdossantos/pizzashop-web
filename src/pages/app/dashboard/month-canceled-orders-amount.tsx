import { getMonthCanceledOrdersAmount } from "@/api/get-month-canceled-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";

export function MonthCanceledOrdersAmount(){
    const {data: monthCanceledOrdersAmount} = useQuery({
        queryFn: getMonthCanceledOrdersAmount,
        queryKey:['metrics', 'month-canceled-orders-amount'],
    })
    return(
        <Card>
            <CardHeader className='flex-row items-center justify-between space-y-0 pd-2'>
                <CardTitle className='text-base font-semibold'>
                    Canleamento no  (mês)
                </CardTitle>
                <DollarSign className='h-4 w-4 text-muted-foreground'/>
            </CardHeader>
            <CardContent className='space-y-1'>
                {monthCanceledOrdersAmount && (
                    <>
                        <span className='text-2xl font-bold tracking-tight'> {monthCanceledOrdersAmount.amount.toLocaleString('pt-BR')} </span>                        
                        <p className='text-xs text-muted-foreground'> 
                        {monthCanceledOrdersAmount.amount < 0 ?(
                            <>
                                <span className='text-rose-500 dark:text-rose-400'>{monthCanceledOrdersAmount.amount}%</span> {' '} em relação ao mês passado
                            </>
                        ):(
                            <>
                                <span className='text-emerald-500 dark:text-emeral-400'>+{monthCanceledOrdersAmount.amount}%</span> {' '} em relação ao mês passado
                            </>
                        )}
                        </p>
                    </>
                )}
            </CardContent>
        </Card>
    )
}