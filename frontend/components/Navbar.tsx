import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar(){
    return (
        <nav className="bg-zinc-800 text-white px-8 py-4 flex justify-between items-center shadow-md">
            <h1 className="text-2xl font-bold">
                Midas Trading Journal
            </h1>
    
        <div className="flex gap-6">
         <a href="/" className="transition-colors duration-200 hover:text-yellow-400">
            Dashboard
         </a>

         <a href="#" className="transition-colors duration-200 hover:text-yellow-400">
            Trades
         </a>

         <a href="/analytics" className="transition-colors duration-200 hover:text-yellow-400">
            Analytics
         </a>
         
         <a href="#" className="transition-colors duration-200 hover:text-yellow-400">
            Settings
         </a>
         
       
        <ThemeToggle />
        </div>  
        </nav>
    );
}