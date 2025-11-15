import { useEffect, useRef, useState } from "react";
import { UseTheme } from "../Hooks/ThemeProvider";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    const navbarCollapseRef = useRef(null);
    const { theme, setTheme } = UseTheme();
    const [isHovered, setIsHovered] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    const [imgPath, setImgPath] = useState(() => {
        return localStorage.getItem("logo") || "/img/logo/darkHA_circle.png";
    });

    // Close navbar (mobile collapse)
    const closeNavbar = () => {
        if (navbarCollapseRef.current && navbarCollapseRef.current.classList.contains("show")) {
            if (typeof bootstrap !== "undefined") {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapseRef.current);
                if (bsCollapse) bsCollapse.hide();
            }
        }
    };

    // Save logo to local storage
    useEffect(() => {
        localStorage.setItem("logo", imgPath);
    }, [imgPath]);

    // Close navbar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                navbarCollapseRef.current &&
                !navbarCollapseRef.current.contains(event.target) &&
                !event.target.classList.contains("navbar-toggler") &&
                !event.target.classList.contains("fa-bars")
            ) {
                closeNavbar();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Theme change
    const handleThemeChange = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        setImgPath(newTheme === "dark" ? "/img/logo/darkHA_circle.png" : "/img/logo/lightHA_circle.png");
    };

    // Scroll to section
    const scrollToSection = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
        setActiveSection(id); // make it active after clicking
        closeNavbar();
    };

    // 🔥 Detect active section when scrolling
    useEffect(() => {
        const sections = ["home", "about", "certificates", "contact"];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.2 }
        );

        sections.forEach((id) => {
            const section = document.getElementById(id);
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <nav className="navbar navbar-expand-md sticky-top shadow-sm px-4 px-lg-5 py-lg-0">
            {/* Logo */}
            <div className="navbar-brand p-0 d-flex align-items-center me-auto">
                <img
                    src={isHovered ? "/img/logo/lightHA_circle.png" : imgPath}
                    alt="HA"
                    className="img-fluid"
                    onClick={handleThemeChange}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                />
            </div>

            {/* Toggler */}
            <Link
                className="navbar-toggler"
                type="Link"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
            >
                <span className="fa fa-bars"></span>
            </Link>

            {/* Links */}
            <div className="collapse navbar-collapse" id="navbarCollapse" ref={navbarCollapseRef}>
                <div className="navbar-nav ms-auto py-0 pe-4 text-center">

                    <Link
                        className={`nav-item nav-link ${activeSection === "home" ? "active" : ""}`}
                        onClick={() => scrollToSection("home")}
                    >
                        Home
                    </Link>

                    <Link
                        className={`nav-item nav-link ${activeSection === "about" ? "active" : ""}`}
                        onClick={() => scrollToSection("about")}
                    >
                        About
                    </Link>

                    <Link
                        className={`nav-item nav-link ${activeSection === "certificates" ? "active" : ""}`}
                        onClick={() => scrollToSection("certificates")}
                    >
                        Certificates
                    </Link>

                    <Link
                        className={`nav-item nav-link ${activeSection === "contact" ? "active" : ""}`}
                        onClick={() => scrollToSection("contact")}
                    >
                        Contact
                    </Link>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
