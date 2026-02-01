import React, { useState, useRef, useEffect } from 'react'
import './CurvedLoop.css'

export default function CurvedLoop({
  marqueeText = 'Welcome to React Bits ✦',
  speed = 1,
  curveAmount = 400,
  direction = 'left',
  interactive = false,
  className = ''
}) {
  const [rotation, setRotation] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const svgRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    let currentRotation = 0
    const speedMultiplier = speed * (direction === 'right' ? -1 : 1)
    const hoverSpeedMultiplier = isHovering && interactive ? speedMultiplier * 3 : speedMultiplier

    const animate = () => {
      currentRotation += hoverSpeedMultiplier * 0.5
      setRotation(currentRotation % 360)
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [speed, direction, isHovering, interactive])

  const pathId = 'curved-path'
  const radius = curveAmount

  return (
    <div
      className={`curved-loop ${className}`}
      onMouseEnter={() => interactive && setIsHovering(true)}
      onMouseLeave={() => interactive && setIsHovering(false)}
      ref={svgRef}
    >
      <svg
        viewBox="0 0 500 500"
        className="curved-loop__svg"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <defs>
          <path
            id={pathId}
            d={`M 250, 250 m 0, -${radius} a ${radius},${radius} 0 1,1 0,${radius * 2} a ${radius},${radius} 0 1,1 0,-${radius * 2}`}
            fill="none"
          />
        </defs>
        <text className="curved-loop__text">
          <textPath href={`#${pathId}`} startOffset="0%" textAnchor="start">
            {marqueeText}
          </textPath>
        </text>
        <text className="curved-loop__text">
          <textPath href={`#${pathId}`} startOffset="50%" textAnchor="start">
            {marqueeText}
          </textPath>
        </text>
      </svg>
    </div>
  )
}
