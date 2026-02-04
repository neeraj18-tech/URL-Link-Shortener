import React from 'react'
import { useStoreContext } from '../contextApi/ContextApi'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import TextField from "../components/TextField"
import { IoIosSend } from "react-icons/io"
import { RxCross2 } from "react-icons/rx"
import Tooltip from '@mui/material/Tooltip'
import api from '../api/api'
import { toast } from "react-hot-toast"

const CreateNewShorten = ({refetch, setOpen}) => {
    const {token} = useStoreContext()
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            originalUrl: "",
        },
        mode: "onTouched"
    });

    const createShortUrlHandler = async (data) => {
        setLoading(true)
        try {
            const {data:res} = await api.post("/api/urls/shorten", data, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            })
            const shortenUrl = `${import.meta.env.VITE_REACT_SUBDOMAIN}/${res.shortUrl}`
            navigator.clipboard.writeText(shortenUrl).then(()=>{
                toast.success("Short URL copied to clipboard", {
                    duration: 3000,
                    position: "bottom-center",
                })
            })
            //await refetch();
            reset();
            setOpen(false);
        } catch (error) {
            toast.error("Failed to create short URL"),{
                duration: 3000,
                className: "mb-5",
                position: "bottom-center",
            }
        }finally{
            setLoading(false)
        }
    }
return (
    <div className="flex justify-center items-center">
        <form
            onSubmit={handleSubmit(createShortUrlHandler)}
            className="sm:w-[450px] w-[360px] relative shadow-custom pt-8 pb-6 sm:px-8 px-4 rounded-lg bg-white"
        >
            <h1 className="font-montserrat text-center font-bold sm:text-2xl text-[22px]">
                Create a New Short Url
            </h1>

            <hr className="mt-2 mb-5 text-slate-950" />

            <div className="mb-6">
                <TextField
                    label="Enter Original URL"
                    required
                    id="originalUrl"
                    placeholder="https://www.example.com"
                    type="url"
                    message="Please enter a valid URL"
                    register={register}
                    errors={errors}
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="mx-auto flex items-center justify-center gap-2 bg-custom-gradient text-white
                text-lg px-5 py-2.5 rounded-full hover:scale-105 transition-transform disabled:opacity-60"
            >
                {loading ? (
                    <>
                        <RxCross2 className="animate-spin" />
                        Creating...
                    </>
                ) : (
                    <>
                        <IoIosSend />
                        Create
                    </>
                )}
            </button>
            {!loading && (
                <Tooltip title="button">
                    <button disabled={loading}
                    onClick={() => setOpen(false)}
                    className="absolute top-2 right-2  text-white p-2 rounded-full transition-colors"
                        >
                            <RxCross2 className='text-slate-800 text-2xl'/>
                        </button>
                </Tooltip>
            )}
        </form>
    </div>
  )
}

export default CreateNewShorten