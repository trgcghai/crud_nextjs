'use client'
import React from "react";
import { useState } from "react";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
    Typography,
} from "@material-tailwind/react";
import { toast } from 'react-toastify';
import { mutate } from "swr"

interface IProps {
    showModal: boolean
    setShowModal: (value: boolean) => void
}

export default function ModalAddNew(props: IProps) {

    const [title, setTitle] = useState<string>('')
    const [author, setAuthor] = useState<string>('')
    const [content, setContent] = useState<string>('')

    const { showModal, setShowModal } = props

    const isValidInput = (input: string): boolean => {
        return !(!input || input.trim().length === 0)
    }

    const handleAddBlog = (): void => {

        if (isValidInput(title) && isValidInput(author) && isValidInput(content)) {
            setTitle(title.trim())
            setAuthor(author.trim())
            setContent(content.trim())

            fetch('http://localhost:8000/blogs', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ title, author, content })
            })
                .then(res => {
                    toast.success('Add new blog successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        progress: undefined,
                        theme: "light",
                    });

                    mutate('http://localhost:8000/blogs')
                })
                .catch(err => {
                    toast.error('Add new blog failed', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        progress: undefined,
                        theme: "light",
                    });
                })

            handleCloseModal()
            return
        }

        toast.error('Add new blog failed', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "light",
        });

        handleCloseModal()
    }

    const handleCloseModal = () => {
        setTitle("")
        setAuthor("")
        setContent("")
        setShowModal(false)
    }

    return (
        <>
            <Dialog open={showModal} size="xs" handler={() => setShowModal(true)} placeholder={undefined} data-dialog-backdrop-close="false">
                <div className="flex items-center justify-end pt-4 cursor-pointer">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="mr-3 h-5 w-5"
                            onClick={handleCloseModal}
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
                <DialogBody placeholder={undefined}>
                    <div className="grid gap-6">
                        <Typography className="-mb-1" color="blue-gray" variant="h6" placeholder={undefined}>
                            Add new blog
                        </Typography>
                        <Input label="Title" crossOrigin={undefined} value={title} onChange={(e) => setTitle(e.target.value)} />
                        <Input label="Author" crossOrigin={undefined} value={author} onChange={(e) => setAuthor(e.target.value)} />
                        <Textarea label="Content" value={content} onChange={(e) => setContent(e.target.value)} />
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2" placeholder={undefined}>
                    <Button variant="text" color="gray" onClick={handleCloseModal} placeholder={undefined}>
                        Cancel
                    </Button>
                    <Button variant="gradient" color="gray" onClick={handleAddBlog} placeholder={undefined}>
                        Add Blog
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}