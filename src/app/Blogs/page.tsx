'use client'
import useSWR from 'swr'
import BasicTable from "../components/BasicTable";
import { ToastContainer } from 'react-toastify';

const Page = () => {

    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data }: { data?: IBlog[] } = useSWR('http://localhost:8000/blogs', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    return (<>
        <div className="h-auto w-4/5 mx-auto mt-8">
            <div className='mb-4 flex justify-between items-center'>
                <span className='text-2xl' >Blog managements</span>
            </div>
            <BasicTable blogs={data?.sort((a: any, b: any) => b.id - a.id)} ></BasicTable>
            <ToastContainer />
        </div >
    </>)
}

export default Page