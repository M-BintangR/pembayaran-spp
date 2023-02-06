import React from 'react'
import background from '../Components/img/background.jpg';
import vektor from '../Components/img/vektor.svg';
import logo from '../Components/img/logoWeb2.png'
const Home = () => {
    return (
        <div>
            <div className='w-screen bg-purple-700 text-white p-2 py-3 fixed shadow-xl z-50 '>
                <div className="md:text-xl text-xs font-semibold flex justify-between md:mx-3 mx-2 relative md:top-0 -top-1 ">
                    <div className='inline-block'>
                        <img className='inline-block mr-3 float-left md:w-[50px] w-[40px] relative md:top-2 top-2' src={logo} alt="logo website" />
                        <h1 className='inline-block md:text-base text-xs relative md:top-0 top-2'>Aplikasi Transaksi Spp</h1>
                        <p className={`md:text-xs md:block hidden`}>solusi cerdas dalam transaksi</p>
                    </div>
                    <button className='bg-white md:py-2 md:px-5 py-2 md:mt-0 mt-1 px-3 md:text-base text-sm md:rounded-md rounded-md text-purple-700 '>Masuk</button>
                </div>
                {/* child */}
            </div>
            <div style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                height: '100vh',
            }}>
                <div className='bg-purpleT px-3 grid md:grid-cols-2 grid-cols-1' style={{
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
                        <button className='bg-white text-purple-700 py-1 px-3 rounded-md text-lg font-semibold border border-gray-200 md:w-24 w-full mt-1'>Masuk</button>
                    </div>
                    <div className='md:block hidden'>
                        <img className='w-[500px] mt-24 ml-4' src={vektor} alt="gambar" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
