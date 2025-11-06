import { useEffect, useState } from 'react';
import './TextType.css';

const TextType = ({ text = [] }) => {
  const texts = Array.isArray(text) ? text : [text];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;
    
    const textToType = texts[currentTextIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < textToType.length) {
          setCurrentText(textToType.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? 25 : 35); // Deleting : Typing - speed

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts]);

  return (
    <span className="text-type">
      {currentText}
      <span className="text-type__cursor">|</span>
    </span>
  );
};

export default TextType;