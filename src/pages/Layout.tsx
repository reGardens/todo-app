import { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <main className="max-w-screen-sm mx-auto">
        {children}
      </main>
    </>
  )
}