"use client"

import { useEffect, useRef, type ReactNode } from "react";

const StoriesContainer = ({ children }: { children: ReactNode }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const onWheel = (e: WheelEvent) => {
            if (e.deltaY === 0) return;
            const canScrollHorizontally = el.scrollWidth > el.clientWidth;
            if (!canScrollHorizontally) return;

            e.preventDefault();
            el.scrollLeft += e.deltaY;
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, []);

    return (
        <div ref={scrollRef} className="p-4 bg-white rounded-lg shadow-md overflow-x-auto text-xs scrollbar-hide">
            <div className="flex gap-8 w-max">
                {children}
            </div>
        </div>
    );
}


export default StoriesContainer