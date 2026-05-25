import Link from "next/link";

export default function NextPage() {
    return (    
        <main className="h-screen flex flex-col md:px-5 px-2 gap-10 items-center justify-start font-sans m-auto md:py-10 py-5 w-full text-secondary-text relative">
            <div className="flex flex-col items-center gap-5 py-20 relative z-20">
                <h2 className="lg:text-9xl text-5xl font-bold text-primary-text">404</h2>
                <p className="text-xl text-secondary-text">Could not find requested resource</p>
                <Link href="/" className="text-primary">Return Home</Link>
            </div>
        </main>
    )
}