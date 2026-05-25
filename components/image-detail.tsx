"use client"

import { useImageMetadata } from "@/hooks/image-metadata";
import { imageUrl, Metadata } from "@/lib/image-api";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "./external-link";

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
    <table className="sm:text-sm text-xs w-full font-mono border-x border-x-trim/20">
        <tbody className="w-full">
            {tableKeys.map(({ label, value, computedStyle }) => (
                <tr key={label} className="border-y border-y-trim/20">
                    <th className="px-2 w-32 text-left border-r text-primary-text border-r-trim/20">{label}</th>
                    {m && <td className={`${computedStyle && computedStyle(m)} px-2`}>{value(m)}</td>}
                    {!m && <td className="px-2 relative"><div className="bg-primary-text/50 rounded-full animate-pulse absolute inset-2" /><p className="hidden">spacing</p></td>}
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
                <p className="text-xl text-secondary-text">
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
            <ExternalLink href="" className="text-sm! ml-auto!">
                View All Metrics
            </ExternalLink>
        </div>
    )
}