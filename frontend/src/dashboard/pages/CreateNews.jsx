import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdCloudUpload, MdImage, MdClose } from "react-icons/md";
import JoditEditor from 'jodit-react'
import Galler from '../components/Galler';
import { base_url } from '../../config/config'
import axios from 'axios'
import storeContext from '../../context/storeContext'
import toast from 'react-hot-toast'

const CreateNews = () => {
    const { store } = useContext(storeContext)
    const [show, setShow] = useState(false)
    const editor = useRef(null)

    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [img, setImg] = useState('')
    const [description, setDescription] = useState('')
    const [loader, setLoader] = useState(false)
    const [images, setImages] = useState([])
    const [imagesLoader, setImagesLoader] = useState(false)

    const imageHandle = (e) => {
        const { files } = e.target
        if (files.length > 0) {
            setImg(URL.createObjectURL(files[0]))
            setImage(files[0])
        }
    }

    const added = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('image', image)

        try {
            setLoader(true)
            const { data } = await axios.post(`${base_url}/api/news/add`, formData, {
                headers: {
                    "Authorization": `Bearer ${store.token}`
                }
            })
            setLoader(false)
            toast.success(data.message)
            setTitle('')
            setDescription('')
            setImage('')
            setImg('')
        } catch (error) {
            setLoader(false)
            toast.error(error.response?.data?.message || 'Something went wrong')
        }
    }

    const get_images = async () => {
        try {
            const { data } = await axios.get(`${base_url}/api/images`, {
                headers: {
                    "Authorization": `Bearer ${store.token}`
                }
            })
            setImages(data.images)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        get_images()
    }, [])

    const imageHandler = async (e) => {
        const files = e.target.files
        try {
            const formData = new FormData()
            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i])
            }

            setImagesLoader(true)
            const { data } = await axios.post(`${base_url}/api/images/add`, formData, {
                headers: {
                    "Authorization": `Bearer ${store.token}`
                }
            })
            setImagesLoader(false)
            setImages([...images, data.images])
            toast.success(data.message)
        } catch (error) {
            console.log(error)
            setImagesLoader(false)
            toast.error(error.response?.data?.message || 'Image upload failed')
        }
    }

    // Notice: The 'buttons' array is removed so Jodit loads its full default toolbar!
    const config = {
        readonly: false,
        placeholder: 'Start writing...',
        height: 400,
        defaultActionOnPaste: 'insert_as_html',
    };

    return (
        <div className='bg-white rounded-lg shadow-sm border border-gray-100'>
            <div className='flex justify-between items-center p-5 border-b border-gray-100'>
                <h2 className='text-xl font-semibold text-gray-800'>Create New Article</h2>
                <Link className='px-4 py-2 bg-purple-600 rounded-md text-white font-medium hover:bg-purple-700 transition-colors duration-200 shadow-sm' to='/dashboard/news'>
                    View All News
                </Link>
            </div>

            <div className='p-6'>
                <form onSubmit={added}>
                    {/* Title Input */}
                    <div className='flex flex-col gap-y-2 mb-6'>
                        <label className='text-sm font-semibold text-gray-700' htmlFor="title">Article Title</label>
                        <input 
                            required 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            type="text" 
                            placeholder='Enter a catchy headline...' 
                            name='title' 
                            className='px-4 py-3 rounded-md outline-none border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200' 
                            id='title' 
                        />
                    </div>

                    {/* Image Upload Area with Close Icon */}
                    <div className='mb-8'>
                        <label className='text-sm font-semibold text-gray-700 mb-2 block'>Featured Image</label>
                        <div className='relative'>
                            <label 
                                htmlFor="img" 
                                className={`w-full h-[280px] flex rounded-lg text-gray-500 gap-2 justify-center items-center cursor-pointer border-2 border-dashed border-gray-300 hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 bg-gray-50 overflow-hidden relative`}
                            >
                                {img ? (
                                    <>
                                        <img src={img} className='w-full h-full object-cover' alt='preview' />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault(); 
                                                e.stopPropagation(); 
                                                setImg('');
                                                setImage('');
                                            }}
                                            className='absolute top-3 right-3 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-lg z-10'
                                            title="Remove image"
                                        >
                                            <MdClose className='text-xl' />
                                        </button>
                                    </>
                                ) : (
                                    <div className='flex justify-center items-center flex-col gap-y-3'>
                                        <span className='text-4xl text-purple-400'><MdImage /></span>
                                        <span className='text-sm font-medium'>Click to browse or drag image here</span>
                                    </div>
                                )}
                            </label>
                            <input required={!img} onChange={imageHandle} className='hidden' type="file" id='img' accept="image/*" />
                        </div>
                    </div>

                    {/* Description / Editor Area */}
                    <div className='flex flex-col gap-y-2 mb-8'>
                        <div className='flex justify-between items-center'>
                            <label className='text-sm font-semibold text-gray-700'>Article Content</label>
                            <button 
                                type="button"
                                onClick={() => setShow(true)}
                                className='flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800 transition-colors'
                            >
                                <MdCloudUpload className='text-lg' /> <span>Gallery</span>
                            </button>
                        </div>
                        <div className='border border-gray-300 rounded-md overflow-hidden focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-200 transition-all duration-200'>
                            <JoditEditor
                                ref={editor}
                                value={description}
                                tabIndex={1}
                                onBlur={value => setDescription(value)}
                                onChange={() => { }}
                                config={config}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className='mt-4'>
                        <button 
                            disabled={loader} 
                            className='px-6 py-3 bg-purple-600 rounded-md text-white font-medium hover:bg-purple-700 transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto' 
                        > 
                            {loader ? 'Publishing...' : 'Publish Article'}
                        </button>
                    </div>
                </form>
            </div>
            
            <input onChange={imageHandler} type="file" multiple id='images' className='hidden' accept="image/*" />
            
           {show && <Galler setShow={setShow} images={images} setImages={setImages} />}
        </div>
    )
}

export default CreateNews