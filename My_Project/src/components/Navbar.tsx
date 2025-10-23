import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo Box - Left Side */}
                <div className="bg-black/20 backdrop-blur-md rounded-2xl border border-gray-500/30 shadow-xl p-4">
                    <NavLink 
                        to="/" 
                        className="w-12 h-12 rounded-xl bg-gray-800/80 border border-gray-600/50 items-center justify-center flex font-bold shadow-lg hover:bg-gray-700/80 transition-all duration-300 hover:scale-105"
                    >
                        <p className="text-gray-200 text-lg font-bold">AH</p>
                    </NavLink>
                </div>
                
                {/* Navigation Links Box - Right Side */}
                <div className="bg-black/20 backdrop-blur-md rounded-2xl border border-gray-500/30 shadow-xl px-6 py-4">
                    <nav className="flex text-lg gap-8 font-medium">
                        <NavLink 
                            to="/about" 
                            className={({isActive}) => 
                                `px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-700/40 ${
                                    isActive 
                                        ? 'text-white-300 bg-gray-700/40 shadow-lg' 
                                        : 'text-gray-200 hover:text-gray-100'
                                }`
                            }
                        >
                            About
                        </NavLink>
                        <NavLink 
                            to="/projects" 
                            className={({isActive}) => 
                                `px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-700/40 ${
                                    isActive 
                                        ? 'text-white-300 bg-gray-700/40 shadow-lg' 
                                        : 'text-gray-200 hover:text-gray-100'
                                }`
                            }
                        >
                            Projects
                        </NavLink>
                        <NavLink 
                            to="/contact" 
                            className={({isActive}) => 
                                `px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-700/40 ${
                                    isActive 
                                        ? 'text-white-300 bg-gray-700/40 shadow-lg' 
                                        : 'text-gray-200 hover:text-gray-100'
                                }`
                            }
                        >
                            Contact
                        </NavLink>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar
