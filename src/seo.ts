import { useEffect } from 'react'

export function useSeo({ title, description }: { title: string; description?: string }) {
	useEffect(() => {
		if (title) document.title = title
		if (description) {
			let el = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
			if (!el) {
				el = document.createElement('meta')
				el.setAttribute('name', 'description')
				document.head.appendChild(el)
			}
			el.setAttribute('content', description)
		}
	}, [title, description])
} 