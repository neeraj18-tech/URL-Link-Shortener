import React from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import api from '../api/api'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [loader, setLoader] = React.useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    mode: "onTouched"
  });

  const registerHandler = async (data) => {
    setLoader(true)
    try {
      const { data: response } = await api.post("/api/auth/public/register", data)
      reset()
      navigate("/login")
      toast.success("Registration successful")
    } catch (error) {
      console.log(error)
      toast.error("Registration failed")
    } finally {
      setLoader(false)
    }
  };

  return (
    <div className='min-h-[calc(100vh-64px)] flex justify-center items-center'>
      <form onSubmit={handleSubmit(registerHandler)} className='sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md'>
        <h1 className='text-center font-serif text-btnColor font-bold lg:text-3xl text-2xl'>Register Here</h1>
        <hr className='mt-2 mb-5 text-black' />
        <div className="flex flex-col gap-3">
          <TextField label="Username" required id="username" type="text" message="Username is required" placeholder="Enter your Username" register={register} errors={errors} />
          <TextField label="Email" required id="email" type="email" message="Email is required" placeholder="Enter your Email" register={register} errors={errors} />
          <TextField label="Password" required id="password" type="password" message="Password is required" placeholder="Enter your Password" register={register} errors={errors} />
        </div>
        <button type="submit" disabled={loader} className=" w-full mt-5 py-2.5 rounded-md bg-btnColor text-white font-medium transition-all duration-300 ease-out hover:-translate-y-[1px] hover:shadow-lg hover:shadow-btnColor/30 active:translate-y-0 active:shadow-md focus:outline-none focus:ring-2 focus:ring-btnColor/40 " >
          {loader ? "Loading..." : "Register"}
        </button>
        <p className='text-center text-sm text-slate-700 mt-6'>
          Already have an Account? <Link className='font-semibold underline hover:text-black' to="/login">
            <span className='text-btnColor hover:underline cursor-pointer'> Login</span>
          </Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage
