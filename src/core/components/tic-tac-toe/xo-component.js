import React, { useState } from 'react';
import {Animated} from "react-animated-css";

import oimage from '#imgs/circle.png'
import ximage from '#imgs/X-img.png'

function getXComponent(isHover, markType) {
    let imgElement = <img className="mx-auto " width="70" src={ximage} />

    let animatedElement = (
        <Animated animationIn="rubberBand" animationOut="rotateOut" isVisible={true}>
            {imgElement}
        </Animated>
    )

    return !isHover || markType === 0 ? imgElement : animatedElement;
}

function getOComponent(isHover, markType) {
    let imgElement = <img className="mx-auto " width="70" src={oimage} />

    let animatedElement = (
        <Animated animationIn="rubberBand" animationOut="rotateOut" isVisible={true}>
            {imgElement}
        </Animated>
    )

    return !isHover || markType === 0 ? imgElement : animatedElement;
}

function decideWhoRender(markType, isHover) {
    return markType !== 0 && (markType === 1  ? getXComponent(isHover, markType) : getOComponent(isHover, markType));
}

const OXComponent = ({markType, currentPlayer}) => {

    const [isHover, setIsHover] = useState(false);


    return <div className="ttt-box-mark" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} style={{opacity: isHover && markType === 0 ? 0.4 : 1}} >
        {decideWhoRender(isHover && markType === 0? currentPlayer : markType, isHover) }
    </div>
 

}



export default OXComponent;