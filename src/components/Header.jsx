"use client";

import { NavItems } from "../data/Nav";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from 'react'

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import MobMenue from './MobMenue';

const Header = () => {
  const container = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tl = useRef();


  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  }

  useGSAP(() => {
    gsap.set(".menu-link-item-holder", { y: 75 });

    tl.current = gsap
      .timeline({ paused: true })
      .to(".menu-overlay", { duration: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", ease: "power4.inOut" })
      .to(".menu-link-item-holder", { y: 0, duration: 1, stagger: 0.1, ease: "power4.inOut", delay: -0.75 })
  }, { scope: container });

  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isMenuOpen]);



  return (
    <header className='relative flex justify-center'>
      <nav className='flex justify-center' ref={container}>
        <div className="menu-bar fixed z-50  justify-between items-center text-white w-[90%] lg:w-3/4 m-auto  hidden lg:flex">
          <div className="menu-logo">
            <Link href='/'><Image src="/logo.webp" alt="" width={1080} height={1080} className='w-[100px] h-auto' />
            </Link>
          </div>
          <ul className='space-x-4 gap-9 text-xl hidden lg:flex'>
            {NavItems.map((item, index) => (
              <li key={item.title} className="uppercase font-light" ><Link href={item.url}>{item.title}</Link></li>
            ))}
          </ul>
        </div>
        <MobMenue toggleMenu={toggleMenu} />
      </nav>
    </header>
  )
}

export default Header
