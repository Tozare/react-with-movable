import React, {useRef, useState, useEffect, useCallback} from 'react';
import Moveable from "react-moveable";
import { Frame } from "scenejs";
import Button from "@material-ui/core/Button";

import './moveable-test.css'

export const MoveableTest = () => {
    const [frame, setFrame] = useState(null);
    const [scalable, setScalable] = useState(false);
    const [rotatable, setRotatable] = useState(false);
    const [dragable, setDragable] = useState(true);
    const [resizeable, setResizeable] = useState(false);


    const moveableRef = useRef(null);

    const onWindowResize = useCallback(() => {
        moveableRef.current.updateTarget();
    }, []);
    useEffect(() => {
        const newFrame = new Frame ({
            width: "250px",
            height: "200px",
            left: "0px",
            top: "0px",
            transform: {
                translateX: "0px",
                translateY: "0px",
                rotate: "0deg",
                scaleX: 1,
                scaleY: 1,
            }
        })
        setFrame(
            newFrame
        );
        window.addEventListener("resize", onWindowResize);
        return () => {
            window.removeEventListener("resize", onWindowResize);
        };
    }, [onWindowResize]);

    const onDrag = (e) => {
        console.log("onDrag left, top", e.left, e.top);
        frame.set("left", `${e.left}px`);
        frame.set("top", `${e.top}px`);
        e.target.style.cssText = frame.toCSS();
    }

    const onResize = (e) => {
        frame.set("width", `${e.width}px`);
        frame.set("height", `${e.height}px`);
        e.target.style.cssText = frame.toCSS();
    }

    const onScale = (e) => {
        const scaleX = frame.get("transform", "scaleX") * e.delta[0];
        const scaleY = frame.get("transform", "scaleY") * e.delta[1];
        frame.set("transform", "scaleX", scaleX);
        frame.set("transform", "scaleY", scaleY);
        e.target.style.cssText = frame.toCSS();
    }

    const onRotate = (e) => {
        const deg = parseFloat(frame.get("transform", "rotate")) + e.beforeDelta;
        frame.set("transform", "rotate", `${deg}deg`);
        e.target.style.cssText = frame.toCSS();
    }

    const makeDragable = () => {
        setDragable(true);
        setResizeable(false);
        setRotatable(false);
        setScalable(false);
    }

    const makeResizeable = () => {
        setDragable(false);
        setResizeable(true);
        setRotatable(false);
        setScalable(false);
    }

    const makeScaleable = () => {
        setDragable(false);
        setResizeable(false);
        setRotatable(false);
        setScalable(true);
    }

    const makeRotatable = () => {
        setDragable(false);
        setResizeable(false);
        setRotatable(true);
        setScalable(false);
    }

    return (
        <div className='moveable-test-container'>
            <div className='navbar'>
                <Button variant="contained" color={dragable ? "primary" : "default"} className='navbar_item' onClick={makeDragable}>
                    Drag
                </Button>
                <Button variant="contained" color={resizeable ? "primary" : "default"} className='navbar_item' onClick={makeResizeable}>
                    Resize
                </Button>
                <Button variant="contained" color={scalable ? "primary" : "default"} className='navbar_item' onClick={makeScaleable}>
                    Scale
                </Button>
                <Button variant="contained" color={rotatable ? "primary" : "default"} className='navbar_item' onClick={makeRotatable}>
                    Rotate
                </Button>
            </div>
            <Moveable
                ref={moveableRef.current}
                target={document.querySelectorAll(".moveable")}
                container={document.body}
                resizable={resizeable}
                draggable={dragable}
                scalable={scalable}
                rotatable={rotatable}

                origin={false}
                throttleDrag={1}
                throttleRotate={0.2}
                throttleResize={1}
                throttleScale={0.01}
                onDragStart={({ target, clientX, clientY }) => {
                    console.log("onDragStart", target);
                }}
                onDrag={onDrag}
                onResize={onResize}
                onScale={onScale}
                onRotate={onRotate}
            />
            <div className='moveable-container'>
                <div className='moveable'>
                    Moveable object
                </div>
            </div>
        </div>
    )
}