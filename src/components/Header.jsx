"use client";

import { NavItems } from "../data/Nav";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from 'react'
import { HiShoppingBag, HiChevronDown, HiOutlineViewGrid } from 'react-icons/hi'

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import MobMenue from './MobMenue';
import CartDrawer from './shop/CartDrawer';
import { useCart } from '../contexts/CartContext';
import { getCollections } from '../services/shopify/shopifyCollection';

const Header = () => {
  const container = useRef(null);
  const barRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  const [dropdownTop, setDropdownTop] = useState(0);
  const { getItemCount } = useCart();

  const tl = useRef();

  useEffect(() => {
    getCollections().then(setCollections).catch(() => {});
  }, []);

  useEffect(() => {
    const updateDropdownTop = () => {
      if (barRef.current) setDropdownTop(barRef.current.getBoundingClientRect().bottom);
    };
    updateDropdownTop();
    window.addEventListener("resize", updateDropdownTop);
    return () => window.removeEventListener("resize", updateDropdownTop);
  }, []);


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
        <div
          ref={barRef}
          className="menu-bar fixed z-50  justify-between items-center text-white w-[90%] lg:w-3/4 m-auto  hidden lg:flex"
          onMouseLeave={() => setIsShopOpen(false)}
        >
          {isShopOpen && (
            <div className="fixed inset-x-0 top-0">
              <div
                className="bg-[#141311]/95 backdrop-blur-sm border-b border-[#8a6a2e]/40 shadow-2xl animate-[shopMenuIn_0.25s_ease-out]"
                style={{ paddingTop: dropdownTop }}
              >
                <div className="w-full px-10 lg:px-16 py-10 flex flex-wrap gap-8">
                  <Link href="/products" className="flex flex-col items-center gap-2 group/collection">
                    <span className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 bg-[#1f1e1d] border border-transparent group-hover/collection:border-[#ffc000] transition-colors">
                      <HiOutlineViewGrid size={26} className="text-[#ffc000]" />
                    </span>
                    <span className="text-sm uppercase text-white/80 group-hover/collection:text-white transition-colors">
                      All products
                    </span>
                  </Link>

                  {collections.map((collection) => (
                    <Link
                      key={collection.id}
                      href={`/collections/${collection.handle}`}
                      className="flex flex-col items-center gap-2 group/collection"
                    >
                      <span className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 bg-[#1f1e1d] border border-transparent group-hover/collection:border-[#ffc000] transition-colors">
                        <Image src={collection.imageUrl} alt="" fill className="object-cover" sizes="64px" />
                      </span>
                      <span className="text-sm uppercase text-white/80 group-hover/collection:text-white transition-colors">
                        {collection.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="menu-logo relative">
            <Link href='/'><Image src="/logo.webp" alt="" width={1080} height={1080} className='w-[100px] h-auto' />
            </Link>
          </div>
          <ul className='relative space-x-4 gap-9 text-xl hidden lg:flex'>
            {NavItems.map((item) =>
              item.title === "Shop" ? (
                <li
                  key={item.title}
                  className="uppercase font-light"
                  onMouseEnter={() => setIsShopOpen(true)}
                >
                  <Link href={item.url} className="flex items-center gap-1">
                    {item.title}
                    <HiChevronDown className={`transition-transform ${isShopOpen ? "rotate-180" : ""}`} />
                  </Link>
                </li>
              ) : (
                <li key={item.title} className="uppercase font-light"><Link href={item.url}>{item.title}</Link></li>
              )
            )}
          </ul>
          <button onClick={() => setIsCartOpen(true)} className='relative' aria-label='Open cart'>
            <HiShoppingBag size={26} />
            {getItemCount() > 0 && (
              <span className='absolute -top-2 -right-2 bg-[#ffc000] text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center'>
                {getItemCount()}
              </span>
            )}
          </button>
        </div>
        <MobMenue
          toggleMenu={toggleMenu}
          onCartClick={() => setIsCartOpen(true)}
          cartCount={getItemCount()}
          collections={collections}
        />
      </nav>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}

export default Header
