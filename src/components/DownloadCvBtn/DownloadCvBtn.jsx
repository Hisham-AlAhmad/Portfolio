import React, { useState } from 'react';
import './DownloadCvBtn.css';

const DownloadCvBtn = () => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloaded, setDownloaded] = useState(false);

    const handleDownload = () => {
        setIsDownloading(true);

        setTimeout(() => {
            setIsDownloading(false);
            setDownloaded(true);

            setTimeout(() => setDownloaded(false), 3000);

            const link = document.createElement('a');
            link.href = 'files/Hisham-Al-Ahmad-FlowCV-Resume-20250930.pdf';
            link.download = 'Hisham-Al-Ahmad-FlowCV-Resume-20250930.pdf';
            link.click();
        }, 1500);
    };

    return (
        <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`cv-download-btn ${downloaded ? 'downloaded' : ''} ${isDownloading ? 'downloading' : ''}`}
        >
            <span className="btn-content">
                {downloaded ? (
                    <>
                        <i className="ti ti-check icon-check"></i>
                        <span>Downloaded!</span>
                    </>
                ) : isDownloading ? (
                    <>
                        <i className="ti ti-download icon-downloading"></i>
                        <span>Downloading...</span>
                    </>
                ) : (
                    <>
                        <i className="ti ti-download"></i>
                        <span>Download CV</span>
                    </>
                )}
            </span>
        </button>
    );
}

export default DownloadCvBtn;