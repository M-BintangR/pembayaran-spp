import NavbarSiswa from '@/Layouts/NavbarSiswa';
import { Link } from '@inertiajs/react';
import React from 'react'
import background from '../Components/img/background.jpg';
import vektor from '../Components/img/vektor.svg';

const Home = () => {
    return (
        <NavbarSiswa>
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
                        <Link
                            href={route('login')}
                            className='bg-white text-purple-700 py-1 px-3 rounded-md text-lg font-semibold border border-gray-200 md:w-24 w-full mt-1'
                        >Masuk
                        </Link>
                    </div>
                    <div className='md:block hidden'>
                        <img className='w-[500px] mt-24 ml-4' src={vektor} alt="gambar" />
                    </div>
                </div>
            </div>
        </NavbarSiswa>
    )
}

export default Home
