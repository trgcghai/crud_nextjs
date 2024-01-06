import Link from 'next/link'

const Header = (): any => {
    return (
        <header className='h-[50px] w-full bg-gray-400 flex items-start'>
            <div className='h-full flex items-center gap-2 mx-auto'>
                <Link className='w-[80px] h-full hover:bg-gray-600 text leading-[50px] text-center' href={'/'}>Home</Link>
                <Link className='w-[80px] h-full hover:bg-gray-600 text leading-[50px] text-center' href={'/Blogs'}>BLogs</Link>
                <Link className='w-[80px] h-full hover:bg-gray-600 text leading-[50px] text-center' href={'/About'}>About us</Link>
            </div>
        </header>
    )
}

export default Header