'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import CatalogClient from './CatalogClient'
import { Package, ClipboardCheck, FileText, MessageCircle, Shield, Truck, Headphones, BadgeCheck, TrendingUp, Factory, ArrowUp, Hammer, HardHat, Building2 } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const steps = [
  { icon: Package, title: 'Explora', desc: 'Navega nuestro catálogo de productos de concreto y selecciona los que necesitas.' },
  { icon: ClipboardCheck, title: 'Selecciona', desc: 'Añade los productos y cantidades a tu lista de cotización.' },
  { icon: FileText, title: 'Solicita', desc: 'Completa tus datos y envía la solicitud. Te responderemos en breve.' },
  { icon: MessageCircle, title: 'Recibe', desc: 'Nuestro equipo te contactará por WhatsApp o correo con los mejores precios.' },
]

const advantages = [
  { icon: BadgeCheck, title: 'Calidad Garantizada', desc: 'Productos fabricados bajo estrictos estándares de resistencia y durabilidad.' },
  { icon: TrendingUp, title: 'Mejores Precios', desc: 'Fabricación directa sin intermediarios, precios justos y competitivos.' },
  { icon: Headphones, title: 'Atención Personalizada', desc: 'Te asesoramos en la selección del producto ideal para tu proyecto.' },
  { icon: Truck, title: 'Entrega Puntual', desc: 'Logística propia para entregas en toda la región de los Llanos.' },
  { icon: Factory, title: 'Fabricación Propia', desc: 'Planta industrial equipada con maquinaria de última generación.' },
  { icon: Shield, title: 'Asesoría Técnica', desc: 'Te ayudamos a elegir las especificaciones correctas para tu obra.' },
]

const clients = [
  'Constructora Los Llanos', 'Desarrollos Barinas C.A.', 'Gobernación de Barinas',
  'Inversiones Llano Alto', 'Corporación Andina', 'Grupo Constructor Nacional',
]

function CountUp({ target, suffix = '', label, icon: Icon }: { target: number; suffix?: string; label: string; icon: any }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || hasAnimated) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 2000
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, hasAnimated])

  return (
    <div ref={ref} className="text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
        <Icon size={28} className="text-brand-primary" />
      </div>
      <div className="text-4xl md:text-5xl font-black text-white mb-1">
        {count}{suffix}
      </div>
      <div className="text-gray-400 font-medium text-sm">{label}</div>
    </div>
  )
}

interface Product {
  id: string; name: string; description: string; price: number
  imageUrl: string | null; category?: { name: string; id: string }
  categoryId: string; stock: number
}
interface Category { id: string; name: string }

