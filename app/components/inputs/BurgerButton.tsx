"use client"
import React, { useState } from 'react';

const BurgerButton = () => {
    const [isActive, setIsActive] = useState(false);
    const toggleMenu = () => {
        setIsActive(!isActive);
    };
    return (
        <div  className='hidden sm:block'>
        <div id="modile-menu" className={`fixed left-0 top-0 right-0  bottom-0 bg-bg flex items-center transition-transform justify-center ${isActive ? 'hidden' : ''} ${isActive ? 'flex' : ''}`}>
                        <ul className="flex flex-col items-center gap-10">
                            <li><a className="flex text-xl" href="#"> Головна</a></li>
                            <li><a className="flex text-xl" href="#"> Каталог</a></li>
                            <li><a className="flex text-xl" href="#"> Експерти</a></li>
                            <li><a className="flex text-xl" href="#"> Про нас</a></li>
                        </ul>
        </div>
        <button id="burder" onClick={toggleMenu} className={`group relative h-5 hidden sm:block w-[30px]  ${!isActive ? 'active' : ''}`}>
           <span className="absolute top-0 h-[1px] border-r-4 left-0 w-full bg-white group-[.active]:translate-y-2 group-[.active]:rotate-45 transition-transform"></span>
            <span className="absolute top-1/2 h-[1px] left-0 w-full bg-white group-[.active]:opacity-0	 transition-opacity"></span>
            <span className="absolute bottom-0 h-[1px] left-0 w-full bg-white group-[.active]:-translate-y-[11px] group-[.active]:-rotate-45 transition-transform"></span>
        </button>
        </div>
  
    );
};

export default BurgerButton;