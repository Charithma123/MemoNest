import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { BiPlus, BiPulse } from 'react-icons/bi';

function Nav() {
    return (
        <div className='w-[90%] mx-auto h-[14vh] flex items-center justify-between'>
            <Link href="/">
                <Image src="/images/logo.jpg" alt="Logo" height={90} width={90} />
            </Link>

            <Link href={`/add-note`}>


                <div className='flex items-center cursor-pointer space-x-2 border-[2px] hover:bg-gray-200 transition-all
      duration-200 rounded-lg px-4 py-2'>

                    <div className='sm:w-8 sm:h-8 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center flex-col'>

                        <BiPlus className='text-white sm:w-6 sm:h-6 w-4 h-4' />

                    </div>

                    <div className='sm:text-lg test-base fonr-bold uppercase'>
                        Add Note
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Nav;
