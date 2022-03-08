import { useState } from 'react';

export const initState = {
    imageSize: 1,
    handleImageSize: (imgsize: number) => { },
};

export function setContext(){
    const [imageSize, setImageSize] = useState(1);
    const handleImageSize = (imgsize: number) => {
      if (imageSize > 0) setImageSize(Math.floor(imgsize));
    }

    return {
        imageSize,
        handleImageSize    
    };
}