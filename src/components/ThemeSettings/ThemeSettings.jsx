import React, { useState, useEffect } from 'react';
import './ThemeSettings.css';

const ThemeSettings = () => {
    // Theme default colors mapping
    const themeDefaults = {
        dark: { primary: '#8b0000', light: '#bfbfbf', dark: '#1a1a1a' },
        light: { primary: '#8b0000', light: '#bfbfbf', dark: '#1a1a1a' },
        cyberpunk: { primary: '#00ff9f', light: '#00d4ff', dark: '#0a0e27' },
        ocean: { primary: '#0077be', light: '#90e0ef', dark: '#001e3c' }
    };

    // Get saved theme or default to 'dark'
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    // Get saved theme colors or defaults
    const [themeColors, setThemeColors] = useState(() => {
        const saved = localStorage.getItem('themeColors');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Ensure all themes exist, add missing ones with defaults
            const completeThemeColors = { ...themeDefaults };
            Object.keys(parsed).forEach(themeKey => {
                if (completeThemeColors[themeKey]) {
                    completeThemeColors[themeKey] = parsed[themeKey];
                }
            });
            return completeThemeColors;
        }
        return { ...themeDefaults };
    });

    const [isOpen, setIsOpen] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);

    // Get current theme's colors for the color pickers
    const currentColors = themeColors[theme] || themeDefaults[theme];

    // Apply theme and colors on mount and when changed
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Apply current theme's colors
        const root = document.documentElement;
        root.style.setProperty('--primary', currentColors.primary);
        root.style.setProperty('--light', currentColors.light);
        root.style.setProperty('--dark', currentColors.dark);
    }, [theme, currentColors]);

    // Save theme colors to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('themeColors', JSON.stringify(themeColors));
    }, [themeColors]);

    const handleColorChange = (colorName, value) => {
        setThemeColors(prev => ({
            ...prev,
            [theme]: {
                ...prev[theme],
                [colorName]: value
            }
        }));
    };

    const resetColors = () => {
        // Reset only current theme's colors to defaults
        setThemeColors(prev => ({
            ...prev,
            [theme]: { ...themeDefaults[theme] }
        }));
    };

    return (
        <>
            {/* Floating Settings Button */}
            <button
                className="theme-toggle-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Theme Settings"
            >
                <i className="ti ti-settings"></i>
            </button>

            {/* Settings Panel */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="theme-backdrop"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Settings Panel */}
                    <div className="theme-panel">
                        <div className="theme-panel-header">
                            <h3>Theme Settings</h3>
                            <button
                                className="theme-close-btn"
                                onClick={() => setIsOpen(false)}
                            >
                                <i className="ti ti-x"></i>
                            </button>
                        </div>

                        <div className="theme-panel-content">
                            {/* Theme Selection */}
                            <div className="theme-section">
                                <h4>Theme Selection</h4>
                                <div className="theme-mode-toggle">
                                    {/* Dark Theme Button */}
                                    <button
                                        className={`theme-mode-btn theme-btn-dark ${theme === 'dark' ? 'active' : ''}`}
                                        onClick={() => setTheme('dark')}
                                    >
                                        <i className="ti ti-moon"></i>
                                        <span>Dark</span>
                                    </button>

                                    {/* Light Theme Button */}
                                    <button
                                        className={`theme-mode-btn theme-btn-light ${theme === 'light' ? 'active' : ''}`}
                                        onClick={() => setTheme('light')}
                                    >
                                        <i className="ti ti-sun"></i>
                                        <span>Light</span>
                                    </button>

                                    {/* Cyberpunk Theme Button */}
                                    <button
                                        className={`theme-mode-btn theme-btn-cyberpunk ${theme === 'cyberpunk' ? 'active' : ''}`}
                                        onClick={() => setTheme('cyberpunk')}
                                    >
                                        <i className="ti ti-cpu"></i>
                                        <span>Cyberpunk</span>
                                    </button>

                                    {/* Ocean Theme Button */}
                                    <button
                                        className={`theme-mode-btn theme-btn-ocean ${theme === 'ocean' ? 'active' : ''}`}
                                        onClick={() => setTheme('ocean')}
                                    >
                                        <i className="ti ti-droplet"></i>
                                        <span>Ocean</span>
                                    </button>
                                </div>
                            </div>

                            {/* Custom Colors */}
                            <div className="theme-section">
                                <div
                                    className="theme-section-header"
                                    onClick={() => setShowColorPicker(!showColorPicker)}
                                >
                                    <h4>Custom Colors</h4>
                                    <button
                                        className="theme-expand-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowColorPicker(!showColorPicker);
                                        }}
                                    >
                                        <i className={`ti ti-chevron-${showColorPicker ? 'up' : 'down'}`}></i>
                                    </button>
                                </div>

                                {showColorPicker && (
                                    <div className="color-pickers">
                                        {/* Primary Color */}
                                        <div className="color-picker-item">
                                            <label>
                                                <span className="color-label">Primary</span>
                                                <span className="color-value">{currentColors.primary}</span>
                                            </label>
                                            <div className="color-input-wrapper">
                                                <input
                                                    type="color"
                                                    value={currentColors.primary}
                                                    onChange={(e) => handleColorChange('primary', e.target.value)}
                                                    className="color-input"
                                                />
                                                <div
                                                    className="color-preview"
                                                    style={{ background: currentColors.primary }}
                                                />
                                            </div>
                                        </div>

                                        {/* Light Color */}
                                        <div className="color-picker-item">
                                            <label>
                                                <span className="color-label">Light</span>
                                                <span className="color-value">{currentColors.light}</span>
                                            </label>
                                            <div className="color-input-wrapper">
                                                <input
                                                    type="color"
                                                    value={currentColors.light}
                                                    onChange={(e) => handleColorChange('light', e.target.value)}
                                                    className="color-input"
                                                />
                                                <div
                                                    className="color-preview"
                                                    style={{ background: currentColors.light }}
                                                />
                                            </div>
                                        </div>

                                        {/* Dark Color */}
                                        <div className="color-picker-item">
                                            <label>
                                                <span className="color-label">Dark</span>
                                                <span className="color-value">{currentColors.dark}</span>
                                            </label>
                                            <div className="color-input-wrapper">
                                                <input
                                                    type="color"
                                                    value={currentColors.dark}
                                                    onChange={(e) => handleColorChange('dark', e.target.value)}
                                                    className="color-input"
                                                />
                                                <div
                                                    className="color-preview"
                                                    style={{ background: currentColors.dark }}
                                                />
                                            </div>
                                        </div>

                                        {/* Reset Button */}
                                        <button
                                            className="reset-colors-btn"
                                            onClick={resetColors}
                                        >
                                            <i className="ti ti-refresh"></i>
                                            Reset {theme} theme to defaults
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ThemeSettings;