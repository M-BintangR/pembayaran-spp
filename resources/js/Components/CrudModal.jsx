import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';

export const CrudModal = ({ children, isVisible, onClose, title }) => {
    const handleClose = () => {
        onClose();
    }
    return (
        <div>
            {isVisible ? (
                <div className={`duration-1000 fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center`}>
                    <div className={`duration-3000 bg-white z-30 shadow-xl p-5 md:w-[570px] w-full mx-2 rounded-md`}>
                        <div className="md:text-xl text-lg md:pb-3 pb-5">
                            <h1>{title}
                                <div
                                    onClick={handleClose}
                                    className='duration-300 float-right rounded-md hover:bg-slate-200 hover:text-red-600 box-border p-1'>
                                    <AiOutlineClose />
                                </div>
                            </h1>
                        </div>
                        {children}
                    </div>
                </div>
            ) : null}
        </div>
    )
}

