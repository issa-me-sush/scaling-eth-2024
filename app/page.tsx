import { getFrameMetadata } from 'frog/next'
import type { Metadata } from 'next'
import Image from 'next/image'

import styles from './page.module.css'
import Link from 'next/link';
export async function generateMetadata(): Promise<Metadata> {
  const frameTags = await getFrameMetadata(
    `${process.env.VERCEL_URL || 'http://localhost:3000'}/api`,
  )
  return {
    other: frameTags,
  }
}

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p>
            Welcome to Morph Frame Generator for Warpcast!
          </p>
          <a
              href="/dapp"
              style={{ display: 'inline', fontWeight: 'semibold' }}
            >
          <p>
            Head to{' '}
           
              <code className={styles.code}> {`Main Dapp  `}</code>
   
            for generating frames on morph! {`(click here)`}
          </p>
          </a>
        </div>
        <div>
        <Image
         
          src="/logo.png"
         width={250}
         height={100}
         alt="morph logo"
          priority
        />
         
         
      
      </div>
      </div>

      

    
    </main>
  )
}
