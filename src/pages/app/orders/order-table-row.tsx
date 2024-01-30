import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Locate, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "./order-status";

import {formatDistanceToNow} from 'date-fns'
import {ptBR} from 'date-fns/locale'
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { cancelOrder } from "@/api/cancel-order";

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
    const {mutateAsync: cancelOrderFn} = useMutation({
        mutationFn: cancelOrder,

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
        <Button variant='outline' size='xs'>
            <ArrowRight className='h-3 w-3 mr-2'/>
                Aprovar
            </Button>
        </TableCell>
        <TableCell>
            <Button 
                disabled={!['pending','processing'].includes(order.status)} 
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