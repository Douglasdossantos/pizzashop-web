import { getDailyRevenueInPeriod } from "@/api/get-daily-revenue-in-period";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-ranger-piker";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import {ResponsiveContainer,LineChart,Line, YAxis,XAxis, CartesianGrid,Tooltip} from 'recharts'
import colors from 'tailwindcss/colors'
import {DateRange} from 'react-day-picker'
import {subDays} from 'date-fns'
import { useMemo, useState } from "react";


export function RevenueChart() {

    const [dateRange,setDateRange] = useState<DateRange | undefined>({
        from: subDays(new Date(),7),
        to: new Date(),
    })

    const {data:dailyRevenueInPeriod} = useQuery({
        queryKey: ['metrics','daily-revenue-in-product',dateRange],
        queryFn: () => getDailyRevenueInPeriod({
            from: dateRange?.from,
            to: dateRange?.to
        }),
    })

    const charDate = useMemo(() => {
        return dailyRevenueInPeriod?.map(chartItem => {
            return {
                date:chartItem.date,
                receipt: chartItem.receipt/100
            }
        })
    },[dailyRevenueInPeriod])
    return(
        <Card className="col-span-6">
            <CardHeader className="flex flex-row items-center justify-between pd-8">
                <div className="space-y-1">
                    <CardTitle className="text-base font-medium">Receita no periodo</CardTitle>
                    <CardDescription>Receita diária no periodo</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                    <Label>Selecione um periodo</Label>
                    <DateRangePicker date={dateRange} onDateChange={setDateRange}/>

                </div>
            </CardHeader>
            <CardContent>
                {dailyRevenueInPeriod && (
                    <>
                        <ResponsiveContainer width='100%' height={240}>
                            <LineChart data={charDate} style={{fontSize:12}} >
                                <CartesianGrid vertical={false} className="stroke-muted"/>
                                <XAxis dataKey='date' tickLine={false} axisLine={false} dy={16} />
                                <YAxis width={80} stroke="#888" axisLine={false} tickLine={false} tickFormatter={(value:number)=> value.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}/>
                                <Line type='linear' strokeWidth={2} dataKey='receipt' stroke={colors.violet['500']}/>
                            </LineChart>                    
                        </ResponsiveContainer>
                    </>
                )}


            </CardContent>

        </Card>
    )
}