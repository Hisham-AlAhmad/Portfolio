import { useEffect, useState } from 'react';
import DownloadCvBtn from "../DownloadCvBtn/DownloadCvBtn";
import { UseTheme } from '../Hooks/ThemeProvider';
import TextType from "../TextType/TextType";
import './Header.css';

const Header = () => {
    const [scrollY, setScrollY] = useState(0);
    const { theme, setTheme } = UseTheme();

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const roles = ['Full Stack Developer', 'React Developer', 'Python Developer'];

    const handleThemeChange = () => {
        // Toggle between cyberpunk and dark themes
        const newTheme = theme === 'cyberpunk' ? 'dark' : 'cyberpunk';
        document.documentElement.setAttribute('data-theme', newTheme);
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className="header-container">
            {/* Animated background elements */}
            <div className="bg-elements">
                <div className="bg-circle bg-circle-1"></div>
                <div className="bg-circle bg-circle-2"></div>
            </div>

            {/* Gradient overlay */}
            <div className="gradient-overlay"></div>

            {/* Grid pattern overlay */}
            <div className="grid-pattern"></div>

            <div className="header-content">
                <div className="header-grid">
                    {/* Text Content */}
                    <div
                        className="text-content"
                        style={{
                            transform: `translateY(${scrollY * 0.1}px)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    >
                        {/* Greeting */}
                        <div className="greeting">
                            <span>Hello, I'm</span>
                        </div>

                        {/* Name with gradient */}
                        <h1 className="name">
                            <span className="gradient-text">
                                Hisham Al Ahmad
                            </span>
                        </h1>

                        {/* Typing effect role */}
                        <div className="role-container">
                            <h2 className="role-text">
                                <TextType text={roles} />
                            </h2>
                        </div>

                        {/* Description */}
                        <p className="description">
                            Crafting elegant solutions with modern technologies.
                            Passionate about building scalable applications and beautiful user experiences.
                        </p>

                        {/* CTA Buttons */}
                        <div className="cta-buttons">
                            <DownloadCvBtn />

                            {/* !!!!!!!!!!! */}
                            {/* Make this btn go down to contact me section! */}
                            <button className="btn-secondary">
                                Get In Touch
                            </button>
                        </div>

                        {/* Social Links */}
                        <div className="social-links">
                            <a href="https://github.com/Hisham-AlAhmad"
                                target="_blank" className="social-icon"
                            >
                                <i className="ti ti-brand-github"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/hisham-al-ahmad-356508296/"
                                target="_blank" className="social-icon"
                            >
                                <i className="ti ti-brand-linkedin"></i>
                            </a>
                        </div>
                    </div>

                    {/* Image */}
                    <div
                        className="image-content"
                        style={{
                            transform: `translateY(${scrollY * -0.05}px)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    >
                        <div className="image-wrapper">
                            {/* Glow effect */}
                            <div className="image-glow"></div>

                            {/* Image container */}
                            <div className="profile-image-container">
                                {/* Animated border */}
                                <div className="spinning-border"></div>
                                <div className="inner-circle"></div>

                                {/* Profile image */}
                                <img
                                    src="img/Me.png"
                                    alt="Hisham Al Ahmad"
                                    className="profile-image"
                                />

                                {/* Decorative floating elements */}
                                <div className="floating-badge badge-1">
                                    <span>⚡</span>
                                </div>
                                <div className="floating-badge badge-2"
                                    onClick={handleThemeChange}
                                >
                                    <span>💻</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="scroll-indicator">
                <i className="ti ti-arrow-down"></i>
            </div>
        </div>
    );
};

export default Header;