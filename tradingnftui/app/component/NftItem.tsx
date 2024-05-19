import Image from 'next/image'
import React from 'react'
import nftImage from '../images/nft.jpg'; 
import { Button } from '@mui/material';

export default function NftItem() {
  return (
    <div className='flex items-center justify-center transition ease-in-out transform hover:-translate-y-1 duration-300'>
        <div className='relative p-2' style={{backgroundColor: '#212121', width: 290, borderRadius: 8, marginTop: 15}}>
            <Image src={nftImage} style={{objectFit: 'cover', borderRadius: 8}} alt='NFT'/>

            <div className='mt-2'>
                <p className='text-center font-semibold'>Money Gold</p>
                <div className='flex flex-row space-x-2'>
                    <Button variant='contained' className='p-3 w-full rounded-lg bg-amber-500 hover:bg-amber-600 items-center justify-center mt-5'>List</Button>
                    <Button variant='contained' className='p-3 w-full rounded-lg bg-amber-500 hover:bg-amber-600 items-center justify-center mt-5'>UnList</Button>
                </div>
                <Button variant='contained' className='p-3 w-full rounded-lg bg-amber-500 hover:bg-amber-600 items-center justify-center mt-5'>Transfer</Button>
            </div>

            <div className='absolute top-3 right-4'>
                <div className='p-1 px-3 rounded-lg' style={{backgroundColor: 'rgba(0,0,0,0.4)'}}>
                    <p>Id: 0052</p>
                </div>
            </div>
        </div>
    </div>
  )
}
