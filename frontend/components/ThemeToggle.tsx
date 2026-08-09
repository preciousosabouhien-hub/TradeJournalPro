"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [darkMode, setDarkMode ] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if(savedTheme === "dark"){
            document.documentElement.classList.add("dark");
            setDarkMode(true);
        }
    }, []);

    const toggleTheme = () => {
        if (darkMode){
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setDarkMode(false);
        } else{
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setDarkMode(true);
        }
    };

    return (
        <button onClick={toggleTheme}
        className="px-3 py-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-300 transition-colors"
        aria-label="Toggle dark mode" >
            {darkMode ? " Light" : " Dark"}
        </button>
    );
}