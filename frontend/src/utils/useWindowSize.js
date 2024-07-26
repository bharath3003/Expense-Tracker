import { useEffect, useState } from "react"

// This is used for ensuring the animation gets resized as per the browser window size
export const useWindowSize = () => {
    const [size, setSize] = useState([0, 0])

    useEffect(() => {
        const updateSize = () => {
            setSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener('resize', updateSize); 
        updateSize(); 

        return () => window.removeEventListener('resize', updateSize)   // To clear up the event listener
    }, [])

    return {
        width: size[0], 
        height: size[1]
    }
}