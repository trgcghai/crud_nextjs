'use client'
import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from '@mui/material';
import { toast } from 'react-toastify';
import { mutate } from "swr"
import ModalAddNew from "./ModalAddNew"
import ModalUpdate from './ModalUpdate';
import Link from 'next/link';

interface IProps {
    blogs: IBlog[] | undefined
}

export default function BasicTable(props: IProps) {
    const { blogs } = props

    const [curBlog, setCurBlog] = useState<IBlog | null>(null)
    const [showModalAddNew, setShowModalAddNew] = useState<boolean>(false)
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false)

    const handleDeleteBlog = (id: number): void => {
        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                toast.success('Delete blog successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: "light",
                })

                mutate('http://localhost:8000/blogs')
            })
            .catch(err => {
                toast.error('Delete blog failed', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: "light",
                });
            })
    }

    return (
        <>
            <div>
                <Button size='large' className='float-right' onClick={() => { setShowModalAddNew(true) }}>Add new</Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">No</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Author</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {blogs && blogs.map((item) => {
                            return (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" component="th" scope="row">
                                        {item.id}
                                    </TableCell>
                                    <TableCell align="center">{item.title}</TableCell>
                                    <TableCell align="center">{item.author}</TableCell>
                                    <TableCell align="center">
                                        <Button type="button">
                                            <Link href={`/Blogs/${item.id}`}>View</Link>
                                        </Button>
                                        <Button onClick={() => { setCurBlog(item); setShowModalUpdate(true) }}>Update</Button>
                                        <Button onClick={() => handleDeleteBlog(item.id)} >Delete</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer >

            <ModalAddNew showModal={showModalAddNew} setShowModal={setShowModalAddNew} />
            <ModalUpdate showModal={showModalUpdate} setShowModal={setShowModalUpdate} curBlog={curBlog} setCurBlog={setCurBlog} />
        </>
    );
}
