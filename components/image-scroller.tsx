"use client";

import Image from "next/image";
import { forwardRef, useState } from "react";
import { VirtuosoGrid, VirtuosoGridProps } from "react-virtuoso";
import { ImageModal } from "./image-modal";
import { useImageApiContext } from "@/context/image-api";
import { imageUrl } from "@/lib/image-api";

const gridComponents: VirtuosoGridProps<undefined, undefined>['components'] = {
  List: forwardRef(({ style, children, ...props }, ref) => (
    <div ref={ref} {...props} className={"flex flex-wrap"} style={style}>
      {children}
    </div>
  )),
  Item: ({ children, ...props }) => (
    <div {...props} className="p-1 flex flex-none content-stretch box-border lg:w-1/4 w-1/3">
      {children}
    </div>
  ),
}

if (gridComponents.List) {
  gridComponents.List.displayName = 'ListComponent';
}

const Item = ({ index, onClick }: { index: number, onClick: (index: number) => void }) => (
  <button onClick={() => onClick(index)} className="flex flex-1 aspect-square relative cursor-pointer hover:border-accent-three hover:rounded-md overflow-clip hover:border-2">
    <Image 
      className="h-full w-full z-10" 
      src={imageUrl(index, 500, 500)} 
      height={200} 
      width={200}  
      quality={60}
      alt="" />
    <div className="bg-primary/20 animate-pulse absolute inset-0" />
  </button>
)

const Loader = () => (
  <button disabled className="flex flex-1 aspect-square relative cursor-pointer hover:border-accent-three hover:rounded-md overflow-clip hover:border-2">
    <div className="bg-primary/20 animate-pulse absolute inset-0" />
  </button>
)

export const ImageScroller = () => {
  const { status } = useImageApiContext();
  const [selected, setSelected] = useState<number | undefined>(undefined);
  
  const gridProps: VirtuosoGridProps<undefined, undefined> = {
    className: "h-full w-full",
    totalCount: 4_294_967_295,
    increaseViewportBy: { bottom: 12, top: 12 },
    initialItemCount: 50,
    components: gridComponents,
    itemContent: (index: number) => <Item onClick={() => setSelected(index)} index={index} />
  };

  if (status.isLoading) {
    const loadProps = {
      ...gridProps, 
      itemContent: () => <Loader/> 
    };

    return (
      <div className="h-100 max-h-[70vh] w-full">
        <VirtuosoGrid {...loadProps} />
      </div>
    )
  }

  if (!status.state || status.state !== "healthy") {
    const statusMessage =
      status.state === "unhealthy"
        ? "Service is currently unavailable"
        : status.state === "unreachable"
          ? "Unable to reach service"
          : "Unexpected error has occurred";

    return (
      <div className="h-100 max-h-[70vh] w-full flex flex-col items-center justify-center gap-5">
        <p>{statusMessage}</p>
      </div>
    )
  }

  if (status.state !== "healthy") {
    throw new Error(`Developer error: unhandled status.state "${status.state}"`);
  }

  return (
    <div className="h-100 max-h-[70vh] w-full">
      <VirtuosoGrid {...gridProps} />
      <ImageModal
        selected={selected} 
        onCloseModal={() => setSelected(undefined)} />
    </div>
  );
};