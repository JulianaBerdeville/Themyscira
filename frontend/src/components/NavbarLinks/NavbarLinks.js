import React from 'react';

function NavbarLinks () {

    return (
        <>
            <div>
                <ul className="navbar-links">
                    <li className="navbar-links__list-item">
                        <a href="/" className="navbar-links__path">HOME</a>
                    </li>

                    <li className="navbar-links__list-item">
                        <a href="/sobre-nos" className="navbar-links__path">SOBRE NÓS</a>
                    </li>

                    <li className="navbar-links__list-item">
                        <a href="/conversas" className="navbar-links__path">CONVERSAS</a>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default NavbarLinks;