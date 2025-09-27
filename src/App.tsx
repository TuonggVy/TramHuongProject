import { BrowserRouter, Routes, Route, Link, useParams, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useContext, useMemo, useState } from 'react'
import { CartContext } from './main'
import { useSeo } from './seo'
import pic1 from './assets/pic1.jpg'
import pic2 from './assets/pic2.png'
import pic3 from './assets/pic3.webp'
import pic4 from './assets/pic4.webp'
import pic5 from './assets/pic5.png'
import pic6 from './assets/pic6.jpg'
import pic7 from './assets/pic7.jpg'
import pic8 from './assets/pic8.jpg'
import pic9 from './assets/pic9.jpg'

type Product = { id: number; name: string; category: string; price: number; salePrice?: number; image: string }

const PRODUCTS: Product[] = [
	{ id: 1, name: 'Trầm hương 1', category: 'Chuỗi trầm hương', price: 350000, salePrice: 320000, image: pic1 },
	{ id: 2, name: 'Trầm hương 2', category: 'Nhang trầm hương', price: 420000, image: pic2 },
	{ id: 3, name: 'Trầm hương 3', category: 'Phụ kiện phong thuỷ', price: 520000, salePrice: 480000, image: pic3 },
	{ id: 4, name: 'Trầm hương 4', category: 'Chuỗi trầm hương', price: 610000, image: pic4 },
	{ id: 5, name: 'Trầm hương 5', category: 'Phụ kiện phong thuỷ', price: 740000, salePrice: 690000, image: pic5 },
	{ id: 6, name: 'Trầm hương 6', category: 'Nhang trầm hương', price: 890000, image: pic6 },
	{ id: 7, name: 'Trầm hương 7', category: 'Chuỗi trầm hương', price: 990000, image: pic7 },
	{ id: 8, name: 'Trầm hương 8', category: 'Phụ kiện phong thuỷ', price: 1250000, salePrice: 1120000, image: pic8 },
	{ id: 9, name: 'Trầm hương 9', category: 'Phụ kiện phong thuỷ', price: 1580000, image: pic9 },
]

const CATEGORIES = ['Tất cả', 'Nhang trầm hương', 'Chuỗi trầm hương', 'Phụ kiện phong thuỷ']

const formatVND = (n: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n)

function Price({ price, salePrice }: { price: number; salePrice?: number }) {
	if (salePrice && salePrice < price) {
		const percent = Math.round(((price - salePrice) / price) * 100)
		return (
			<div className="flex items-center gap-3">
				<div className="inline-flex items-baseline gap-2">
					<span className="text-base font-medium">{formatVND(salePrice)}</span>
					<span className="text-sm opacity-60 line-through">{formatVND(price)}</span>
				</div>
                <span className="text-xs px-2 py-0.5 border border-black">-{percent}%</span>
			</div>
		)
	}
	return <span className="text-base">{formatVND(price)}</span>
}

function Header() {
    const navigate = useNavigate()
    const { items } = useContext(CartContext)
    const total = items.reduce((sum, it) => sum + it.quantity, 0)
    const [query, setQuery] = useState('')

    function submitSearch() {
        const q = query.trim()
        if (q) navigate(`/san-pham?q=${encodeURIComponent(q)}`)
    }

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `transition-colors ${isActive ? 'underline underline-offset-8' : 'opacity-80 hover:opacity-100'}`

  return (
        <header className="sticky top-0 z-50 border-b border-black/50 backdrop-blur bg-white/80">
			<div className="container-page flex h-16 items-center justify-between gap-4">
				<Link to="/" className="text-xl font-semibold tracking-wide">TRẦM HƯƠNG</Link>
				<nav className="hidden md:flex items-center gap-6 text-sm">
					<NavLink to="/" className={navLinkClass} end>Trang chủ</NavLink>
					<NavLink to="/san-pham" className={navLinkClass}>Sản phẩm</NavLink>
					<NavLink to="/tin-tuc" className={navLinkClass}>Tin tức</NavLink>
					<NavLink to="/gioi-thieu" className={navLinkClass}>Giới thiệu</NavLink>
					<NavLink to="/lien-he" className={navLinkClass}>Liên hệ</NavLink>
				</nav>
				<div className="flex items-center gap-2 md:gap-4">
                    <div className="relative hidden sm:block">
						<input
							type="search"
							placeholder="Tìm trầm hương..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submitSearch() } }}
                            className="h-9 w-48 md:w-64 rounded border border-black bg-transparent px-3 text-sm outline-none placeholder:opacity-60"
						/>
						<span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 opacity-60 text-xs">↵</span>
					</div>
					<Link to="/gio-hang" className="relative inline-flex items-center gap-2 text-sm">
						<span>Giỏ hàng</span>
						{total > 0 && (
                            <span className="absolute -right-3 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black text-white px-1 text-[11px]">
								{total}
							</span>
						)}
					</Link>
                    
				</div>
			</div>
			<div className="container-page md:hidden flex items-center gap-4 py-2">
				<input
					type="search"
					placeholder="Tìm trầm hương..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submitSearch() } }}
                    className="h-9 w-full rounded border border-black bg-transparent px-3 text-sm outline-none placeholder:opacity-60"
				/>
			</div>
		</header>
	)
}

