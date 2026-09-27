import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-2xl text-white'>
        <div className=' flex justify-between items-center px-4 py-5 h-14 mycontainer'>
        <div className='logo font-bold'>
            <span className='text-green-500'>&lt;</span>
            Pass
            <span className='text-green-500'>OP/&gt;</span>
            </div>
        {/* <ul>
            <li className='flex gap-4'>
                <a className='hover:font-bold' href="#">Home</a>
                <a className='hover:font-bold' href="#">About</a>
                <a className='hover:font-bold' href="#">conatct</a>
            </li>
        </ul> */}
        <button className='text-white bg-green-500 my-5 rounded-full flex gap-2 justify-between items-center ring-white ring-1'>
            <img src="/icon/github.png" alt="github logo" className="invert p-1  w-10 rounded-full"  />
            <span className="font-bold px-2">GitHub</span>
            
        </button>
</div>
    </nav>
  )
}

export default Navbar
