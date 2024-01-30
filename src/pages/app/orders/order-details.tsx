import { getOrderDetails } from "@/api/get-orders-details";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Console } from "console";
import { OrderStatus } from "./order-status";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export interface OrderDetailsProps {
    orderId: string
     open: boolean
}


export function OrderDetails({orderId, open}: OrderDetailsProps){
   
    const { data: order} = useQuery({
        queryKey: ['order', orderId],
        queryFn: () => getOrderDetails({orderId}),
        enabled: open,
    }) 
    
    if(!order){
        return null
    }

    return(
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Pedido: {orderId}</DialogTitle>
                <DialogDescription>Detalhes do Pedido</DialogDescription>
            </DialogHeader>
            {order&& (
                 <div className="space-y-6">
                 <Table>
                     <TableBody>
                         <TableRow>
                             <TableCell className="text-muted-foreground">Status</TableCell>
                             <TableCell className="flex justify-center">
                                <OrderStatus status={order.status}/>
                             </TableCell>
                         </TableRow>
                         <TableRow>
                             <TableCell className="text-muted-foreground">Cliente</TableCell>
                             <TableCell className="flex justify-center">
                                {order.customer.name}
                             </TableCell>
                         </TableRow>
                         <TableRow>
                             <TableCell className="text-muted-foreground">Contato</TableCell>
                             <TableCell className="flex justify-center">
                                 {order.customer.phone?? 'Não informado'}
                             </TableCell>
                         </TableRow>
                         <TableRow>
                             <TableCell className="text-muted-foreground">E-mail</TableCell>
                             <TableCell className="flex justify-center">
                                {order.customer.email}
                             </TableCell>
                         </TableRow>
                         <TableRow>
                             <TableCell className="text-muted-foreground">Realizado</TableCell>
                             <TableCell className="flex justify-center">
                                {formatDistanceToNow(order.createdAt,{
                                    locale: ptBR,
                                    addSuffix: true,
                                })}
                             </TableCell>
                         </TableRow>
                     </TableBody>
                 </Table>
 
                 <Table>
                     <TableHeader>
                         <TableRow>
                             <TableHead>Produtos</TableHead>
                             <TableHead className="text-right">Qtde.</TableHead>
                             <TableHead className="text-right">Preço</TableHead>
                             <TableHead className="text-right">Subtotal</TableHead>
                         </TableRow>
                     </TableHeader>
                     <TableBody>
                        { order.orderItems.map( item =>{
                            return(
                                <TableRow key={item.id}>
                                    <TableCell>{item.product.name}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{(item.priceInCents/100).toLocaleString('pt-BR', {style:'currency',currency:'BRL'})}</TableCell>
                                    <TableCell>{((item.priceInCents/100) * item.quantity).toLocaleString('pt-BR', {style:'currency',currency:'BRL'})}</TableCell>
                                </TableRow>
                            )
                        })}
                     </TableBody>
                     <TableFooter>
                         <TableRow>
                             <TableCell colSpan={3}>Total do pedido</TableCell>
                             <TableCell>
                                {(order.totalInCents/100).toLocaleString('pt-BR', {style:'currency',currency:'BRL'})}
                            </TableCell>
 
                         </TableRow>                        
                     </TableFooter>
                 </Table>
             </div>
            )}
        </DialogContent>
    )
}