function Footer() {
	return (
        <footer className="border-t border-black mt-16">
			<div className="container-page py-8 text-sm flex flex-col md:flex-row items-center justify-between gap-4 opacity-90">
				<div>© {new Date().getFullYear()} Trầm Hương. All rights reserved.</div>
				<div className="flex items-center gap-4">
					<a href="#" aria-label="Facebook">FB</a>
					<a href="#" aria-label="Instagram">IG</a>
					<a href="#" aria-label="YouTube">YT</a>
				</div>
			</div>
		</footer>
	)
}

function HomePage() {
	useSeo({ title: 'Trầm Hương - Monochrome', description: 'Cửa hàng trầm hương: vòng tay, nhang trầm, tinh dầu, phụ kiện.' })
    return (
        <main className="container-page py-10">
			<section className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div>
					<h1 className="text-3xl md:text-5xl font-bold tracking-tight">Tinh hoa trầm hương</h1>
					<p className="mt-4 max-w-2xl text-base md:text-lg opacity-80">
						Bộ sưu tập trầm hương tuyển chọn: vòng tay, nhang trầm, tinh dầu, và phụ kiện.
					</p>
					<div className="mt-6 flex gap-3">
						<Link to="/san-pham" className="button-primary">Khám phá ngay</Link>
						<Link to="/tin-tuc" className="button-primary">Đọc tin tức</Link>
					</div>
				</div>
				<div className="w-full">
                    <div className="h-64 md:h-80 w-full bg-gradient-to-br from-black/90 to-transparent p-0 relative overflow-hidden rounded-md border border-black">
						<img loading="lazy" src={pic1} alt="Trầm hương" className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity" />
					</div>
				</div>
			</section>

			<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{PRODUCTS.slice(0,3).map((p) => (
					<Link key={p.id} to={`/san-pham/${p.id}`} className="card card-hover group p-0">
						<div className="relative">
							<img loading="lazy" src={p.image} alt={p.name} className="w-full h-56 object-cover" />
                            {p.salePrice && p.salePrice < p.price && (
                                <span className="absolute left-2 top-2 bg-black text-white text-xs px-2 py-0.5">SALE</span>
                            )}
						</div>
						<div className="p-6">
							<h3 className="text-lg font-medium">{p.name}</h3>
							<div className="mt-1 text-sm opacity-80"><Price price={p.price} salePrice={p.salePrice} /></div>
      </div>
					</Link>
				))}
			</section>
		</main>
	)
}

