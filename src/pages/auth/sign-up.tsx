import {Helmet} from 'react-helmet-async'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {toast} from 'sonner'
import {Link, useNavigate} from 'react-router-dom'

import {Button} from '@/components/ui/button'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'  
import { useMutation } from '@tanstack/react-query'
import { registerRestaurant } from '@/api/resgister-restaurant'

const signUpForm = z.object({
    restaurantName: z.string(),
    manegerName:z.string(),
    phone: z.string(),
    email:z.string().email(),
})


type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
    const navigate = useNavigate()

    const { 
        register, 
        handleSubmit,
        formState:{isSubmitting},
    } = useForm<SignUpForm>()

    const {mutateAsync: registerRestaurantFn} = useMutation({
        mutationFn: registerRestaurant,
    })

    async function handleSignUp(data: SignUpForm) {
        try {

            await registerRestaurantFn({
                restaurantName: data.restaurantName,
                managerName: data.manegerName,
                email: data.email,
                phone: data.phone ,
            })       

            toast.success('Restaurante Cadastro com sucesso .',{
                action: {
                    label: 'Login',
                    onClick: () => navigate(`/sign-in?email=${data.email}`),
                },
            })
            
        } catch (error) {
            toast.error('Erro ao cadastrar restaurante.')            
        }
    }

    return (
        <>
            <Helmet title="Cadastro"/>
            <div className='p-8'>
                <Button 
                    variant="ghost" 
                    asChild 
                    className=' absolute right-4 top-8'>
                        <Link to='/sign-in'>
                            Fazer login
                        </Link>
                </Button>
                <div className='flex w-[350px] flex-col justify-center gap-6'>
                    <div className='flex flex-col gap-2 text-center'>
                        <h1 className='text-2xl font-semibold tracking-tight'>
                            Criar conta grátis
                        </h1>
                        <p className='text-sm text-muted-foreground'>
                            Seja um parceiro e comece suas vendas!.
                        </p>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit(handleSignUp)} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
                        <Input 
                            id="restaurantName"
                            type="text" 
                            {...register("restaurantName")} 
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="manegerName">Seu nome</Label>
                        <Input 
                            type="text" 
                            id='manegerName'
                            {...register('manegerName')} 
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="email">Seu melhor e-mail</Label>
                        <Input 
                            id='email'
                            type="email" 
                            {...register('email')} 
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="phone">Seu celular</Label>
                        <Input 
                            id='phone'
                            type="tel" 
                            {...register('phone')}
                         />
                    </div>
                    <Button disabled={isSubmitting} className='w-full' type='submit' >
                        Finalizar Cadastro
                    </Button>
                    <p className='px-6 text-center text-sm leading-relaxed text-muted-foreground'>
                        Ao continuar, você concorda com nossos <a className='underline underline-offset-4'> termos de serviços</a> e {' '} <a className='underline underline-offset-4'>polítcas de privacidade</a>.
                    </p>
                </form>
            </div>
        </>
    )
}