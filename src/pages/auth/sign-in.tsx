import {Helmet} from 'react-helmet-async'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {toast} from 'sonner'
import {Link, useSearchParams} from 'react-router-dom'

import {Button} from '@/components/ui/button'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'  
import { useMutation } from '@tanstack/react-query'
import { signIn } from '@/api/sign-in'

const signInForm = z.object({
    email:z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {

    const [searchParams] = useSearchParams()

    const { 
        register, 
        handleSubmit, 
        formState:{isSubmitting}} = useForm<SignInForm>({
            defaultValues: {
                email: searchParams.get('email')?? '',
            }
        })
    
    const {mutateAsync:authenticate} = useMutation({
        mutationFn: signIn,
    })

    async function handleSignIn(data:SignInForm) {
        try {
            await authenticate({email:data.email})
            toast.success('Enviamos um link de autenticação para o seu e-mail.')            
        } catch (error) {
            toast.error('Opa, houston tivemos um problema, consegue ver oque está ocorrendo?')            
        }
        
    }

    return (
        <>
            <Helmet title="Login"/>
            <div className='p-8'>
                <Button 
                variant="ghost" 
                asChild 
                className=' absolute right-4 top-8'>
                    <Link to='/sign-up'>
                        Novo estabelecimento
                    </Link>
                </Button>
                <div className='flex w-[350px] flex-col justify-center gap-6'>
                    <div className='flex flex-col gap-2 text-center'>
                        <h1 className='text-2xl font-semibold tracking-tight'>
                            Acessar o painel
                        </h1>
                        <p className='text-sm text-nuted-foreground'>
                            Acompanhe suas vendas pelo painel do parceiro!
                        </p>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit(handleSignIn)} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor="email">Seu melhor e-mail</Label>
                        <Input type="email" id='email'{...register('email')} />
                    </div>
                    <Button disabled={isSubmitting} className='w-full' type='submit' >
                        Acessar painel
                    </Button>
                </form>
            </div>
        </>
    )
}