
import { getManagerRestaurant } from "@/api/get-manager-restaurant";
import { Button } from "./ui/button";
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle 
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useQuery } from "@tanstack/react-query";

export function StoreProfileDialog(){
    
    const {data:managerRestaurant} = 
    useQuery({
        queryKey: ['manager-restaurant'],
        queryFn: getManagerRestaurant
    })
    
    console.log(managerRestaurant)
    return(
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Perfil da loja</DialogTitle>
                <DialogDescription>
                    Atualiza as informaçoes do seu estabelecimento visiveis ao seu cliente
                </DialogDescription>
            </DialogHeader>
            <form action="">
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-rigth" htmlFor="name">
                            Nome
                        </Label>
                        <Input className="col-span-3"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-rigth" htmlFor="description">
                            Descrição
                        </Label>
                        <Textarea className="col-span-3"/>
                    </div>
                </div>
            <DialogFooter>
                <Button type="button" variant='ghost'>Cancelar</Button>
                <Button type="submit" variant='success'>Salvar</Button>
            </DialogFooter>
            </form>
        </DialogContent>
    )
}