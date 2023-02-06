import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import logo from '../Components/img/logoWeb2.png'
export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                    <img className='md:block hidden' src={logo} alt="logo website" />
                    <img className='md:hidden block mt-10' src={logo} alt="logo website" width={'150px'} />
                </Link>
            </div>
            <h1 className='my-3 md:text-2xl font-bold uppercase'>Aplikasi Pembayaran Spp</h1>
            <p>solusi cerdas dalam transaksi</p>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
