import Link from "next/link";

export default function Navbar() {
    return (
        <nav className=" text-white p-4 max-w-[1200px] flex justify-between text-center mx-auto items-center">
            <h1 className="text-xl font-bold">DecentraSec Repo</h1>
            <div className="space-x-4">
                <Link href="/">Home</Link>
                <Link href="/upload">Upload</Link>
                {/* <Link href="/dashboard">Dashboard</Link> */}
            </div>
        </nav>
    );
}
