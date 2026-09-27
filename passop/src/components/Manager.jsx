import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosCopy } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

// import 'react-toastify/dist/ReactTostify.css';


const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])


    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        let passwordArray;
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }

    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icon/eyecut.png")) {
            ref.current.src = "icon/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icon/eyecut.png"
            passwordRef.current.type = "text"
        }
    }

    const savePassword = () => {
        if(form.site.length >3 && form.username.length >3 && form.password.length >3 ){
        setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
        console.log([...passwordArray, form])
        setform({ site: "", username: "", password: "" })

         toast('Password save succesfuly', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        }
        else{
            toast('Error: Password not save');
        }

    }
    const deletePassword = (id) => {
        console.log("Deleting password with id", id)
        let c =confirm("Do you really want to delete this password?")
        if(c){
            
            setPasswordArray(passwordArray.filter(item=>item.id!==id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
              toast('Password deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        }
       

    }
    const editPassword = (id) => {
          toast('Edit Succesful', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        console.log("Editing password with id", id)
        setform(passwordArray.filter(i=>i.id===id)[0])
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
       
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div class="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

{/* p-3 md:mycontainer */}
            <div className="p-3 md:mycontainer  min-h-[80vh]"> 
                <h1 className='font-bold text-4xl text-center'>
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your password Manager</p>
                <div className='text-black flex flex-col p-4 gap-8 items-center'>

                    <input value={form.site}  onChange={handleChange} placeholder='Enter Website URL' id='site' name='site' type="text" className='rounded-full border bg-white border-green-500 w-full p-4 py-1' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8 ">

                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' id='username' name='username' type="text" className='rounded-full border bg-white border-green-500 w-full  p-4 py-1' />
                        <div className='relative'>

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' id='password' name='password' type="password" className='rounded-full border bg-white border-green-500 w-full p-4 py-1' />
                            <span className='absolute right-[1px] top-[2px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={30} src="/icon/eye.png" alt="" srcset="" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className="flex justify-center w-fit items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-6 py-2 text-black border border-green-900">
                        <IoIosAddCircleOutline className="w-6 h-6" />
                        <span className='font-bold'>Save </span>
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Password</h2>
                    {passwordArray.length === 0 && <div>NO passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Sites</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100 '>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className=' text-center py-2 border border-white'>
                                        <div className='flex justify-center items-center gap-3'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <IoIosCopy className='cursor-pointer' onClick={() => { copyText(item.site) }} />
                                        </div>
                                    </td>
                                    <td className=' text-center  py-2 border border-white'>
                                        <div className='flex justify-center items-center gap-3'>
                                            <span>{item.username}</span>
                                            <IoIosCopy className='cursor-pointer' onClick={() => { copyText(item.username) }} />
                                        </div>
                                    </td>
                                    <td className=' justify-center items-center text-center  py-2 border border-white'>
                                        <div className='flex justify-center items-center gap-3'>
                                            <span>{item.password}</span>
                                            <IoIosCopy className='cursor-pointer' onClick={() => { copyText(item.password) }} />
                                        </div>
                                    </td>
                                    <td className='   py-2 border border-white'>
                                       <div className='flex justify-center items-center gap-3'>
                                        <span className='cursor-pointer mx-5'>
                                        <CiEdit  onClick={() => {editPassword(item.id) }} />
                                        </span>
                                        <span className='cursor-pointer'>
                                        <MdDelete  onClick={() => {deletePassword(item.id) }} />
                                        </span>
</div>

                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>
            </div>

        </>
    )
}

export default Manager
