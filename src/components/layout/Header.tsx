'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Logo } from '../icons/Logo'

interface HeaderProps {
  showBack?: boolean
  backHref?: string
  title?: string
}

export default function Header({ showBack = false, backHref = '/', title = 'Store' }: HeaderProps) {
  const router = useRouter()

  return (
    <header className="w-full border-b border-border bg-white mb-6 px-6 py-4 h-16">
      <div className="flex items-center max-w-6xl mx-auto h-full">
        {showBack ? (
          <Link href={backHref} className="text-gray-500 flex items-center gap-2 hover:underline">
            <ArrowLeft className="h-5 w-5" />
            <span>{title || 'Back'}</span>
          </Link>
        ) : (
          <div
            className="flex items-center gap-2 font-bold text-lg hover:cursor-pointer"
            onClick={() => router.replace('/')}
          >
            <span role="img" aria-label="store">
              <Logo />
            </span>
            <span className="uppercase">{title}</span>
          </div>
        )}
      </div>
    </header>
  )
}
