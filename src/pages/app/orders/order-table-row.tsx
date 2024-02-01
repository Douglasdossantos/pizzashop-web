import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Locate, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "./order-status";

import {formatDistanceToNow} from 'date-fns'
import {ptBR} from 'date-fns/locale'
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/cancel-order";
import { queryClient } from "@/lib/react-query";
import { GetOrdersResponse } from "@/api/get-orders";
import { approveOrder } from "@/api/approve-order";
import { deliverOrder } from "@/api/deliver-order";
import { dispatchOrder } from "@/api/dispatch-order";

export interface OrderTableRowProps{
    order:{
        orderId:string
        createAt:string
        status: 'pending'|'canceled'| 'processing'| 'delivering'|'delivered'
        customerName: string
        total: number
    }
}

export function OrderTableRow({order}: OrderTableRowProps){

    const [isDetailsOpem, setIsDetailsOpem] = useState(false)
    const queryClient = useQueryClient()
    
    function updateOrderStatusOnCache(orderId: string, status: OrderStatus){

        const orderListCached = queryClient.getQueriesData<GetOrdersResponse>({
            queryKey:['orders']
        })

        orderListCached.forEach(([cacheKey,cacheData])=> {
            if(!cacheData){
                return
            }

            queryClient.setQueryData<GetOrdersResponse>(cacheKey,{
                ...cacheData,
                orders: cacheData.orders.map(order => {
                    if(order.orderId == orderId){
                        return {...order,status}
                    }
                    return order
                })
            })
        })
        
    }

    const {mutateAsync: cancelOrderFn, isPending: isCancelingOrder} = useMutation({
        mutationFn: cancelOrder,
        async onSuccess(_,{orderId}){
            updateOrderStatusOnCache(orderId,'canceled')
        },
    })

    const {mutateAsync: approveOrderFn, isPending: isApprovingOrder} = useMutation({
        mutationFn: approveOrder,
        async onSuccess(_,{orderId}){
            updateOrderStatusOnCache(orderId,'processing')
        },
    })

    const {mutateAsync: dispatchOrderFn, isPending: isDispatchOrder} = useMutation({
        mutationFn: dispatchOrder,
        async onSuccess(_,{orderId}){
            updateOrderStatusOnCache(orderId,'delivering')
        },
    })

    const {mutateAsync: deliverOrderFn, isPending: isDeliveringOrder} = useMutation({
        mutationFn: deliverOrder,
        async onSuccess(_,{orderId}){
            updateOrderStatusOnCache(orderId,'delivered')
        },
    })
   
    
    return(        
    <TableRow >
        <TableCell>
            <Dialog open={isDetailsOpem} onOpenChange={setIsDetailsOpem}>
                <DialogTrigger >
                    <Button variant="outline" size="xs">
                        <Search className='h-3 w-3'/>
                        <span className='sr-only'>Detalhes do pedido</span>
                    </Button>
                </DialogTrigger>
                <OrderDetails open={isDetailsOpem} orderId={order.orderId}/>
            </Dialog>
        </TableCell>
        <TableCell className=' font-mono text-xs font-medium'>
            {order.orderId}
        </TableCell>
        <TableCell className='text-muted-foreground'>
        {/* {formatDistanceToNow(order.createAt,{ locale: ptBR, addSuffix: true,  })} */}
            {formatDistanceToNow(new Date(order.createdAt), { locale: ptBR, addSuffix: true })}
            
            
        </TableCell>
        <TableCell>
           <OrderStatus status={order.status} />
        </TableCell>
        <TableCell className='font-medium'>
        {order.customerName}
        </TableCell>
        <TableCell className='font-medium'>
            {(order.total/100).toLocaleString('pt-BR', {
                style:'currency',
                currency:'BRL',
            })}
        </TableCell>
        <TableCell>
            { order.status == 'pending' &&(
                 <Button 
                    onClick={()=> approveOrderFn( {orderId: order.orderId})} 
                    variant='outline' 
                    size='xs'
                    disabled={isApprovingOrder}
                >
                    <ArrowRight className='h-3 w-3 mr-2'/>
                    Aprovar
                 </Button>
            )}
            { order.status == 'processing' &&(
                <Button 
                    onClick={()=> dispatchOrderFn( {orderId: order.orderId})} 
                    variant='outline' 
                    size='xs'
                    disabled={isDispatchOrder}
                >
                    <ArrowRight className='h-3 w-3 mr-2'/>
                    Em entrega
                </Button>
            )}
            { order.status == 'delivering' &&(
                <Button 
                    onClick={()=> deliverOrderFn( {orderId: order.orderId})} 
                    variant='outline' 
                    size='xs'
                    disabled={isDeliveringOrder}
                >
                    <ArrowRight className='h-3 w-3 mr-2'/>
                    Emtregue
                </Button>
            )}
       
        </TableCell>
        <TableCell>
            <Button 
                disabled={
                    !['pending','processing'].includes(order.status)|| isCancelingOrder} 
                onClick={() => cancelOrderFn({orderId: order.orderId})}
                variant='ghost' 
                size='xs'
            >
                <X className='h-3 w-3 mr-2'/>
                Cancelar
            </Button>
        </TableCell>
    </TableRow>
    )    
}