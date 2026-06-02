'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Building2 } from 'lucide-react'

interface ChatMessage {
  type: 'bot' | 'user'
  text: string
}

interface Option {
  label: string
  value: string
}

const faq: Record<string, { text: string; options: Option[] }> = {
  inicio: {
    text: '¡Hola! 👋 Soy el asistente virtual de COINBACA. ¿En qué puedo ayudarte?',
    options: [
      { label: '🏗️ Catálogo de Productos', value: 'catalogo' },
      { label: '📋 ¿Cómo cotizar?', value: 'cotizar' },
      { label: '💰 Precios y pagos', value: 'pagos' },
      { label: '🚚 Zonas de entrega', value: 'entregas' },
      { label: '⏱️ Tiempos de entrega', value: 'tiempos' },
      { label: '📍 ¿Dónde están?', value: 'ubicacion' },
      { label: '📞 Hablar con asesor', value: 'asesor' },
    ],
  },
  catalogo: {
    text: 'En COINBACA fabricamos:\n\n🏗️ **Tubos de concreto** — para drenaje, alcantarillado y conducción de agua.\n🧱 **Bloques y ladrillos** — para construcción civil.\n🐄 **Productos agropecuarios** — bebederos, comederos y canales para ganado.\n🌿 **Ornamentales** — macetas, adoquines, fuentes y bancos para jardines.\n\nTodo fabricado con los más altos estándares de calidad.',
    options: [
      { label: 'Ver catálogo completo →', value: 'ver_catalogo' },
      { label: '📋 ¿Cómo cotizar?', value: 'cotizar' },
      { label: '⬅️ Volver al inicio', value: 'inicio' },
    ],
  },
  cotizar: {
    text: 'Solicitar una cotización es muy fácil:\n\n**1️⃣ Explora** nuestro catálogo y añade los productos que necesites a tu lista.\n**2️⃣ Completa** tus datos en el formulario de cotización.\n**3️⃣ Recibe** una respuesta personalizada de nuestro equipo en horas.\n\nNo necesitas registrarte para cotizar.',
    options: [
      { label: 'Ir a cotizar ahora →', value: 'ir_cotizar' },
      { label: '🏗️ Ver productos', value: 'catalogo' },
      { label: '⬅️ Volver al inicio', value: 'inicio' },
    ],
  },
  pagos: {
    text: 'Trabajamos con **precios justos** por fabricación directa, sin intermediarios. Aceptamos:\n\n💳 **Transferencia bancaria**\n📱 **Pago móvil**\n💵 **Efectivo**\n\nConsultamos por **descuentos por volumen** para pedidos al por mayor. Contáctanos para una cotización personalizada sin compromiso.',
    options: [
      { label: '📋 Solicitar cotización', value: 'ir_cotizar' },
      { label: '📞 Hablar con asesor', value: 'asesor' },
      { label: '⬅️ Volver al inicio', value: 'inicio' },
    ],
  },
  entregas: {
    text: '✅ Sí, realizamos entregas en toda la región de **Los Llanos**:\n\n📍 Barinas\n📍 Portuguesa\n📍 Apure\n📍 Cojedes\n📍 Estados adyacentes\n\nEl costo de envío depende de la cantidad de productos y la distancia. Consúlta disponibilidad para tu zona.',
    options: [
      { label: '📋 Solicitar cotización con envío', value: 'ir_cotizar' },
      { label: '📞 Consultar disponibilidad', value: 'asesor' },
      { label: '⬅️ Volver al inicio', value: 'inicio' },
    ],
  },
  tiempos: {
    text: '⏱️ **Tiempos de entrega:**\n\n📦 **Productos estándar** — los tenemos en stock, entrega inmediata.\n🏭 **Pedidos especiales** — tiempo de fabricación de **3 a 7 días hábiles** según la cantidad y especificaciones.\n\nTrabajamos con logística propia para garantizar entregas puntuales.',
    options: [
      { label: '🚚 Ver zonas de entrega', value: 'entregas' },
      { label: '📋 Cotizar ahora', value: 'ir_cotizar' },
      { label: '⬅️ Volver al inicio', value: 'inicio' },
    ],
  },
  ubicacion: {
    text: '📍 **Nuestra planta principal:**\n\n**Zona Industrial de Barinas**\nBarinas, Venezuela\n\nTambién puedes contactarnos por:\n📧 ventas@coinbaca.com\n📱 WhatsApp: +58 414 1234567\n\nHorario: Lun - Vie 7:00 AM - 5:00 PM | Sáb 7:00 AM - 12:00 PM',
    options: [
      { label: '📞 Escribir por WhatsApp', value: 'asesor' },
      { label: '⬅️ Volver al inicio', value: 'inicio' },
    ],
  },
  asesor: {
    text: '¡Te entiendo! A veces es mejor hablar directamente. Te redirigimos a nuestro WhatsApp para que un asesor te atienda de inmediato. 😊',
    options: [
      { label: '📱 Abrir WhatsApp', value: 'abrir_whatsapp' },
      { label: '⬅️ Volver al inicio', value: 'inicio' },
    ],
  },
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-2.5 mb-3">
      <div className="w-8 h-8 rounded-full bg-brand-secondary flex items-center justify-center text-white text-[10px] font-black shrink-0">
        CB
      </div>
      <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3.5">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full bg-gray-400"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [currentOptions, setCurrentOptions] = useState<Option[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleOption = (value: string) => {
    if (value === 'abrir_whatsapp') {
      window.open('https://wa.me/584141234567', '_blank')
      return
    }
    if (value === 'ver_catalogo') {
      window.location.href = '/catalogo'
      return
    }
    if (value === 'ir_cotizar') {
      window.location.href = '/cotizacion'
      return
    }

    const entry = faq[value]
    if (!entry) return

    const userLabel = faq[value]?.options?.find(o => o.value !== value && o.value !== 'inicio' && o.value !== 'asesor' && o.value !== 'abrir_whatsapp' && o.value !== 'ver_catalogo' && o.value !== 'ir_cotizar')
    const userText = entry.options.find(o => o.value === 'inicio')
      ? `📋 ${entry.options[0]?.label || value}`
      : entry.options.find(o => o.value === value)?.label || value

    setMessages(prev => [...prev, { type: 'user', text: userText === value ? value : userText }])

    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, { type: 'bot', text: entry.text }])
      setCurrentOptions(entry.options)
      scrollToBottom()
    }, 700)
  }

  const openChat = () => {
    setIsOpen(true)
    if (messages.length === 0) {
      const inicio = faq['inicio']
      setMessages([{ type: 'bot', text: inicio.text }])
      setCurrentOptions(inicio.options)
      scrollToBottom()
    }
  }

  return (
    <>
      <AnimatePresence>
        {visible && !isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={openChat}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brand-primary text-white shadow-2xl flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer"
          >
            <MessageCircle size={26} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900/20 z-[100]"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-4 right-4 z-[110] w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-brand-secondary text-white px-5 py-4 flex items-center gap-3 shrink-0">
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white font-black text-sm">
                  CB
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm">Asistente COINBACA</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-xs text-gray-300">Online</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ backgroundColor: '#f8fafb' }}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'items-start gap-2.5'}`}
                  >
                    {msg.type === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-brand-secondary flex items-center justify-center text-white text-[10px] font-black shrink-0 mt-1">
                        CB
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] whitespace-pre-line leading-relaxed ${
                        msg.type === 'user'
                          ? 'bg-brand-primary text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm'
                          : 'bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-700 shadow-sm'
                      }`}
                    >
                      {msg.text.split('\n').map((line, j) => (
                        <span key={j}>
                          {line.startsWith('**') && line.endsWith('**')
                            ? <strong className="text-gray-900">{line.slice(2, -2)}</strong>
                            : line.includes('**')
                              ? line.split(/(\*\*[^*]+\*\*)/).map((part, k) =>
                                  part.startsWith('**') && part.endsWith('**')
                                    ? <strong key={k} className="text-gray-900">{part.slice(2, -2)}</strong>
                                    : <span key={k}>{part}</span>
                                )
                              : line
                          }
                          {j < msg.text.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}

                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              {/* Options */}
              {currentOptions.length > 0 && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-4 py-3 border-t border-gray-100 bg-white shrink-0"
                >
                  <div className="flex flex-wrap gap-2">
                    {currentOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleOption(opt.value)}
                        className="text-xs font-medium px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:bg-brand-primary/10 hover:border-brand-primary/30 hover:text-brand-primary transition-all cursor-pointer"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Footer */}
              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 shrink-0">
                <p className="text-[10px] text-gray-400 text-center">
                  Asistente virtual COINBACA · Horario: Lun-Vie 7AM-5PM
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
