"use client"

import { ImageDetail } from './image-detail';
import { STYLES } from '@/app/globals';
import Image from 'next/image';
import { Modal } from './modal';
import { imageUrl } from '@/lib/image-api';

export const ImageModal = ({ selected, onCloseModal }: { selected: number | undefined, onCloseModal: () => void }) => {
    return (
        <Modal
            ariaLabel='image details modal'
            isOpen={selected != undefined}
            onClose={onCloseModal}>
                <div className='h-full w-full flex flex-col px-3 py-2 gap-2'>
                    <div className='flex flex-row justify-between items-center w-full h-fit'>
                        <div className='flex flex-row items-center gap-3'>
                            <Image className='image-loader' src={imageUrl(selected ?? 0, 50, 50)} alt="" height={100 / 3.5} width={100 / 3.5} />
                            <h2 className={STYLES.p + " font-semibold! text-primary!"}>#{selected}</h2>
                        </div>
                        <button onClick={onCloseModal} className='cursor-pointer aspect-square group'>
                            <svg className='fill-primary group-hover:fill-accent-two h-4 w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/>
                            </svg>
                        </button>
                    </div>
                    <div className='flex-1'>
                        {selected !== undefined && <ImageDetail imageId={selected} />}
                        {selected === undefined && <p>Failed to load resource</p>}
                    </div>
                </div>
        </Modal>
    )
}