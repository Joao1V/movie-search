

"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import React, { useEffect } from "react";

function AnimatedNumber({ value, isLoading }) {
    let spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
    let display = useTransform(spring, (current) =>
        Math.round(current).toLocaleString()
    );

    useEffect(() => {
        spring.set((value));
    }, [spring, value]);

    if (isLoading) return (
        <div className={"skeleton"} style={{minWidth: 70, height: 30}}/>
    )

    return <motion.span>{display}</motion.span>;
}


export default AnimatedNumber