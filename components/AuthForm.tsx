"use client"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { toast } from "sonner"


const authFormSchema = (type :FormType) =>{
  return z.object({
    name: type ==='sign-up' ? z.string().min(3):z.string().optional(),
    email : z.string().email(),
    password: z.string().min(3),
  })
}

const AuthForm = ({type}: {type:FormType}) => {
  const formSchema = authFormSchema(type);

   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    try {
      if(type === 'sign-up'){
        console.log('SIGN UP', values);
      }
      else{
        console.log('SIGN IN' , values);
      }
    } catch (error) {
      
      console.log(error);
      toast.error(`There was an error :${error}`)
    }
  }
  const isSignIn = type === 'sign-in';
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className=" flex flex-col gap-6 card py-14 px-10">
        {/* logo and text */}
 <div className="flex flex-row gap-2 justify-center">
   <Image src="/logo.svg" alt="logo" height={32} width={32}/>
   <h2 className="text-primary-100  ">PrepHub</h2>

 </div>
 <h3 className="self-center"> practice job interview with AI</h3>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)

    } className="w-full space-y-6 mt-4 flex flex-col ">
      {!isSignIn && <p>Name</p>}
      <p>Email</p>
      <p>Password</p>
      
      <Button className="self-center w-[calc(100%-20px)] bg-gray-100 hover:bg-gray-200  opacity-90" type="submit">{isSignIn ? 'Sign in' : 'Create an Account'}</Button>
    </form>
  </Form>
  <p className="text-center">
    {isSignIn?'No account yet?' : 'Have an account already?'}
    <Link href={!isSignIn? '/sign-in': '/sign-up'}
    className="font-bold text-ser-primary ml-1"
    >
      {isSignIn?'Sign up': 'Sign in'}
    </Link>

  </p>
        </div>
  </div>
  )
}

export default AuthForm
