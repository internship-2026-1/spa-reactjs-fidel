import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectCartCount } from "../store/slices/cartSlice";
import './StorefrontLayout.css'
import { CartIcon, UserIcon} from "../components";
import { Text, Button } from 'lib-components-react'

function StorefrontNavbar() {
    const cartCount = useSelector(selectCartCount)
    const { pathname } = useLocation()

    const isComponentesActive = pathname === '/home' || pathname.startsWith('/product/')

    return (
        <header className="storefront-navbar">
            <Link to="/home" className="storefront-navbar__brand">
            <Text variant="HeadlineMedium">TECHSPEC</Text>
            </Link>

            <nav className="storefront-navbar__nav">
                <Link to="/sistemas" className="storefront-navbar__link">
                <Text variant="BodyLarge">SISTEMAS</Text>
                </Link>

                <Link
                to="/home"
                className={`storefront-navbar__link${isComponentesActive ? ' storefront-navbar__link--active' : ''}`}
                >
                    <Text variant="BodyLarge">COMPONENTES</Text>
                </Link>

                <Link to="/promotions" className="storefront-navbar__link">
                <Text variant="BodyLarge">PROMOCIONES</Text>
                </Link>
            </nav>

            <div className="storefront-navbar__actions">
                <Link to="/cart" className="storefront-navbar__icon-btn">
                <CartIcon />
                {cartCount > 0 && (
                    <span className="storefront-navbar__badge">{cartCount}</span>
                )}
                </Link>

                <Link to="/login" className="storefront-navbar__icon-btn">
                <UserIcon />
                </Link>
            </div>

            
        </header>
    )
}

export function StorefrontLayout({ children }) {
    return (
        <div className="storefront-layout">
            <StorefrontNavbar />

            <main className="storefront-layout__content">{children}</main>
        </div>
    )
}