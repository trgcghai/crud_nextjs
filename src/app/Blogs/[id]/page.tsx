'use client'
import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import useSWR, { Fetcher } from 'swr'


const BlogDetails = ({ params }: { params: { id: string } }) => {

    const fetcher: Fetcher<IBlog, string> = (url: string) => fetch(url).then(res => res.json())
    const { data }: { data?: IBlog } = useSWR(`http://localhost:8000/blogs/${params.id}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    console.log(data)

    return (
        <Box sx={{ maxWidth: 1600, marginX: 'auto' }}>
            {!data || Object.keys(data).length === 0 ?
                <Typography variant="h5" component="div" className='mt-4'>
                    No data found about this blog
                </Typography>
                :
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {data.title}
                        </Typography>
                        <Typography sx={{ mb: 1.5, mt: 1 }} color="text.secondary">
                            Author: {data.author}
                        </Typography>
                        <Typography variant="body2">
                            {data.content}
                        </Typography>
                    </CardContent>
                </Card>
            }
        </Box>
    );
}

export default BlogDetails