import Link from "next/link";
import Image from "next/image";
import { HiMenuAlt3, HiShoppingBag } from "react-icons/hi";
import { NavItems } from "../data/Nav";

const MobMenue = ({ toggleMenu, onCartClick, cartCount = 0 }) => {
  return (
    <div className="fixed flex justify-between items-center z-50 text-white w-[90%] lg:w-3/4 m-auto lg:hidden">
      <Link href='/'><Image src="/logo.webp" alt="" width={1080} height={1080} className='w-[100px] h-auto' />
      </Link>
      <div className='flex items-center gap-5'>
        <button className='relative' onClick={onCartClick} aria-label='Open cart'>
          <HiShoppingBag size={28} />
          {cartCount > 0 && (
            <span className='absolute -top-2 -right-2 bg-[#ffc000] text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center'>
              {cartCount}
            </span>
          )}
        </button>
        <button className='lg:hidden' onClick={toggleMenu}>
          <HiMenuAlt3 size={35} />
        </button>
      </div>

      <div className="menu-overlay flex flex-col items-center">
        <div className="menu-overlay-bar flex justify-between items-center text-white w-[90%] lg:w-3/4">
          <div className="menu-logo">
            <Link href='/'><Image src="/logo.webp" alt="" width={1080} height={1080} className='w-[100px] h-auto' onClick={toggleMenu} />
            </Link>
          </div>
          <button className="menu-close text-2xl" onClick={toggleMenu}>
            Close
          </button>
        </div>
        {/* <div className="menu-close-icon">
          <p>&#x2715;</p>
        </div> */}
        <div className=" h-full flex flex-col items-start justify-around gap-10 mt-10">
          <div className="menu-links">
            {NavItems.map((link, index) => (
              <div className="menu-link-item text-6xl " key={index}>
                <div className="menu-link-item-holder font-[Phenomena] ">
                  <Link href={link.url} className='menu-link !text-white' onClick={toggleMenu}>
                    {link.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className='flex flex-col items-center gap-10 '>
            <div className='flex w-full justify-center items-center mt-10'>
              <Image src="/new-logo_web.webp" alt="" width={780} height={780} className='bg-white rounded-full w-28 md:w-36 h-auto p-1' />
              <Image src="/new-logo_web1.webp" alt="" width={780} height={780} className=' rounded-full w-28 md:w-36 h-auto p-2' />
              <Image src="/new-logo_web3.webp" alt="" width={780} height={780} className=' rounded-full w-28 md:w-36 h-auto p-2' />
            </div>
            <div className="flex flex-col items-center gap-2">
              <a href="mailto:grass.roots.cairo@gmail.com">
                grass.roots.cairo@gmail.com
              </a>
              <a href="tel:+201099749005">
                +20 109 974 9005
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobMenue
