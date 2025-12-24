import React, { useEffect, useState } from "react";
import StakeCountWrapper from "./StakeCount.style"; // Import the CSS file
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Tooltip from "../tooltip";

const StakeCount = ({
    title,
    max,
    min,
    active,
    tooltip,
    onChangeHandler,
    type,
    checksuccess
}) => {
    const [inputValue, setInputValue] = useState(0);
    const [inputType, setInputType] = useState(type);
    const [checkSuccess, setCheckSuccess] = useState(false);
    useEffect(() => {
        setCheckSuccess(true);
    }, [checksuccess]);

    useEffect(() => {
        if (checkSuccess) {
            setInputValue(0);
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
        // if (e.key === ".") {
        //     setErrorMessage('Dot or space is not allowed');
        //     setInputValue(1);
        // }
    };

    const handleInputChange = (e) => {
        setCheckSuccess(false);
        const value = e.target.value;
        if (inputType !== "stakePower") {
            if (value.includes('.') || value.includes(' ')) {
                setInputValue("1");
                setErrorMessage('Dot or space is not allowed');
                return;
            } else {
                setErrorMessage('');
            }
        }
        let maxValue = 0;
        if (inputType == "stakeLength") {
            maxValue = 830;
        } else if (inputType == "stakeAmplifier") {
            maxValue = 20;
        } else {
            maxValue = parseFloat(max);
        }
        if (e.target.value > maxValue) {
            setInputValue(max);
        } else if (e.target.value < min) {
            setInputValue(min);
        } else {
            setInputValue(e.target.value);
        }
    };

    const maxButtonClicked = (max) => {
        setCheckSuccess(false);
        setInputValue(max);
    };

    useEffect(() => {
        onChangeHandler && onChangeHandler(type, inputValue);
    }, [inputValue, type]);

    return (
        <StakeCountWrapper>
            <div className="miner-container">
                <div className="tooltip_header_text">
                    <h3>{title}</h3>
                    <Tooltip text={tooltip}>
                        <AiOutlineQuestionCircle />
                    </Tooltip>
                </div>
                <input
                    type="number"
                    className="count_input"
                    min={min}
                    max={max}
                    step="1"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                {active == 1 && (
                    <button className="max_button" onClick={() => maxButtonClicked(max)}>
                        MAX
                    </button>
                )}
            </div>
            {errorMessage && <div className='error_message'><p>{errorMessage}</p></div>}
        </StakeCountWrapper>
    );
};

export default StakeCount;
