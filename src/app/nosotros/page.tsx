'use client'

import { motion } from 'framer-motion'
import { Package, Search, FileText, MessageCircle, Target, Eye, Shield, Building2, Phone, Mail, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const categories = [
  { name: 'Tubos de Concreto', desc: 'Prefabricados para drenaje, alcantarillado y conducción de agua.', icon: Package },
  { name: 'Productos Agropecuarios', desc: 'Bebederos, comederos y canales para el sector agrícola.', icon: Building2 },
  { name: 'Ornamentales', desc: 'Macetas, fuentes, adoquines y bancos para jardines.', icon: Shield },
  { name: 'Bloques y Ladrillos', desc: 'Materiales de construcción básicos para obra civil.', icon: Building2 },
]

const steps = [
  { icon: Search, title: 'Explora', desc: 'Navega nuestro catálogo y descubre productos de alta calidad.' },
  { icon: Package, title: 'Selecciona', desc: 'Añade los productos que necesites a tu lista de cotización.' },
  { icon: FileText, title: 'Solicita', desc: 'Completa tus datos y envía la solicitud. Te responderemos en breve.' },
  { icon: MessageCircle, title: 'Recibe', desc: 'Nuestro equipo te contactará por WhatsApp o correo con los precios.' },
]

export default function NosotrosPage() {
  return (
    <div className="flex-1 bg-[#f4f7f6]">
      {/* HERO */}
      <section className="relative bg-brand-secondary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[radial-gradient(#e67e22_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-4"
          >
            <span className="text-white">COIN</span><span className="text-brand-primary">BACA</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 font-medium max-w-2xl mx-auto"
          >
            Concretera Industrial Barinas, C.A.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-400 mt-3 max-w-xl mx-auto"
          >
            Calidad que construye tu futuro
          </motion.p>
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-4 py-20"
      >
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-6">Quiénes Somos</h2>
          <div className="w-20 h-1.5 bg-brand-primary rounded-full mb-8" />
          <div className="space-y-5 text-lg text-gray-600 leading-relaxed max-w-3xl">
            <p>
              <strong className="text-gray-900">COINBACA</strong> es una empresa venezolana con sede en Barinas,
              especializada en la fabricación y comercialización de productos de concreto para los sectores
              de infraestructura, construcción, agropecuario y ornamental.
            </p>
            <p>
              Nacimos con la visión de ofrecer materiales de construcción de alta calidad a precios justos,
              impulsando el desarrollo de obras públicas y privadas en la región de los Llanos.
              Contamos con una planta industrial equipada y un equipo humano comprometido con la excelencia.
            </p>
            <p>
              Desde tubos de concreto para drenaje y alcantarillado, hasta bebederos para ganado,
              macetas ornamentales y bloques de construcción — cada producto que sale de nuestra planta
              cumple con los más altos estándares de resistencia y durabilidad.
            </p>
          </div>
        </div>
      </motion.section>

      {/* MISIÓN Y VISIÓN */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div variants={fadeUp} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
            <div className="w-14 h-14 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6">
              <Target size={28} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">Misión</h3>
            <p className="text-gray-600 leading-relaxed">
              Proveer productos de concreto de alta calidad que contribuyan al desarrollo
              de infraestructura en Venezuela, ofreciendo soluciones duraderas y accesibles
              para nuestros clientes, con un servicio responsable y puntual.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
            <div className="w-14 h-14 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6">
              <Eye size={28} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">Visión</h3>
            <p className="text-gray-600 leading-relaxed">
              Ser la empresa líder en la fabricación de productos de concreto en los Llanos
              venezolanos, reconocida por la calidad de nuestros materiales, la confianza
              de nuestros clientes y nuestro compromiso con el desarrollo regional.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* CATEGORÍAS DE PRODUCTOS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-4 pb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Nuestros Productos</h2>
          <div className="w-20 h-1.5 bg-brand-primary rounded-full mx-auto mt-4" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              variants={fadeUp}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-md transition-shadow"
            >
              <cat.icon size={32} className="text-brand-primary mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.name}</h3>
              <p className="text-gray-500">{cat.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-8">
          <Link
            href="/catalogo"
            className="inline-block bg-brand-primary hover:bg-orange-600 text-white font-bold py-3.5 px-10 rounded-full shadow-lg transition-all hover:-translate-y-1"
          >
            Ver Catálogo Completo
          </Link>
        </div>
      </motion.section>

      {/* CÓMO COTIZAR */}
      <section className="bg-brand-secondary text-white py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto px-4"
        >
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black tracking-tight">¿Cómo Cotizar?</h2>
            <div className="w-20 h-1.5 bg-brand-primary rounded-full mx-auto mt-4" />
            <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto">
              Solicitar una cotización en COINBACA es rápido y sencillo
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="text-center"
              >
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 border-2 border-white/20 mb-5 mx-auto">
                  <step.icon size={32} className="text-brand-primary" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-brand-primary text-white text-xs font-black flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link
              href="/cotizacion"
              className="inline-block bg-brand-primary hover:bg-orange-600 text-white font-bold py-4 px-12 rounded-full shadow-lg transition-all hover:-translate-y-1 text-lg"
            >
              Solicitar Cotización Ahora
            </Link>
          </div>
        </motion.div>
      </section>

      {/* CONTACTO */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-4 py-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Contacto</h2>
          <div className="w-20 h-1.5 bg-brand-primary rounded-full mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wide">WhatsApp</p>
                  <a href={`https://wa.me/584141234567`} target="_blank" className="text-gray-900 font-bold hover:text-brand-primary transition">
                    +58 414 1234567
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wide">Email</p>
                  <a href="mailto:ventas@coinbaca.com" className="text-gray-900 font-bold hover:text-brand-primary transition">
                    ventas@coinbaca.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 text-brand-primary flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wide">Dirección</p>
                  <p className="text-gray-900 font-bold">Planta Principal, Zona Industrial de Barinas, Barinas, Venezuela.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wide">Horario</p>
                  <p className="text-gray-900 font-bold">Lun - Vie: 7:00 AM - 5:00 PM</p>
                  <p className="text-gray-500 text-sm">Sábados: 7:00 AM - 12:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6">
              <Building2 size={40} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">
              COIN<span className="text-brand-primary">BACA</span>
            </h3>
            <p className="text-gray-500 font-medium mt-2">Concretera Industrial Barinas, C.A.</p>
            <p className="text-gray-400 text-sm mt-1">RIF: J-30738485-4</p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://wa.me/584141234567"
                target="_blank"
                className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors"
              >
                Escribir por WhatsApp
              </a>
              <Link
                href="/catalogo"
                className="px-6 py-3 bg-brand-primary text-white font-bold rounded-xl hover:bg-orange-600 transition-colors"
              >
                Ver Catálogo
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
