import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <main className="max-w-screen-sm mx-auto">
        {children}
      </main>
    </>
  )
}