function ProductListPage() {
	const navigate = useNavigate()
	const { search } = useLocation()
	const params = useMemo(() => new URLSearchParams(search), [search])
	const q = (params.get('q') || '').toLowerCase().trim()
	const category = params.get('category') || 'Tất cả'
	useSeo({ title: q ? `Sản phẩm: ${q}` : 'Tất cả sản phẩm', description: 'Danh sách sản phẩm trầm hương: vòng tay, nhang trầm, tinh dầu, phụ kiện.' })
	const filtered = useMemo(() => {
		let data = PRODUCTS
		if (category && category !== 'Tất cả') data = data.filter((p) => p.category === category)
		if (q) data = data.filter((p) => p.name.toLowerCase().includes(q))
		return data
	}, [q, category])

	function setCategory(next: string) {
		const nextParams = new URLSearchParams(search)
		if (next === 'Tất cả') nextParams.delete('category')
		else nextParams.set('category', next)
		navigate(`/san-pham?${nextParams.toString()}`)
	}

	return (
		<main className="container-page py-10">
			<h2 className="text-2xl font-semibold">Tất cả sản phẩm{q ? `: "${q}"` : ''}</h2>
			<div className="mt-4 flex flex-wrap items-center gap-2">
				{CATEGORIES.map((c) => (
                    <button
                        key={c}
                        onClick={() => setCategory(c)}
                        className={`px-3 py-1 text-sm border ${c === category ? 'bg-black text-white' : 'border-black'}`}
                    >
						{c}
        </button>
				))}
			</div>
			<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{filtered.map((p) => (
                    <Link key={p.id} to={`/san-pham/${p.id}`} className="card card-hover hover:bg-black hover:text-white">
						<div className="relative">
							<img loading="lazy" src={p.image} alt={p.name} className="w-full h-56 object-cover" />
                            {p.salePrice && p.salePrice < p.price && (
                                <span className="absolute left-2 top-2 bg-black text-white text-xs px-2 py-0.5">SALE</span>
                            )}
						</div>
						<div className="p-6">
							<h3 className="font-medium">{p.name}</h3>
							<p className="text-xs opacity-60 mt-1">{p.category}</p>
							<div className="mt-1 text-sm opacity-80"><Price price={p.price} salePrice={p.salePrice} /></div>
						</div>
					</Link>
				))}
			</div>
			{filtered.length === 0 && (
				<p className="mt-6 opacity-70">Không tìm thấy sản phẩm phù hợp.</p>
			)}
		</main>
	)
}

function ProductDetailPage() {
	const { add } = useContext(CartContext)
	const params = useParams()
	const id = Number(params.id || '1')
	const product = useMemo(() => {
		const pid = isNaN(id) ? 1 : Math.max(1, Math.min(9, id))
		return PRODUCTS.find((p) => p.id === pid) || PRODUCTS[0]
	}, [id])
	useSeo({ title: `${product.name} - Trầm Hương`, description: `Mua ${product.name} - ${formatVND(product.salePrice && product.salePrice < product.price ? product.salePrice : product.price)}.` })
	return (
		<main className="container-page py-10">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div>
                    <div className="rounded-md border border-black overflow-hidden">
						<img loading="lazy" src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
					</div>
				</div>
				<div>
					<h1 className="text-2xl font-semibold">{product.name}</h1>
					<p className="mt-1 text-sm opacity-60">Danh mục: {product.category}</p>
					<div className="mt-2"><Price price={product.price} salePrice={product.salePrice} /></div>
					<p className="mt-3 opacity-80">Mùi hương thuần khiết, giúp thư giãn và tĩnh tâm.</p>
					<div className="mt-6 flex items-center gap-4">
						<button className="button-primary" onClick={() => add(product.id)}>Thêm vào giỏ</button>
					</div>
				</div>
			</div>
		</main>
	)
}

function CheckoutPage() {
	useSeo({ title: 'Thanh toán - Trầm Hương', description: 'Nhập thông tin thanh toán và hoàn tất đơn hàng trầm hương.' })
	const navigate = useNavigate()
	const { items, clear } = useContext(CartContext)
	const enriched = items.map((it) => {
		const pid = Math.max(1, Math.min(9, it.id))
		const p = PRODUCTS.find((pr) => pr.id === pid)!
		const unit = p.salePrice && p.salePrice < p.price ? p.salePrice : p.price
		return { ...it, product: p, unitPrice: unit, lineTotal: unit * it.quantity }
	})
	const subtotal = enriched.reduce((s, it) => s + it.lineTotal, 0)
	const shipping = enriched.length > 0 ? 30000 : 0
	const grandTotal = subtotal + shipping

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		clear()
		navigate('/')
		alert('Đặt hàng thành công!')
	}

	return (
		<main className="container-page py-10">
			<h2 className="text-2xl font-semibold">Thanh toán</h2>
			<div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
				<form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm opacity-80">Họ và tên</label>
                            <input required className="mt-1 w-full rounded border border-black bg-transparent px-3 py-2" />
                        </div>
						<div>
							<label className="text-sm opacity-80">Số điện thoại</label>
                            <input required type="tel" className="mt-1 w-full rounded border border-black bg-transparent px-3 py-2" />
						</div>
						<div className="md:col-span-2">
							<label className="text-sm opacity-80">Địa chỉ</label>
                            <input required className="mt-1 w-full rounded border border-black bg-transparent px-3 py-2" />
						</div>
						<div className="md:col-span-2">
							<label className="text-sm opacity-80">Ghi chú</label>
                            <textarea className="mt-1 w-full rounded border border-black bg-transparent px-3 py-2 h-24" />
						</div>
					</div>
					<button type="submit" className="button-primary">Đặt hàng</button>
				</form>
                <aside className="border border-black p-4 h-fit space-y-3">
					<p className="font-semibold">Đơn hàng</p>
					<ul className="space-y-2 text-sm">
						{enriched.map((it) => (
							<li key={it.id} className="flex justify-between">
								<span>{it.product.name} x{it.quantity}</span>
								<span>{formatVND(it.lineTotal)}</span>
							</li>
						))}
					</ul>
					<div className="space-y-1 text-sm">
						<div className="flex justify-between"><span>Tạm tính</span><span>{formatVND(subtotal)}</span></div>
						<div className="flex justify-between"><span>Vận chuyển</span><span>{formatVND(shipping)}</span></div>
						<div className="flex justify-between text-base font-medium"><span>Tổng cộng</span><span>{formatVND(grandTotal)}</span></div>
					</div>
				</aside>
			</div>
		</main>
	)
}

