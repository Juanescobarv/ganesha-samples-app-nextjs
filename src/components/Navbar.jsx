import Link from 'next/link'
import Image from 'next/image'

export function Navbar() {
  return (
    <header className='text-white pl-5 pr-10 py-4' style={{ background: '#EE2B7B' }}>
      <nav className='flex justify-between items-center'>
        <div>
          <Link href="/">
            <Image src="https://images.ctfassets.net/gkhyeghj07ak/6KrgYwciYMg98vGrkjQ4Ws/f7d958c9cdb87d98da148c1cf1e8ca8e/white.svg" alt="logo-comfama" width={200} height={150} />
          </Link>
        </div>

        <ul>
          <li>
            <Link href="/documentation">
              Documentación
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

