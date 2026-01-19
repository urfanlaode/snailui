import Header from '@/components/layout/Header'
import { ReactNode } from 'react'

interface ProductLayoutProps {
  children: ReactNode
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  return (
    <div className="flex h-screen">
      {/*Main Content*/}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/*Header*/}
        <Header showBack backHref="/products" title="Back to Products" />
        {/*Page Content*/}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
