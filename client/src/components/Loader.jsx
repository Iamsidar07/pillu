import React from 'react'
import Lottie from 'react-lottie';
import animationUrl2 from "../assets/running-dog-3.json"
const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationUrl2,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (<>
        <Lottie
            options={defaultOptions}
            height={200}
            width={200}
        />
    </>
    )
}

export default Loader