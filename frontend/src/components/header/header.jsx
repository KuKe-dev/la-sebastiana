import React from 'react'
import './style.css'
import iconShoppingCart from '../../assets/icons/shopping cart.svg'
import iconMessages from '../../assets/icons/messages.svg'
import logo from '../../assets/img/others/file.jpg'

function Header() {

  return (
    <>
    <nav className='navbar'>
      <header className='userbar'>

        <img src={logo} width={"64px"} className='userbar-logo'></img>

        <input type='text' placeholder='Buscar' className='userbar-search'/>

        <button className='userbar-home'>
            <div>Inicio</div>
        </button>

        <button className='userbar-button'>
            <img src={iconShoppingCart}></img>
        </button>

        <button className='userbar-button'>
            <img src={iconMessages}></img>
        </button>

      </header>
      <aside>
        <button>
            <p>Todos los productos</p>
        </button>
        <button>
            <p>Deco</p>
        </button>
        <button>
            <p>Desayuno y merienda</p>
        </button>
        <button>
            <p>Mascotas</p>
        </button>
      </aside>
    </nav>
    </>
  )
}

export default Header