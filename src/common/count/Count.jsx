import React, { useEffect, useState } from 'react';
import CountWrapper from './Count.style'; // Import the CSS file
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Tooltip from '../tooltip';

const MinerComponent = ({ title, max, min, active, tooltip, onChangeHandler, type, checksuccess }) => {

    const [inputValue, setInputValue] = useState(1);
    const [inputType, setInputType] = useState(type);
    const [checkSuccess, setCheckSuccess] = useState(false);
    useEffect(() => {
        setCheckSuccess(true);
    }, [checksuccess]);

    useEffect(() => {
        // Check if checksuccess is true, then set input value to 1
        if (checkSuccess) {
            setInputValue(1);
        }
    }, [checkSuccess]);

    useEffect(() => {
        setInputType(type);
    }, [type]);

    const [errorMessage, setErrorMessage] = useState('');

    const handleKeyDown = (e) => {
        setCheckSuccess(false);
        if (e.keyCode === 8 || e.key === "BackSpace") {
            setInputValue('');
        }
        if (e.key === ".") {
            setErrorMessage('Dot or space is not allowed');
            setInputValue(1);
        }
    };
    const handleInputChange = (e) => {
        setCheckSuccess(false);
        const value = e.target.value;
        if (value.includes('.') || value.includes(' ')) {
            setInputValue("1");
            setErrorMessage('Dot or space is not allowed');
            return;
        } else {
            setErrorMessage('');
        }
        let maxValue = 0;
        if (inputType === "minerLength") {
            maxValue = 250;
        } else if (inputType === "minerPower") {
            maxValue = 100000;
        } else {
            maxValue = 10;
        }
        if (e.target.value > maxValue) {
            setInputValue(max);
        } else if (e.target.value < min) {
            setInputValue(min);
        } else {
            setInputValue(e.target.value);
        }
    }

    const maxButtonClicked = (max) => {
        setInputValue(max);
        setCheckSuccess(false);
    }

    useEffect(() => {
        onChangeHandler && onChangeHandler(type, inputValue);
    }, [inputValue, type])

    return (
        <CountWrapper>
            <div className="miner-container">
                <h3>
                    <p>{title}</p>
                    <Tooltip text={tooltip}>
                        <AiOutlineQuestionCircle />
                    </Tooltip>
                </h3>
                <input
                    type="number"
                    className='count_input'
                    min={min}
                    max={max}
                    step="1"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                {active === 1 && <button className='max_button' onClick={() => maxButtonClicked(max)}>MAX</button>}
            </div>
            {errorMessage && <div className='error_message'><p>{errorMessage}</p></div>}

        </CountWrapper>
    );
};

export default MinerComponent;