import Link from "next/link";
import {
    FiHome,FiBarChart2, FiBookOpen, FiSettings
} from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

export default function Navbar(){
    return (
        <nav className="bg-zinc-800 text-white px-8 py-4 flex justify-between items-center shadow-md">
            <h1 className="text-2xl font-bold">
                Midas Trading Journal
            </h1>
    
        <div className="flex gap-6">
         <a href="/" className="transition-colors duration-200 hover:text-yellow-400">
            <FiHome size={18} />
            Dashboard
         </a>

         <Link href="/" className="transition-colors duration-200 hover:text-yellow-400">
           <FiBookOpen size={18} /> Trades
         </Link>

         <Link href="/analytics" className="transition-colors duration-200 hover:text-yellow-400">
            <FiBarChart2 size={18} />
            Analytics
         </Link>
         
         <Link href="/settings" className="transition-colors duration-200 hover:text-yellow-400">
            <FiSettings size={18} />
            Settings
         </Link>
         
       
        <ThemeToggle />
        </div>  
        </nav>
    );
}