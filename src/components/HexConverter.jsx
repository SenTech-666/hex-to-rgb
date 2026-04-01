// src/components/HexConverter.jsx
import { useState, useEffect } from 'react';
import './HexConverter.css';

const HexConverter = () => {
    const [hexValue, setHexValue] = useState('');
    const [rgbValue, setRgbValue] = useState('');
    const [error, setError] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('#f0f0f0');

    // Конвертация HEX в RGB
    const hexToRgb = (hex) => {
        const cleanHex = hex.replace('#', '');
        const r = parseInt(cleanHex.substr(0, 2), 16);
        const g = parseInt(cleanHex.substr(2, 2), 16);
        const b = parseInt(cleanHex.substr(4, 2), 16);
        return `rgb(${r}, ${g}, ${b})`;
    };

    // Проверка валидности HEX
    const isValidHex = (hex) => {
        return /^#[0-9A-Fa-f]{6}$/.test(hex);
    };

    const handleInputChange = (e) => {
        let value = e.target.value.trim().toUpperCase();

        // Автодобавление #
        if (value && !value.startsWith('#')) {
            value = '#' + value;
        }

        // Ограничение длины
        if (value.length > 7) {
            value = value.slice(0, 7);
        }

        setHexValue(value);

        if (value.length !== 7) {
            setRgbValue('');
            setError('');
            setBackgroundColor('#f0f0f0');
            return;
        }

        if (isValidHex(value)) {
            const rgb = hexToRgb(value);
            setRgbValue(rgb);
            setError('');
            setBackgroundColor(value);        // ← только обновляем состояние
        } else {
            setRgbValue('');
            setError('Неверный формат HEX');
            setBackgroundColor('#f0f0f0');
        }
    };

    // Применяем цвет фона через inline-стиль на главном контейнере
    return (
        <div 
            className="app-wrapper"
            style={{ backgroundColor: backgroundColor, minHeight: '100vh', transition: 'background-color 0.3s ease' }}
        >
            <div className="converter">
                <h1>HEX → RGB</h1>
                
                <input
                    type="text"
                    value={hexValue}
                    onChange={handleInputChange}
                    placeholder="#000000"
                    maxLength={7}
                    spellCheck={false}
                />

                <div className={`result ${error ? 'error' : 'rgb-result'}`}>
                    {error || rgbValue || ''}
                </div>
            </div>
        </div>
    );
};

export default HexConverter;