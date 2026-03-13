import React, { useContext } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import copy from 'copy-text-to-clipboard'
import toast from 'react-hot-toast';
import axios from 'axios';
import { base_url } from '../../config/config';
import storeContext from '../../context/storeContext';

const Galler = ({ setShow, images, setImages }) => {
    // Bring in store for the API token
    const { store } = useContext(storeContext);

    const copy_url = (url)=>{
        copy(url)
        toast.success('Copy success')
    }

    // Function to handle image deletion
    const deleteImage = async (e, id) => {
        // Stop the click from triggering the "copy_url" function underneath it
        e.stopPropagation(); 

        // 1. Optimistic UI Update: Instantly remove it from the screen
        if(setImages) {
            setImages(prev => prev.filter(img => img._id !== id && img.id !== id));
        }

        try {
            // 2. Call backend to permanently delete
            // (Make sure you create this DELETE route on your backend!)
            const { data } = await axios.delete(`${base_url}/api/images/delete/${id}`, {
                headers: {
                    "Authorization": `Bearer ${store.token}`
                }
            });
            toast.success(data.message || 'Image deleted successfully');
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Failed to delete image from server');
        }
    }

    return (
        <div className='w-screen h-screen fixed left-0 top-0 z-[9999]'>
            <div className='w-full h-full relative'>
                <div className='bg-gray-400 opacity-80 w-full h-full absolute top-0 left-0 z-[998]'></div>
                <div className='absolute bg-white w-[50%] p-3 rounded-sm h-[85vh] overflow-y-auto left-[50%] top-[50%] z-[999] -translate-x-[50%] -translate-y-[50%]'>
                    <div className='pb-3 flex justify-between items-center w-full'>
                        <h2 className='text-lg font-semibold text-gray-800'>Gallery</h2>
                        <div onClick={() => setShow(false)} className='text-xl cursor-pointer hover:text-red-500 transition-colors'>
                            <AiOutlineClose />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="images" className={`w-full h-[180px] flex rounded text-[#404040] gap-2 justify-center items-center cursor-pointer border-2 border-dashed hover:border-purple-500 hover:bg-purple-50 transition-all`}>
                            <div className='flex justify-center items-center flex-col gap-y-2'>
                                <span className='text-3xl text-purple-500'><MdCloudUpload /></span>
                                <span className='font-medium'>Select Image</span>
                            </div>
                        </label>
                    </div>
                    
                    <div className='grid grid-cols-4 gap-2 mt-4'>
                        {
                            images.length > 0 && images.map((img, i) => (
                                <div 
                                    className='relative cursor-pointer group border border-gray-200 rounded-md overflow-hidden bg-gray-50' 
                                    onClick={() => copy_url(img.url)} 
                                    key={i}  
                                >
                                    <img src={img.url} alt="gallery" className='w-full h-[100px] object-cover' />
                                    
                                    {/* Delete Button - Shows on hover */}
                                    <button
                                        onClick={(e) => deleteImage(e, img._id || img.id)}
                                        className='absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md hover:bg-red-600 z-10'
                                        title="Delete image"
                                    >
                                        <MdDelete className='text-lg' />
                                    </button>

                                    {/* Helpful hover text to show user they can click to copy */}
                                    <div className='absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-[10px] py-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                                        Click to copy URL
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Galler