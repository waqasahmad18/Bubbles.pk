import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import EidDeliveryNotice from '../components/EidDeliveryNotice'
import BalloonBanner from '@/components/BalloonBanner'
import WomenBanner from '@/components/WomenBanner'
import MenBanner from '@/components/MenBanner'
import Footer from '@/components/Footer'


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
     <EidDeliveryNotice/>
     <BalloonBanner/>
     <WomenBanner/>
     <MenBanner/>
     <Footer/>
    </>
  )
}
