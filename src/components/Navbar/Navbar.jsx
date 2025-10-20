import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { UseTheme } from "../Hooks/ThemeProvider";
import "./navbar.css";

const Navbar = () => {
    const location = useLocation();
    const navbarCollapseRef = useRef(null);

    const { theme, setTheme } = UseTheme();
    const [imgPath, setImgPath] = useState(() => {
        return localStorage.getItem("logo") || "/img/logo/darkHA_circle.png";
    });

    // Function to close the navbar
    const closeNavbar = () => {
        if (navbarCollapseRef.current && navbarCollapseRef.current.classList.contains('show')) {
            // Check if Bootstrap is available
            if (typeof bootstrap !== 'undefined') {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapseRef.current);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        }
    };

    // Close navbar when route changes
    useEffect(() => {
        closeNavbar();
    }, [location]);

    // Save the logo path to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("logo", imgPath);
    })

    // Close navbar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                navbarCollapseRef.current &&
                !navbarCollapseRef.current.contains(event.target) &&
                !event.target.classList.contains('navbar-toggler') &&
                !event.target.classList.contains('fa-bars')
            ) {
                closeNavbar();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleThemeChange = () => {
        // Toggle between light and dark themes
        const newTheme = theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        // chnage logo based on theme
        setImgPath(newTheme === 'dark' ? '/img/logo/darkHA_circle.png' : '/img/logo/lightHA_circle.png');
    };

    return (
        <nav className="navbar navbar-expand-md sticky-top shadow-sm px-4 px-lg-5 py-lg-0">
            {/* Logo */}
            <div className="navbar-brand p-0 d-flex align-items-center me-auto">
                <img src={imgPath} alt="HA" className="img-fluid"
                    onClick={handleThemeChange}
                />
            </div>

            {/* Toggler Button for Mobile */}
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
                aria-controls="navbarCollapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="fa fa-bars"></span>
            </button>

            {/* Links */}
            <div className="collapse navbar-collapse" id="navbarCollapse" ref={navbarCollapseRef}>
                <div className="navbar-nav ms-auto py-0 pe-4 text-center">
                    <NavLink to="/"
                        className={({ isActive }) =>
                            `nav-item nav-link ${isActive ? 'active' : ''}`
                        }>Home
                    </NavLink>
                    <NavLink to="/menu"
                        className={({ isActive }) =>
                            `nav-item nav-link ${isActive ? 'active' : ''}`
                        }>Menu
                    </NavLink>
                    <NavLink to="/contact"
                        className={({ isActive }) =>
                            `nav-item nav-link ${isActive ? 'active' : ''}`
                        }>Contact
                    </NavLink>
                    <NavLink to="/cart"
                        className={({ isActive }) =>
                            `nav-item nav-link ${isActive ? 'active' : ''}`
                        }> <i className="fas fa-shopping-cart me-2"></i> Cart
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;