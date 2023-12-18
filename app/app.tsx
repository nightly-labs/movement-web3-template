'use client'
import { Loader } from '@react-three/drei'
import { Toaster } from 'sonner'
import Background from './components/Background'
import StickyHeader from './components/StickyHeader'
import Torus from './components/Torus/App'
import Socials from './components/Socials'

export default function Home() {
  return (
    <>
      <Background />
      <StickyHeader />
      <Toaster position='bottom-left' richColors />
      <Torus />
      <Socials />
      <Loader />
    </>
  )
}
