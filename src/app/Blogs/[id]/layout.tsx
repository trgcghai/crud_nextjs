import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'View detail blog',
    description: 'detail blog',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}
