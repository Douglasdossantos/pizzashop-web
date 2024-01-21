import {Helmet} from 'react-helmet-async'
import { MonthRevenueCard} from './month-Revenue-Card'
import { MonthOrdersAmount } from './month-orders-amount-card'
import { DayOrdersAmountCard } from './day-orders-amount-card'
import { MonthCanceledOrdersAmount } from './month-canceled-orders-amount'
import { RevenueChart } from './revenueChart'
import { PopularProdyuctCharts } from './popular-product-chart'

export function Dashboard()
{
    return (
        <>
            <Helmet title='Dasborad'/>
           <div className='flex flex-col gap-4'>
            <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>

            <div className=' grid grid-cols-4 gap-4'>
                <MonthRevenueCard/>  
                <MonthOrdersAmount/>
                < DayOrdersAmountCard/>
                <MonthCanceledOrdersAmount/>
            </div>
            <div className='grid grid-cols-9 gap-4'>
                <RevenueChart/>
                <PopularProdyuctCharts/>
            </div>
            <div className='grid grid-cols-3 gap-4'>
            </div>

           </div>
        </>
    ) 
}