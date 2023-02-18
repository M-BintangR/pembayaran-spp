import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import Loading from './Loading';

const Paginate = ({ meta, short }) => {
    const [loading, setLoading] = useState(false);
    const prev = meta.links[0].url + `&short=${short}`;
    const next = meta.links[meta.links.length - 1].url + `&short=${short}`;
    const current = meta.current_page;

    const handleClick = async (url) => {
        setLoading(true);
        await inertia.visit(url + `&short=${short}`);
        setLoading(false);
    };

    return (
        <div className='flex justify-end text-purple-700 font-bold md:my-10 mb-12'>
            <div className="flex bg-white rounded-lg">
                <Link
                    href={prev}
                    as={'button'}
                    disabled={current === 1}
                    onClick={() => handleClick(prev)}
                    className={`border-2 border-gray-400 duration-300 hover:border-purple-400 hover:bg-purple-700 hover:text-white py-1 px-2 rounded-l-md ${current === 1 ? '' : 'bg-purple-700 text-white'}`}
                >
                    <MdKeyboardArrowLeft />
                </Link>

                <button className='border-2 mx-1 py-1 px-3 border-gray-400 duration-300 hover:border-purple-400 rounded-sm hover:bg-purple-700 hover:text-white'>{current}</button>

                <Link
                    href={next}
                    as={'button'}
                    disabled={meta.next_page_url == null ? true : false}
                    onClick={() => handleClick(next)}
                    className={`border-2 border-gray-400 duration-300 hover:border-purple-400 py-1 px-2 rounded-r-md hover:bg-purple-700 hover:text-white ${next ? '' : 'bg-purple-700 text-white'}`}
                >
                    <MdKeyboardArrowRight />
                </Link>
            </div>
            <Loading loading={loading} />
        </div>
    );
};

export default Paginate;
