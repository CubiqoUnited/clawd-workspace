import Hero from '@/components/Hero'
import ProductGrid from '@/components/ProductGrid'
import Features from '@/components/Features'
import Technology from '@/components/Technology'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import AnalyticsDashboard from '@/components/AnalyticsDashboard'

export default function Home() {
  return (
    <>
      <Hero />
      <ProductGrid />
      <Features />
      <Technology />
      <Testimonials />
      <AnalyticsDashboard />
      <CTA />
    </>
  )
}