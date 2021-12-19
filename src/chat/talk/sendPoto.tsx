import React from 'react';

import PotoIcon from '../assets/poto.png';

interface SendPotoProps {

}

const SendPoto: React.FC<SendPotoProps> = () => {
    return (
        <label
            style={{
                display: "flex",
                marginRight: "3px"
            }}
        >
            <img
                src={PotoIcon}
                width="30px"
            />
            <input
                type="file"
                style={{
                    display: "none"
                }}
            />
        </label>
    );
}

export default SendPoto;