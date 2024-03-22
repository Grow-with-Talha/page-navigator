"use client"
import Image from 'next/image'
import React from 'react'
import logo from "@/assets/navbar-logo-pageNavigator.png"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Input } from '../ui/input'
import { useCurrentUser } from '../auth/hooks/use-current-user'
import { LoginButton } from '../auth/login-button'
import { Button } from '../ui/button'
import UserButton from '../auth/user-button'
const navBarItems = [
    {
        title: 'Home',
        href: '/app'
    },
    {
        title: "Explore",
        href: "/explore"
    },
    {
        title: "My collection",
        href: "/collection"
    },
    {
        title: "Profile",
        href: "/profile"
    },
]
const Navbar = () => {
    const pathName = usePathname();
    const user = useCurrentUser();
  return (
    <nav className='max-w-[1400px] m-auto mt-4 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
            <Link href={"/"}>
                <Image src={logo} alt='logo' width={200} height={200} />
            </Link>
            <div className='flex items-center gap-4'>
                {navBarItems.map((item) => {
                    const isActive = pathName === item.href;
                    return (
                        <Link href={item.href} key={item.href}>
                            <p className={`${isActive ? "text-[#00BDD6] underline underline-offset-3 font-bold" : "text-gray-500"} text-sm hover:text-[#00BDD6] transition-all`}>{item.title}</p>
                        </Link>
                    )
                })}
            </div>
        </div>
        <div className="flex items-center gap-4">
            <div>
                <Input className='focus-visible:ring-1 ring-offset-[#00BDD6]' placeholder='search...'/>
            </div>
            {user?.id === undefined ? (
                <LoginButton>
                    <Button size={'sm'}>Login</Button>
                </LoginButton>
            ) : (
                <UserButton />
            )}
        </div>
    </nav>
  )
}

export default Navbar