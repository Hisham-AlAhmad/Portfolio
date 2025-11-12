import { useState, useEffect } from "react";
import StickerPeel from "../StickerPeel/StickerPeel";
import { UseTheme } from "../Hooks/ThemeProvider";
import "./About.css";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("skills");
  const [skillView, setSkillView] = useState("categories"); // 'categories' or 'interactive'

  const { theme, setTheme } = UseTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );
    const section = document.getElementById("about-section");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const skills = {
    "Programming Languages": [
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
      { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    ],
    "AI & ML Libraries": [
      { name: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
      { name: "Numpy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
      { name: "Matplotlib", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg" },
      { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "Scikit Learn", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" }
    ],
    Tools: [
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "PyCharm", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg" },
      { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" }
    ],
    Frameworks: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
      { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" }
    ],
    Database: [
      { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      // { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" }
    ]
  };

  const experiences = [
    {
      icon: "💻",
      title: "Full Stack Website",
      company: "Freelance",
      date: "2025",
      description: "Fresh Time Store, which have an ordering menu from Fresh Juice, Crepe, Pancake, etc...",
      link: "https://freshtime1.com"
    },
    {
      icon: "🖼️",
      title: "Editing Website",
      company: "University graduation project",
      date: "2025",
      description: "Image editing website with Flask as backend.",
      link: "https://github.com/Hisham-AlAhmad/University-Final-Project"
    },
    // Add more experiences here - the section will expand vertically
  ];

  const education = [
    {
      icon: "🎓",
      title: "Computer Science",
      school: "Lebanese International University - LIU",
      date: "2021 - 2024",
      description: "Earned a solid foundation in computer science through coursework and hands-on projects covering programming, algorithms, databases, and software development.",
      gpa: "3.18/4.0"
    }
  ];

  const stats = [
    // { number: "2+", label: "Years Experience" },
    { number: "5+", label: "Certifications Earned" },
    { number: "500+", label: "Hours of Development" },
    { number: "100%", label: "Client Satisfaction" }
  ];

  const tabs = [
    { id: "skills", label: "Skills", icon: "🚀" },
    { id: "experience", label: "Experience", icon: "💼" },
    { id: "education", label: "Education", icon: "🎓" }
  ];

  return (
    <section id="about-section" className={`about-section ${isVisible ? "visible" : ""}`}>
      <div className="bg-elements">
        <div className="bg-circle bg-circle1"></div>
        <div className="bg-circle bg-circle2"></div>
      </div>

      <div className="container">
        <div className="title-wrapper fade-up">
          <h2 className="subtitle">Get To Know More</h2>
          <h1 className="title">
            About <span className="title-accent">Me</span>
          </h1>
        </div>

        {/* About Me Section */}
        <div className="about-content fade-up">
          <div className="about-image-wrapper"
            onClick={handleThemeChange}
          >
            <div className="image-glow"></div>
            <img src="/img/Me.png" alt="About Me" className="about-image" />
            <div className="image-badge">
              <span className="badge-text">Computer Scientist </span>
            </div>
          </div>

          <div className="about-text">
            <h3 className="about-title">Hello! I'm Hisham Al Ahmad</h3>
            <p className="description">
              A highly motivated Computer Science graduate with a passion for problem-solving and technology.
              I specialize in full-stack web development using React, Python, and Node.js, creating scalable,
              user-friendly applications that balance design and functionality.
            </p>
            <p className="description">
              I'm also experienced in Machine Learning, where I developed a deep learning model
              for gender classification from images—an experience that strengthened
              my analytical thinking and technical versatility.
            </p>
            <p className="description">
              Known for my creativity, organization, and positive energy,
              I approach every project with focus and genuine dedication,
              ensuring both functionality and polish in the final result.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-grid fade-up">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <h3 className="stat-number">{stat.number}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="tabs-section fade-up">
          <div className="tab-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {/* Skills Tab */}
            {activeTab === "skills" && (
              <div className="skills-content">
                {/* Skills View Toggle */}
                <div className="skills-view-toggle">
                  <button
                    className={`view-toggle-btn ${skillView === "categories" ? "active" : ""}`}
                    onClick={() => setSkillView("categories")}
                  >
                    📋 Categories
                  </button>
                  <button
                    className={`view-toggle-btn ${skillView === "interactive" ? "active" : ""}`}
                    onClick={() => setSkillView("interactive")}
                  >
                    🎨 Interactive
                  </button>
                </div>

                {skillView === "categories" ? (
                  <div className="skills-grid">
                    {Object.entries(skills).map(([category, items]) => (
                      <div key={category} className="skill-category">
                        <h4 className="category-title">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </h4>
                        <div className="skill-tags">
                          {items.map((skill) => (
                            <span key={skill.name} className="skill-tag">
                              <img src={skill.logo} alt={skill.name} className="skill-logo" />
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="interactive-skills">
                    <p className="interactive-note">
                      🎯 Drag the skill stickers around! They'll peel and stick back.
                    </p>
                    <div className="stickers-container">
                      {Object.values(skills).flat().map((skill) => (
                        <StickerPeel key={skill.name} imageSrc={skill.logo} name={skill.name} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Experience Tab */}
            {activeTab === "experience" && (
              <div className="experience-content">
                {experiences.map((exp, index) => (
                  <div key={index} className="experience-item">
                    <div className="experience-icon">{exp.icon}</div>
                    <div className="experience-details">
                      <h4 className="experience-title">{exp.title}</h4>
                      <p className="experience-company">{exp.company}</p>
                      <p className="experience-date">{exp.date}</p>
                      <p className="experience-desc">{exp.description}</p>
                      {exp.link &&
                        <a href={`${exp.link}`} target="_blank" >{exp.link.replace(/^https?:\/\//, '')}</a>
                      }
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Education Tab */}
            {activeTab === "education" && (
              <div className="education-content">
                {education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <div className="education-icon">{edu.icon}</div>
                    <div className="education-details">
                      <h4 className="education-title">{edu.title}</h4>
                      <p className="education-school">{edu.school}</p>
                      <p className="education-date">{edu.date}</p>
                      <p className="education-desc">{edu.description}</p>
                      <p className="education-gpa">GPA: {edu.gpa}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};


export default About;