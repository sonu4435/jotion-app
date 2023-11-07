import React from 'react'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import logoImg from '../../../public/logo.svg'
import DarklogoImg from '../../../public/logo-dark.svg'

const font = Poppins({
    subsets: ["latin"],
    weight:["400", "600"]
})

const Logo = () => {
  return (
    <div className="brightness-200 -hue-rotate-60 saturate-200 hidden md:flex items-center gap-x-2">
      <Image
        src={logoImg}
        height="40"
        width="40"
        alt="logo"
        className="dark:hidden"
      />
      <Image
        src={DarklogoImg}
        height="40"
        width="40"
        alt="logo"
        className="hidden dark:block" 
      />
      Jotion
    </div>
  );
}

export default Logo