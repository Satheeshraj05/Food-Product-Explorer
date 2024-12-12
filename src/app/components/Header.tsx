import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-6">
        <Link href="/" className="text-2xl font-bold">
          Food Product Explorer
        </Link>
      </div>
    </header>
  )
}

