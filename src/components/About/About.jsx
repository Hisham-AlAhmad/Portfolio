import { useState, useEffect } from "react";
import StickerPeel from "../StickerPeel/StickerPeel";
import "./About.css";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("skills");
  const [skillView, setSkillView] = useState("categories"); // 'categories' or 'interactive'

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );
    const section = document.getElementById("about-section");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const skills = {
    frontend: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" }
    ],
    backend: [
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" }
    ],
    tools: [
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "PyCharm", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg" },
      { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" }
    ],
    database: [
      { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      // { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" }
    ]
  };

  const experiences = [
    {
      icon: "💻",
      title: "Full Stack Developer",
      company: "Freelance",
      date: "2021 - Present",
      description: "Building custom web applications for clients worldwide using React, Python, and modern technologies."
    },
    {
      icon: "🚀",
      title: "Web Developer",
      company: "Personal Projects",
      date: "2020 - 2021",
      description: "Created personal projects to enhance skills in full-stack development."
    }
    // Add more experiences here - the section will expand vertically
  ];

  const education = [
    {
      icon: "🎓",
      title: "Computer Science",
      school: "Lebanese International University - LIU",
      date: "2021 - 2024",
      description: "Earned a solid foundation in computer science through coursework and hands-on projects covering programming, algorithms, databases, and software development."
    }
  ];

  const stats = [
    { number: "3+", label: "Years Experience" },
    // { number: "50+", label: "Projects Completed" },
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
          <div className="about-image-wrapper">
            <div className="image-glow"></div>
            <img src="/img/Me.png" alt="About Me" className="about-image" />
            <div className="image-badge">
              <span className="badge-text">Computer Scientist </span>
            </div>
          </div>

          <div className="about-text">
            <h3 className="about-title">Hello! I'm Hisham Al Ahmad</h3>
            <p className="description">
              A passionate Full Stack Developer with a love for creating elegant,
              user-friendly web applications.
            </p>
            <p className="description">
              I specialize in building scalable solutions using modern technologies
              like React, Python, and Node.js.
            </p>
            <p className="description">
              When I'm not coding, I explore new technologies, contribute to open-source
              projects, or share my knowledge with the developer community.
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