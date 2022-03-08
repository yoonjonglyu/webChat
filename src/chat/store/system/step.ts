import { useState } from 'react';

export const initState = {
    step: 0,
    handleStep: (step: number) => { },
};

export function setContext(){
    const [step, setStep] = useState(0);
    const handleStep = (step: number) => setStep(step);

    return {
        step,
        handleStep    
    };
}