function ContactPage() {
	useSeo({ title: 'Liên hệ - Trầm Hương', description: 'Liên hệ cửa hàng trầm hương để được tư vấn.' })
	return (
		<main className="container-page py-10">
			<h2 className="text-2xl font-semibold">Liên hệ</h2>
			<p className="mt-3 opacity-80">Mọi thắc mắc xin gửi về email: contact@tramhuong.vn hoặc gọi 0900 000 000.</p>
            <form className="mt-6 max-w-xl space-y-3">
                <input placeholder="Họ và tên" className="w-full rounded border border-black bg-transparent px-3 py-2" />
                <input placeholder="Email" type="email" className="w-full rounded border border-black bg-transparent px-3 py-2" />
                <textarea placeholder="Nội dung" className="w-full h-32 rounded border border-black bg-transparent px-3 py-2" />
				<button className="button-primary">Gửi</button>
			</form>
		</main>
	)
}

function AboutPage() {
	useSeo({ title: 'Giới thiệu - Trầm Hương', description: 'Về cửa hàng trầm hương và sứ mệnh phục vụ khách hàng.' })
	return (
		<main className="container-page py-10">
			<h2 className="text-2xl font-semibold">Giới thiệu</h2>
			<p className="mt-3 opacity-80 max-w-2xl">Chúng tôi mang đến sản phẩm trầm hương tuyển chọn, hướng tới sự thư thái và tĩnh tại. Mỗi sản phẩm đều được chăm chút về chất lượng và trải nghiệm.</p>
		</main>
	)
}

function CartPage() {
	const { items, increment, decrement, remove, clear } = useContext(CartContext)
	useSeo({ title: 'Giỏ hàng - Trầm Hương', description: 'Xem và chỉnh sửa giỏ hàng trầm hương của bạn.' })
	const enriched = items.map((it) => {
		const pid = Math.max(1, Math.min(9, it.id))
		const p = PRODUCTS.find((pr) => pr.id === pid)!
		const unit = p.salePrice && p.salePrice < p.price ? p.salePrice : p.price
		return { ...it, product: p, unitPrice: unit, lineTotal: unit * it.quantity }
	})
	const subtotal = enriched.reduce((s, it) => s + it.lineTotal, 0)
	const shipping = enriched.length > 0 ? 30000 : 0
	const grandTotal = subtotal + shipping
	return (
		<main className="container-page py-10">
			<h2 className="text-2xl font-semibold">Giỏ hàng</h2>
			{items.length === 0 ? (
				<p className="mt-3 opacity-80">Chưa có sản phẩm nào.</p>
			) : (
				<div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-3">
                        {enriched.map((it) => (
                            <div key={it.id} className="flex gap-4 border border-black p-3">
                                <img src={it.product.image} alt={it.product.name} className="h-20 w-20 object-cover border border-black" />
								<div className="flex-1">
									<div className="flex items-start justify-between gap-4">
										<div>
											<p className="font-medium">{it.product.name}</p>
											<div className="text-sm opacity-70"><Price price={it.product.price} salePrice={it.product.salePrice} /></div>
										</div>
										<button onClick={() => remove(it.id)} className="text-sm opacity-70 hover:opacity-100">Xóa</button>
									</div>
									<div className="mt-3 flex items-center justify-between">
										<div className="inline-flex items-center gap-2">
                                            <button onClick={() => decrement(it.id)} className="h-8 w-8 border border-black inline-flex items-center justify-center">-</button>
											<span className="min-w-8 text-center">{it.quantity}</span>
                                            <button onClick={() => increment(it.id)} className="h-8 w-8 border border-black inline-flex items-center justify-center">+</button>
										</div>
										<p className="text-sm">Thành tiền: <span className="font-medium">{formatVND(it.lineTotal)}</span></p>
									</div>
								</div>
							</div>
						))}
					</div>
                    <aside className="border border-black p-4 h-fit space-y-3">
						<p className="font-semibold">Tổng quan</p>
						<div className="space-y-1 text-sm">
							<div className="flex justify-between"><span>Tạm tính</span><span>{formatVND(subtotal)}</span></div>
							<div className="flex justify-between"><span>Vận chuyển</span><span>{formatVND(shipping)}</span></div>
							<div className="flex justify-between text-base font-medium"><span>Tổng cộng</span><span>{formatVND(grandTotal)}</span></div>
						</div>
						<div className="flex gap-2">
							<Link to="/thanh-toan" className="button-primary flex-1 text-center">Thanh toán</Link>
                            <button onClick={() => clear()} className="flex-1 border border-black px-4 py-2 text-sm hover:bg-black hover:text-white transition-colors">Xóa tất cả</button>
						</div>
					</aside>
				</div>
			)}
		</main>
	)
}

