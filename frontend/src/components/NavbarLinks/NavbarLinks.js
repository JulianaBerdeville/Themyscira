import React from 'react';
import { useHistory } from 'react-router-dom';

function NavbarLinks() {
    let history = useHistory();

    const goToHomePage = () => {
        history.push('/');
    }
    const goToAboutUsPage = () => {
        history.push('/sobre-nos');
    }
    const goToForumPage = () => {
        history.push('/conversas');
    }

    return (
        <>
            <div>
                <ul className="navbar-links">
                    <li className="navbar-links__list-item">
                        <span onClick={goToHomePage} className="navbar-links__path">HOME</span>
                    </li>

                    <li className="navbar-links__list-item">
                        <span onClick={goToAboutUsPage} className="navbar-links__path">SOBRE NÓS</span>
                    </li>

                    <li className="navbar-links__list-item">
                        <span onClick={goToForumPage} className="navbar-links__path">CONVERSAS</span>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default NavbarLinks;