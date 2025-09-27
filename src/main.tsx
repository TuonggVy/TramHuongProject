import { StrictMode, createContext, useState } from 'react'
import type { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext'

export type CartItem = { id: number; quantity: number }

type CartContextType = {
	items: CartItem[]
	add: (id: number) => void
	increment: (id: number) => void
	decrement: (id: number) => void
	remove: (id: number) => void
	clear: () => void
}

export const CartContext = createContext<CartContextType>({ items: [], add: () => {}, increment: () => {}, decrement: () => {}, remove: () => {}, clear: () => {} })

function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([])

	const add = (id: number) => {
		setItems((prev) => {
			const found = prev.find((p) => p.id === id)
			if (found) return prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
			return [...prev, { id, quantity: 1 }]
		})
	}

	const increment = (id: number) => {
		setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p)))
	}

	const decrement = (id: number) => {
		setItems((prev) => {
			const target = prev.find((p) => p.id === id)
			if (!target) return prev
			if (target.quantity <= 1) return prev.filter((p) => p.id !== id)
			return prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
		})
	}

	const remove = (id: number) => {
		setItems((prev) => prev.filter((p) => p.id !== id))
	}

	const clear = () => setItems([])

	return (
		<CartContext.Provider value={{ items, add, increment, decrement, remove, clear }}>
			{children}
		</CartContext.Provider>
	)
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<CartProvider>
				<App />
			</CartProvider>
		</AuthProvider>
	</StrictMode>,
)