const POSTS = [
	{ id: 1, title: 'Cách phân biệt trầm hương tự nhiên', excerpt: 'Nhận biết trầm hương chất lượng qua hương thơm và vân gỗ...', content: 'Nội dung bài viết 1. Mô tả chi tiết cách phân biệt trầm hương tự nhiên và nhân tạo...', date: '2025-09-01' },
	{ id: 2, title: 'Lợi ích của nhang trầm', excerpt: 'Nhang trầm giúp thư giãn, tĩnh tâm và khử mùi...', content: 'Nội dung bài viết 2. Tác dụng và cách sử dụng nhang trầm hiệu quả...', date: '2025-08-20' },
	{ id: 3, title: 'Bảo quản vòng tay trầm', excerpt: 'Giữ mùi hương bền lâu và vân gỗ đẹp...', content: 'Nội dung bài viết 3. Hướng dẫn chi tiết bảo quản vòng tay trầm...', date: '2025-08-05' },
]

function BlogListPage() {
	useSeo({ title: 'Tin tức - Trầm Hương', description: 'Tin tức, chia sẻ và kiến thức về trầm hương.' })
	return (
		<main className="container-page py-10">
			<h2 className="text-2xl font-semibold">Tin tức</h2>
			<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {POSTS.map((p) => (
                    <Link key={p.id} to={`/tin-tuc/${p.id}`} className="border border-black p-4 hover:bg-black hover:text-white transition-colors">
						<p className="text-sm opacity-60">{p.date}</p>
						<h3 className="mt-1 font-medium">{p.title}</h3>
						<p className="mt-2 text-sm opacity-80">{p.excerpt}</p>
					</Link>
				))}
      </div>
		</main>
	)
}

function BlogDetailPage() {
	const params = useParams()
	const id = Number(params.id || '1')
	const post = useMemo(() => POSTS.find((p) => p.id === id) || POSTS[0], [id])
	useSeo({ title: `${post.title} - Tin tức`, description: post.excerpt })
	return (
		<main className="container-page py-10">
			<p className="text-sm opacity-60">{post.date}</p>
			<h1 className="mt-1 text-2xl font-semibold">{post.title}</h1>
			<article className="mt-4 max-w-3xl leading-relaxed opacity-90">
				{post.content}
			</article>
		</main>
	)
}

export default function App() {
	return (
		<BrowserRouter>
			<div className="min-h-screen flex flex-col">
                <Header />
				<div className="flex-1">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/san-pham" element={<ProductListPage />} />
						<Route path="/san-pham/:id" element={<ProductDetailPage />} />
						<Route path="/gio-hang" element={<CartPage />} />
						<Route path="/thanh-toan" element={<CheckoutPage />} />
						<Route path="/tin-tuc" element={<BlogListPage />} />
						<Route path="/tin-tuc/:id" element={<BlogDetailPage />} />
						<Route path="/lien-he" element={<ContactPage />} />
						<Route path="/gioi-thieu" element={<AboutPage />} />
					</Routes>
				</div>
				<Footer />
			</div>
		</BrowserRouter>
	)
}
