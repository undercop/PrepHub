"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
const formSchema = z.object({
    username: z.string().min(2).max(50),
})


const AuthForm = () => {
   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className=" flex flex-col gap-6 card py-14 px-10">
 <div className="flex flex-row gap-2 justify-center">
   <Image src="/logo.svg" alt="logo" height={32} width={32}/>
   <h2 className="text-primary-100 ">PrepHub</h2>

 </div>
 <h3> practice job interview with AI</h3>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)

    } className="w-full space-y-6 mt-4 ">
      <p>Name</p>
      
      <Button type="submit">Submit</Button>
    </form>
  </Form>
        </div>
  </div>
  )
}

export default AuthForm
