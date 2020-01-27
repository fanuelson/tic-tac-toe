import React, { useState } from 'react'
import { Animated } from 'react-animated-css'
import PropTypes from 'prop-types'

import oimage from '#imgs/circle.png'
import ximage from '#imgs/X-img.png'

function getXComponent (isHover, markType) {
  const imgElement = <img className='mx-auto ' width='70' src={ximage} />

  const animatedElement = (
    <Animated animationIn='rubberBand' animationOut='rotateOut' isVisible>
      {imgElement}
    </Animated>
  )

  return !isHover || markType === 0 ? imgElement : animatedElement
}

function getOComponent (isHover, markType) {
  const imgElement = <img className='mx-auto ' width='70' src={oimage} />

  const animatedElement = (
    <Animated animationIn='rubberBand' animationOut='rotateOut' isVisible>
      {imgElement}
    </Animated>
  )

  return !isHover || markType === 0 ? imgElement : animatedElement
}

function decideWhoRender (markType, isHover) {
  return markType !== 0 && (markType === 1 ? getXComponent(isHover, markType) : getOComponent(isHover, markType))
}

const OXComponent = ({ markType, currentPlayer }) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <div className='ttt-box-mark' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} style={{ opacity: isHover && markType === 0 ? 0.4 : 1 }}>
      {decideWhoRender(isHover && markType === 0 ? currentPlayer : markType, isHover)}
    </div>
  )
}

OXComponent.propTypes = {
  markType: PropTypes.any,
  currentPlayer: PropTypes.number
}

export default OXComponent
