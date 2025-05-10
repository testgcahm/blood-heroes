// Header.tsx
import React from "react";
import Image from "next/image";

export default function Header() {
    return (
        <header className="w-full py-2 bg-white text-red-900 shadow-md shadow-red-800/10 border-b-2 border-b-red-700 mb-8 md:mb-10">
            <div className="flex flex-row max-[310px]:flex-col items-center md:gap-4 w-full justify-center">
                <Image src="/Logo.png" alt="Blood Heroes Society Logo" width={80} height={80} className="mr-3 max-[400px]:mr-1 max-[405px]:h-[70px] max-[405px]:w-[70px] max-[340px]:h-[60px] max-[340px]:w-[60px] w-[80px] h-[80px]" />
                <h1 className="text-4xl max-[500px]:text-3xl md:text-4xl max-[405px]:text-2xl lg:text-5xl font-bold tracking-tight text-center">Blood Heroes Society</h1>
            </div>
        </header>
    );
}
