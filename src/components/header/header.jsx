import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <header className='border-b bg-white'>
      <div className='container mx-auto px-4'>
        <nav className='flex items-center justify-between h-16'>
          <Link href={'/'} className='flex items-center gap-2'>
            <span className='text-xl font-bold'>Watermark</span>
          </Link>
          <ul className='flex items-center'>
            <li>
              <Link href={'/about'} className='text-gray-600 hover:text-gray-800 transition-colors'>
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
