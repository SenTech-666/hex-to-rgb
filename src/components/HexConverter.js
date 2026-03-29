// src/components/HexConverter.js
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

    // Обработка ввода
    const handleInputChange = (e) => {
        let value = e.target.value.trim().toUpperCase();

        // Автоматически добавляем # если его нет
        if (value && !value.startsWith('#')) {
            value = '#' + value;
        }

        // Ограничиваем длину до 7 символов
        if (value.length > 7) {
            value = value.slice(0, 7);
        }

        setHexValue(value);

        // Если меньше 7 символов — очищаем результат
        if (value.length !== 7) {
            setRgbValue('');
            setError('');
            setBackgroundColor('#f0f0f0');
            return;
        }

        // Проверка и вывод результата
        if (isValidHex(value)) {
            const rgb = hexToRgb(value);
            setRgbValue(rgb);
            setError('');
            setBackgroundColor(value);
        } else {
            setRgbValue('');
            setError('Неверный формат HEX');
            setBackgroundColor('#f0f0f0');
        }
    };

    // Изменяем цвет фона страницы
    useEffect(() => {
        document.body.style.backgroundColor = backgroundColor;
        document.body.style.transition = 'background-color 0.3s ease';
    }, [backgroundColor]);

    return (
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
    );
};

export default HexConverter;