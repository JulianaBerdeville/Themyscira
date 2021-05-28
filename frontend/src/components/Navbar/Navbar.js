import React, { useState } from 'react';

import NavbarLinksComponent from '../NavbarLinks/NavbarLinks';

function Navbar() {

    const [navbarLinks, setNavbarLinks] = useState(false);

    const handleChange = (e) => {
        setNavbarLinks(!navbarLinks);
    };
    return (
        <div>
            <div className="spheric-navbar" onClick={handleChange}>
                {
                    (navbarLinks === false)
                        ? (<span className="spheric-navbar__navbar-title"> ||| </span>)
                        : (<span className="spheric-navbar__navbar-title"> \\\ </span>)
                }
            </div>
            {
                navbarLinks && <NavbarLinksComponent />
            }
        </div>
    )
}

export default Navbar;