"use client"

import { useImageMetadata } from "@/hooks/image-metadata";
import { imageUrl, Metadata } from "@/lib/image-api";
import Image from "next/image";
import Link from "next/link";

const imageHeight = 1000;
const imageWidth = 2000;

const tableKeys = [
    {
        label: "id",
        value: (m: Metadata) => `#${m.id}`
    },
    {
        label: "url",
        value: (m: Metadata) => <Link className="underline" href={m.url}>{m.url}</Link>,
    },
    {
        label: "is_cached",
        value: (m: Metadata) => JSON.stringify(m.is_cached),
        computedStyle: (m: Metadata) => m.is_cached ? "text-green-400" : "text-red-400"
    },
]

const Table = ({ metadata: m }: { metadata: Metadata | undefined }) => (
    <table className="sm:text-sm text-xs w-full font-mono border-x border-x-secondary/20">
        <tbody className="w-full">
            {tableKeys.map(({ label, value, computedStyle }) => (
                <tr key={label} className="border-y border-y-secondary/20">
                    <th className="px-2 w-32 text-left border-r text-primary border-r-secondary/20">{label}</th>
                    {m && <td className={`${computedStyle && computedStyle(m)} px-2`}>{value(m)}</td>}
                    {!m && <td className="px-2 relative"><div className="bg-primary/40 rounded-full animate-pulse absolute inset-2" /><p className="hidden">spacing</p></td>}
                </tr>
            ))}
        </tbody>
    </table>
);

const ImageMetadata = ({ imageId }: { imageId: number }) => {
    const { isError, metadata, refetch } = useImageMetadata(imageId, imageHeight, imageWidth);

    if (isError || !metadata) return (
        <div className="relative w-full">
            <div className="absolute flex items-center justify-center flex-col inset-0 gap-3">
                <p className="text-xl text-secondary">
                    Metadata unavailable
                </p>
                <button onClick={refetch} className="cursor-pointer text-primary">
                    Retry
                </button>
            </div>
            <Table metadata={undefined}/>
        </div>
    );

    return <Table metadata={metadata} />;
}

export const ImageDetail = ({ imageId }: { imageId: number }) => {
    return (
        <div className="h-full w-full flex flex-col gap-3">
            <div className="max-h-[60vh] overflow-y-auto">
                <Image className="image-loader" src={imageUrl(imageId, imageHeight, imageWidth)} alt="" height={imageHeight} width={imageWidth} />
            </div>
            <ImageMetadata imageId={imageId}/>
            <Link target="_blank" href="" className="sm:text-sm text-xs text-primary ml-auto flex flex-row items-center gap-1">
                View All Metrics
                <svg className="h-4 w-4 fill-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M384 64C366.3 64 352 78.3 352 96C352 113.7 366.3 128 384 128L466.7 128L265.3 329.4C252.8 341.9 252.8 362.2 265.3 374.7C277.8 387.2 298.1 387.2 310.6 374.7L512 173.3L512 256C512 273.7 526.3 288 544 288C561.7 288 576 273.7 576 256L576 96C576 78.3 561.7 64 544 64L384 64zM144 160C99.8 160 64 195.8 64 240L64 496C64 540.2 99.8 576 144 576L400 576C444.2 576 480 540.2 480 496L480 416C480 398.3 465.7 384 448 384C430.3 384 416 398.3 416 416L416 496C416 504.8 408.8 512 400 512L144 512C135.2 512 128 504.8 128 496L128 240C128 231.2 135.2 224 144 224L224 224C241.7 224 256 209.7 256 192C256 174.3 241.7 160 224 160L144 160z"/>
                </svg>
            </Link>
        </div>
    )
}