import { HiMenuAlt3 } from "react-icons/hi";
import { NavItems } from "../data/Nav";

const Header = () => {
  return (
    <header className=' absolute top-0 left-0 w-full z-50'>
      <nav className='flex justify-between items-center text-white w-[90%] lg:w-3/4 m-auto'>
        <img src="logo.png" alt="" className='w-[100px]' />
        <ul className='space-x-4 gap-9 text-xl hidden lg:flex'>
          {NavItems.map((item, index) => (
            <li key={item.title} className="uppercase font-light" ><a href={item.url}>{item.title}</a></li>
          ))}
        </ul>
        <button className='lg:hidden'>
          <HiMenuAlt3 size={35} />
        </button>
      </nav>
    </header>
  )
}

export default Header