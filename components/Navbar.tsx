'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Moon, Sun, ChevronDown, ChevronRight, Menu, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'


const menuItems = [
  {
    title: 'Agent',
    subItems: [
      { name: 'New Agent', link: '/new-agent' },
      { name: 'Agent List', link: '/agent-list' }
    ]
  },
  {
    title: 'Party',
    subItems: [
      { name: 'New Party', link: '/new-party' },
      { name: 'Parties List', link: '/parties-list' }
    ]
  },
  {
    title: 'Unit',
    subItems: [
      { name: 'New Unit', link: '/new-unit' },
      { name: 'Units List', link: '/units-list' }
    ]
  },
  {
    title: 'HSN Form',
    subItems: [
      { name: 'New HSN Form', link: '/new-hsn-form' },
      { name: 'HSN Forms List', link: '/hsn-forms-list' }
    ]
  },
  {
    title: 'Item',
    subItems: [
      { name: 'New Item', link: '/new-item' },
      { name: 'Items List', link: '/items-list' }
    ]
  },
  {
    title: 'Transport',
    subItems: [
      { name: 'New Transport', link: '/new-transport' },
      { name: 'Transports List', link: '/transports-list' }
    ]
  }
]

export default function Navbar() {
  const [theme, setTheme] = useState('light')
  // const [isMounted, setIsMounted] = useState(false) 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    // Check for user preference in localStorage
    const userPreference = localStorage.getItem('theme')
    // Check for system preference
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    
    // Set initial theme
    const initialTheme = userPreference || systemPreference
    setTheme(initialTheme)
    applyTheme(initialTheme)
  }, [])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth')
    }
  }, [status, router])

  const applyTheme = (newTheme: string) => {
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    applyTheme(newTheme)
  }


  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/auth')
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status !== 'authenticated') {
    return null
  }
  

  return (
    <>
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 text-white">
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200">
              <ArrowLeft size={24} />
            </button>
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200">
              <Image src="/logo.png" alt="DDSoft Logo" width={40} height={40} />
              <span className="text-2xl font-bold">DDSoft</span>
            </Link>
          </div>
          <nav className="flex-grow flex justify-center">
            <ul className="flex space-x-8">
              {/* Master menu */}
              <li className="relative group">
                <div className="flex items-center space-x-1 cursor-pointer transition-all duration-300 ease-in-out transform group-hover:scale-105">
                  <span>Master</span>
                  <ChevronDown size={16} />
                </div>
                <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                  {menuItems.map((item, index) => (
                    <li key={index} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 group/item relative">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-800 dark:text-white">{item.title}</span>
                        <ChevronRight size={16} className="text-gray-500" />
                      </div>
                      <ul className="absolute left-full top-0 mt-0 ml-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-300 ease-in-out">
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              href={subItem.link}
                              className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500 dark:hover:text-blue-300"
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Sales menu */}
              <li className="relative group">
                <div className="flex items-center space-x-1 cursor-pointer transition-all duration-300 ease-in-out transform group-hover:scale-105">
                  <span>Sales</span>
                  <ChevronDown size={16} />
                </div>
                <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/sales-order" className="block font-semibold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray dark:hover:text-white">
                      Sales Order
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/sale" className="block font-semibold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray dark:hover:text-white">
                      Sale
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/sales-return" className="block font-semibold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray dark:hover:text-white">
                      Sales Return
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/sales-pending-order" className="block font-semibold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray dark:hover:text-white">
                      Pending Order
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Purchase menu */}
              <li className="relative group">
                <div className="flex items-center space-x-1 cursor-pointer transition-all duration-300 ease-in-out transform group-hover:scale-105">
                  <span>Purchase</span>
                  <ChevronDown size={16} />
                </div>
                <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/purchase-order" className="block font-semibold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray dark:hover:text-white">
                      Purchase Order
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/purchase" className="block font-semibold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray dark:hover:text-white">
                      Purchase
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/purchase-return" className="block font-semibold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray dark:hover:text-white">
                      Purchase Return
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/purchase-pending-order" className="block font-semibold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray dark:hover:text-white">
                      Pending Order
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Job Work menu */}
              <li className="relative group">
                <div className="flex items-center space-x-1 cursor-pointer transition-all duration-300 ease-in-out transform group-hover:scale-105">
                  <span>Job Work</span>
                  <ChevronDown size={16} />
                </div>
                <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/issue-for-job" className="block font-semibold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray dark:hover:text-white">
                      Issue for Job
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/receive-from-return" className="block font-semibold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray dark:hover:text-white">
                      Receive from Job
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/balance" className="block font-semibold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray dark:hover:text-white">
                      Balance
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/job-work-bill" className="block font-semibold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray dark:hover:text-white">
                      Job Work Bill Order
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Report menu */}
              <li className="relative group">
                <div className="flex items-center space-x-1 cursor-pointer transition-all duration-300 ease-in-out transform group-hover:scale-105">
                  <span>Report</span>
                  <ChevronDown size={16} />
                </div>
                <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/sales-register" className="block font-semibold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray dark:hover:text-white">
                      Sales Register
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/purchase-register" className="block font-semibold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray dark:hover:text-white">
                      Purchase Register
                    </Link>
                  </li>
                  <li className="px-4 py-2  hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/ledger-report" className="block font-semibold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray dark:hover:text-white">
                      Ledger Report
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/outstanding" className="block font-semibold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray dark:hover:text-white">
                      Outstanding
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/stock" className="block font-semibold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray dark:hover:text-white">
                      Stock
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/item-ledger" className="block font-semibold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray dark:hover:text-white">
                      Item Ledger
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Account menu */}
              <li className="relative group">
                <div className="flex items-center space-x-1 cursor-pointer transition-all duration-300 ease-in-out transform group-hover:scale-105">
                  <span>Account</span>
                  <ChevronDown size={16} />
                </div>
                <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/payment" className="block font-semibold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray dark:hover:text-white">
                      Payment
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/receipt" className="block font-semibold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray dark:hover:text-white">
                      Receipt
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Setting menu */}
              <li className="relative group">
                <div className="flex items-center space-x-1 cursor-pointer transition-all duration-300 ease-in-out transform group-hover:scale-105">
                  <span>Settings</span>
                  <ChevronDown size={16} />
                </div>
                <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/change-password" className="block font-semibold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray dark:hover:text-white">
                      Change Password
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>

          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/20">
              {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
            </button>
            <button
              className="md:hidden p-2 rounded-full hover:bg-white/20"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
          <ul className="py-2">
            {menuItems.map((item, index) => (
              <li key={index} className="px-4 py-2">
                <span className="font-semibold">{item.title}</span>
                <ul className="ml-4 mt-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        href={subItem.link}
                        className="block py-1 hover:text-blue-500 dark:hover:text-blue-300"
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