export default function HomeClient({
  products, categories, settings,
}: {
  products: Product[]
  categories: Category[]
  settings: { heroSlogan: string; heroDescription: string; whatsapp: string }
}) {
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 500], [0, 150])

  return (
    <>
      {/* HERO */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
        {/* Parallax Background */}
        <motion.div
          style={{
            y: bgY,
            backgroundImage: `url(https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop)`,
          }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary/95 via-brand-secondary/80 to-brand-secondary/60" />
        <div className="absolute inset-0 opacity-[0.08]">
          <div className="w-full h-full bg-[radial-gradient(#e67e22_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-brand-primary" />
                <span className="text-brand-primary font-bold text-sm uppercase tracking-[0.2em]">Concretera Industrial Barinas</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.05] mb-6">
                <span className="text-white">COIN</span><span className="text-brand-primary">BACA</span>
                <br />
                <span className="text-3xl md:text-4xl font-bold text-gray-300">Calidad que construye tu futuro</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 max-w-xl"
            >
              Fabricación directa de tubos de concreto, productos agropecuarios y ornamentales. Expertos con más de 25 años en Barinas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/catalogo"
                className="bg-brand-primary hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full shadow-2xl transition-all hover:-translate-y-1 text-lg inline-flex items-center gap-2"
              >
                <Package size={20} />
                Ver Catálogo
              </Link>
              <Link
                href="/nosotros"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-4 px-10 rounded-full border border-white/20 transition-all hover:-translate-y-1 text-lg inline-flex items-center gap-2"
              >
                <Building2 size={20} />
                Conócenos
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero decorative elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hidden lg:block absolute right-10 bottom-10"
          >
            <div className="w-64 h-64 rounded-full border border-white/10 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border border-white/10 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-brand-primary/20 flex items-center justify-center">
                  <Hammer size={48} className="text-brand-primary" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowUp size={20} className="text-gray-500 rotate-180" />
          </motion.div>
        </motion.div>
      </section>

      {/* CONFIANZA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeUp}
        className="bg-brand-secondary"
      >
        <div className="max-w-6xl mx-auto px-4 py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <CountUp target={25} suffix="+" label="Años de Experiencia" icon={HardHat} />
            <CountUp target={1500} suffix="+" label="Productos Fabricados" icon={Package} />
            <CountUp target={500} suffix="+" label="Clientes Satisfechos" icon={BadgeCheck} />
            <CountUp target={100} suffix="%" label="Compromiso y Calidad" icon={Shield} />
          </motion.div>
        </div>
      </motion.section>

      {/* CÓMO FUNCIONA */}
      <section className="bg-[#f4f7f6] py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="max-w-6xl mx-auto px-4"
        >
          <div className="text-center mb-14">
            <span className="text-brand-primary font-bold text-sm uppercase tracking-[0.2em]">Proceso</span>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight mt-2">¿Cómo Cotizar?</h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">
              Solicitar una cotización en COINBACA es rápido y sencillo
            </p>
            <div className="w-20 h-1 bg-brand-primary rounded-full mx-auto mt-4" />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center relative group hover:shadow-md transition-shadow"
              >
                <span className="absolute -top-3 -left-3 w-9 h-9 rounded-xl bg-brand-primary text-white text-sm font-black flex items-center justify-center shadow-lg">
                  {i + 1}
                </span>
                <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                  <step.icon size={28} className="text-brand-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CATÁLOGO DESTACADO */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
        className="bg-white"
      >
        <div className="max-w-7xl mx-auto pt-16 px-4 text-center">
          <span className="text-brand-primary font-bold text-sm uppercase tracking-[0.2em]">Productos</span>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight mt-2">Catálogo Destacado</h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto mb-2">
            Los productos más solicitados por nuestros clientes
          </p>
          <div className="w-20 h-1 bg-brand-primary rounded-full mx-auto" />
        </div>
        <CatalogClient initialProducts={products} categories={categories} />
      </motion.section>

      {/* VENTAJAS */}
      <section className="bg-[#f4f7f6] py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="max-w-6xl mx-auto px-4"
        >
          <div className="text-center mb-14">
            <span className="text-brand-primary font-bold text-sm uppercase tracking-[0.2em]">Por qué elegirnos</span>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight mt-2">Ventajas de Trabajar con COINBACA</h2>
            <div className="w-20 h-1 bg-brand-primary rounded-full mx-auto mt-4" />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {advantages.map((adv) => (
              <motion.div
                key={adv.title}
                variants={fadeUp}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 group hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <adv.icon size={28} className="text-brand-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{adv.title}</h3>
                <p className="text-gray-500 leading-relaxed">{adv.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CONFIÁN EN NOSOTROS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
        className="bg-white py-16"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-brand-primary font-bold text-sm uppercase tracking-[0.2em]">Clientes</span>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mt-2">Confían en Nosotros</h2>
            <div className="w-20 h-1 bg-brand-primary rounded-full mx-auto mt-4" />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {clients.map((name) => (
              <motion.div
                key={name}
                variants={fadeUp}
                className="bg-gray-50 rounded-xl px-4 py-6 text-center border border-gray-100 hover:border-brand-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Building2 size={18} className="text-brand-primary" />
                </div>
                <p className="text-sm font-bold text-gray-700 leading-tight">{name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA FINAL */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
        className="bg-brand-secondary"
      >
        <div className="max-w-6xl mx-auto px-4 py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05]">
            <div className="w-full h-full bg-[radial-gradient(#e67e22_1px,transparent_1px)] [background-size:20px_20px]" />
          </div>
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              ¿Listo para tu Cotización?
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
              Completa el formulario y recibe una respuesta personalizada de nuestro equipo de ventas en horas, no días.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/cotizacion"
                className="bg-brand-primary hover:bg-orange-600 text-white font-bold py-4 px-12 rounded-full shadow-2xl transition-all hover:-translate-y-1 text-lg"
              >
                Solicitar Cotización
              </Link>
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-full transition-all hover:-translate-y-1 text-lg inline-flex items-center gap-2"
              >
                <MessageCircle size={20} />
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </motion.section>

    </>
  )
}
