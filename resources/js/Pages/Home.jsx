import NavbarSiswa from '@/Layouts/NavbarSiswa';
import React, { useState } from 'react'
import background from '../Components/img/background.jpg';
import vektor from '../Components/img/vektor.svg';
import { AiOutlineClose } from 'react-icons/ai';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'


const Home = () => {
    const [isModal, setIsModal] = useState(false);


    const { data, setData, post, processing, errors } = useForm({
        nisn: '',
        nis: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    }

    const clearData = () => {
        setData({ nisn: '', nis: '' });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // post(route('siswa.login'), {
        //     onSuccess: () => {
        //         setIsModal(false);
        //         clearData();
        //         swal({
        //             title: "Berhasil Login!",
        //             icon: "success",
        //             button: "Ok",
        //         });
        //     }
        // })
    }

    return (
        <NavbarSiswa isModal={isModal} setIsModal={setIsModal}>
            <div className='absolute bottom-0 left-0 right-0 top-0' style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
            }}>
                <div className='bg-purpleT absolute bottom-0 top-0 left-0 right-0 px-3 grid md:grid-cols-2 grid-cols-1' style={{
                    height: '100vh',
                }}>
                    <div className='md:px-10 px-3 md:mt-5 mt-4'>
                        <h1 className='text-white pt-20 text-3xl uppercase font-extrabold'>Aplikasi Transaksi Spp</h1>
                        <p className='lowercase text-white text-lg font-semibold'>solusi cerdas dalam transaksi</p>

                        <div className='py-3 text-white flex flex-col md:gap-y-3
                        '>
                            <p>"Aplikasi layanan transaksi SPP kami memberikan solusi terbaik bagi Anda yang ingin membayar SPP dengan mudah dan praktis. Bayar SPP tanpa harus mengantri atau membuang waktu Anda dengan melalui website kami. Cukup dengan beberapa klik, Anda dapat menyelesaikan transaksi dengan cepat dan aman.</p>
                            <p>Dengan aplikasi layanan transaksi SPP kami, Anda dapat mengetahui pembaruan transaksi secara real-time. Kami memberikan informasi yang akurat dan terbaru sehingga Anda tidak perlu khawatir lagi tentang transaksi yang tertunda atau salah. Anda juga dapat mengakses histori pembayaran kapan saja melalui website kami.</p>
                            <p>Kami menjamin keamanan data dan transaksi Anda dengan menggunakan teknologi keamanan terkini. Kami menjamin bahwa informasi pribadi Anda aman dan terlindungi. Selamat menggunakan layanan kami dan nikmati kemudahan dan kecepatan dalam membayar SPP Anda."</p>
                        </div>
                        <button
                            onClick={() => setIsModal(!isModal)}
                            className='bg-white text-purple-700 py-1 px-3 rounded-md text-lg font-semibold border border-gray-200 md:w-24 w-full mt-1'
                        >Masuk
                        </button>
                    </div>
                    <div className='md:block hidden'>
                        <img className='w-[500px] mt-24 ml-4' src={vektor} alt="gambar" />
                    </div>
                </div>
            </div>

            {isModal ? (
                <div className={`fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm shadow-2xl flex justify-center md:items-center items-end`}>
                    <div className={`duration-3000 bg-white z-30 shadow-xl p-5 w-full  md:rounded-md rounded-t-lg md:w-[570px]`}>
                        <div className="md:text-xl text-lg md:pb-3 pb-5">
                            <h1>
                                Login Siswa
                                <div
                                    onClick={() => setIsModal(false)}
                                    className='duration-300 float-right rounded-md hover:bg-slate-200 hover:text-red-600 box-border p-1'>
                                    <AiOutlineClose />
                                </div>
                            </h1>
                        </div>
                        <form onSubmit={onSubmit}>
                            <div className='my-2'>
                                <InputLabel forInput="nisn" value="NISN" />
                                <TextInput
                                    id="nisn"
                                    type="text"
                                    name="nisn"
                                    value={data.nisn}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                    placeholder={'0101010101'}
                                />
                                <InputError message={errors.nisn} className="mt-2" />
                            </div>
                            <div className='my-2'>
                                <InputLabel forInput="nis" value="NIS" />
                                <TextInput
                                    id="nis"
                                    type="text"
                                    name="nis"
                                    value={data.nis}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                    placeholder={'202-001'}
                                />
                                <InputError message={errors.nisn} className="mt-2" />
                            </div>
                            <button
                                type='submit'
                                className={`duration-300 bg-purple-700 hover:bg-purple-500 text-white py-2 rounded-md px-3 md:w-1/4 w-full mt-5 ${processing && 'opacity-25'
                                    } `}
                            >
                                Masuk
                            </button>
                        </form>
                    </div>
                </div>
            ) : null}
        </NavbarSiswa>
    )
}

export default Home
