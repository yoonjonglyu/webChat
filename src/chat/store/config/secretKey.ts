import { useState } from 'react';

export const initState = {
    secretKey: '',
    handleSecretKey: (secretKey: string) => { },
};

export function setContext(){
    const [secretKey, setSecretKey] = useState('');
    const handleSecretKey = (secretKey: string) => {
      if (secretKey.length > 0) setSecretKey(secretKey);
    }

    return {
        secretKey,
        handleSecretKey    
    };
}