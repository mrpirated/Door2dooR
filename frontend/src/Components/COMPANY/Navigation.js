import React, { useRef, useState, useEffect, createRef } from 'react'
import '../../styles/navigation.css';

const items = [
    {
        name: "Orders",
        color: "#f44336",
        href: "/company/orders"
    },
    {
        name: "Track",
        color: "#e91e63",
        href: "/company/track"
    },
    {
        name: "Approve Package",
        color: "#9c27b0",
        href: "/company/approve-package"
    },
    {
        name: "About",
        color: "#673ab7",
        href: "#"
    },
    {
        name: "Help",
        color: "#3f51b5",
        href: "#"
    }
];

const Menu = ({items}) => {
    const $root = useRef();
    const $indicator1 = useRef()
    const $indicator2 = useRef()
    const $items = useRef(items.map(createRef))
    const [ active, setActive ] = useState(0)

    const animate = () => {
        const menuOffset = $root.current.getBoundingClientRect()
        const activeItem = $items.current[active].current
        const { width, height, top, left } = activeItem.getBoundingClientRect()
        
        const settings = {
            x: left - menuOffset.x,
            y: top - menuOffset.y,
            width: width,
            height: height,
            backgroundColor: items[active].color,
            ease: 'elastic.out(.7, .7)',
            duration: .8
        }
        
        // gsap.to($indicator1.current, {
        //   ...settings,
        // })
        
        // gsap.to($indicator2.current, {
        //   ...settings,
        //   duration: 1
        // })
    }
    useEffect(() => {
    animate()
    window.addEventListener('resize', animate)
    
    return (() => {
        window.removeEventListener('resize', animate)
    })    
    }, [active])
    
    return (
    <div
        ref={$root}
        className="menu"
    >
        {items.map((item, index) => (
        <a
            key={item.name}
            ref={$items.current[index]}
            style={{color:item.color, textDecoration:'none'}}
            className={`item ${active === index ? 'active' : ''}`}
            onMouseEnter={() => {
            setActive(index)
            }}
            href={item.href}
            >
            {item.name}
        </a>
        ))}
        <div
        ref={$indicator1}
        className="indicator"
        />
        <div
        ref={$indicator2}
        className="indicator"
        />
    </div>
    )
}

function Navigation() {
  return (
    <div style={{background:""}}>
        <Menu items={items}/>
    </div>
  )
}

export default Navigation