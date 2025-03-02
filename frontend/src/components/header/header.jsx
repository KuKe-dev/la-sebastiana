import './Header.css';
import iconShoppingCart from '../../assets/icons/shopping cart.svg';
import iconMessages from '../../assets/icons/messages.svg';
import logo from '../../assets/images/logo.jpg';

function Header() {
  return (
    <nav className="navbar">
      {/* Userbar section */}
      <header className="userbar">
        {/* Logo */}
        <img
          src={logo}
          width="64px"
          className="userbar-logo"
          alt="Logo"
        />

        {/* Search bar */}
        <input
          type="text"
          placeholder="Buscar"
          className="userbar-search"
          aria-label="Buscar" //* Add aria-label for accessibility
        />

        {/* Home button */}
        <button className="userbar-home" aria-label="Inicio">
          <div>Inicio</div>
        </button>

        {/* Shopping cart button */}
        <button className="userbar-button" aria-label="Carrito de compras">
          <img src={iconShoppingCart} alt="Carrito de compras" /> {/* Add alt text */}
        </button>

        {/* Messages button */}
        <button className="userbar-button" aria-label="Mensajes">
          <img src={iconMessages} alt="Mensajes" /> {/* Add alt text */}
        </button>
      </header>

      {/* Navigation aside */}
      <aside>
        <button aria-label="Todos los productos">
          <p>Todos los productos</p>
        </button>
        <button aria-label="Deco">
          <p>Deco</p>
        </button>
        <button aria-label="Desayuno y merienda">
          <p>Desayuno y merienda</p>
        </button>
        <button aria-label="Mascotas">
          <p>Mascotas</p>
        </button>
      </aside>
    </nav>
  );
}

export default Header;