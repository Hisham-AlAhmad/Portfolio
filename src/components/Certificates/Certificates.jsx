import { useState, useEffect } from 'react';
import './Certificates.css';

const certificatesData = [
    {
        id: 1,
        title: 'University Certificate',
        filename: 'University certificate.pdf'
    },
    {
        id: 2,
        title: 'Python Certificate',
        filename: 'Certification_by_codingGames.pdf'
    },
    {
        id: 3,
        title: 'Robotics Certificate',
        filename: 'Robotics ToT certificate.pdf'
    },
    {
        id: 4,
        title: 'Mobile Application Certificate',
        filename: 'Mobile application certificate.pdf'
    },
    {
        id: 5,
        title: 'AI for social impact Certificate',
        filename: 'Hisham Basim Al Ahmad AI for social impact.pdf'
    },
    {
        id: 6,
        title: 'CyberOPS Associate Certificate',
        filename: 'HishamAl Ahmad-CSCI362-CyberOPS-certificate.pdf'
    },
    {
        id: 7,
        title: 'CCNA',
        filename: 'HishamAl Ahmad-CCNA 1 - D - Tyr-certificate.pdf'
    },
    {
        id: 8,
        title: 'CCNA',
        filename: 'HishamAl Ahmad-CISCO2_07E_F21-certificate.pdf'
    },
    {
        id: 9,
        title: 'CCNA',
        filename: 'HishamAl Ahmad-CCNA 2 - B - Tyr-certificate.pdf'
    },
        {
        id: 10,
        title: 'Jeel Volunteer Certificate',
        filename: 'Jeel certificate.pdf'
    },
];

const CertificateCard = ({ certificate, index }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), index * 100);
        return () => clearTimeout(timer);
    }, [index]);

    const handleView = () => {
        window.open(`/files/certificates/${certificate.filename}`, '_blank');
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = `/files/certificates/${certificate.filename}`;
        link.download = certificate.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={`certificate-card ${isVisible ? 'visible' : ''}`}>
            <div className="certificate-preview">
                <iframe
                    src={`/files/certificates/${certificate.filename}#toolbar=0&navpanes=0&scrollbar=0&view=fit`}
                    title={certificate.title}
                    className="pdf-iframe"
                />
                <div className="certificate-overlay">
                    <button onClick={handleView} className="action-btn view-btn" aria-label="View certificate">
                        <i className="ti ti-eye"></i>
                        <span>View Full</span>
                    </button>
                    <button onClick={handleDownload} className="action-btn download-btn" aria-label="Download certificate">
                        <i className="ti ti-download"></i>
                        <span>Download</span>
                    </button>
                </div>
            </div>

            <div className="certificate-details">
                <div className="certificate-header">
                    <h3 className="certificate-title">{certificate.title}</h3>
                    <span className="certificate-badge">
                        <i className="ti ti-certificate"></i>
                    </span>
                </div>
            </div>
        </div>
    );
};

const Certificates = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && setIsVisible(true),
            { threshold: 0.1 }
        );
        const section = document.getElementById('certificates');
        if (section) observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="certificates" className={`certificates-section ${isVisible ? 'visible' : ''}`}>
            <div className="bg-elements">
                <div className="bg-circle bg-circle1"></div>
                <div className="bg-circle bg-circle2"></div>
            </div>

            <div className="certificates-container">
                <div className="section-header">
                    <h2 className="section-subtitle">Professional Growth</h2>
                    <h1 className="section-title">
                        Certificates & <span className="title-accent">Achievements</span>
                    </h1>
                    <p className="section-description">
                        Continuous learning and professional development through recognized certifications
                    </p>
                </div>

                <div className="certificates-grid">
                    {certificatesData.map((cert, index) => (
                        <CertificateCard key={cert.id} certificate={cert} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certificates;