import { LayoutGrid, Calendar, FolderOpen, Search, User, Settings, HelpCircle, LogOut } from 'lucide-react';
import logo from '../../assets/images/logo.png'

export const Sidebar = () => {
    return(
        <aside className='h-screen flex flex-col justify-between px-4 py-8 max-w-18 bg-bg-sidebar text-white'>
            <div>
                <img className='w-15 h-15 object-cover' src={logo} alt="Logo - FinQuest" />
            </div>

            <nav>
                <ul className='flex flex-col items-center gap-7'>
                    <li className='w-10 h-10 flex items-center justify-center rounded-lg bg-border-glass'>
                        <button>
                            <LayoutGrid size={25} />
                        </button>
                    </li>
                    <li className='w-10 h-10 flex items-center justify-center rounded-lg'>
                        <button>
                            <Calendar size={25} />
                        </button>
                    </li>
                    <li className='w-10 h-10 flex items-center justify-center rounded-lg '>
                        <button>
                            <FolderOpen size={25} />
                        </button>
                    </li>
                    <li className='w-10 h-10 flex items-center justify-center rounded-lg'>
                        <button>
                            <Search size={25} />
                        </button>
                    </li>
                </ul>
            </nav>

            <nav>
                <ul className='flex flex-col items-center gap-7'>
                    <li className='w-10 h-10 flex items-center justify-center rounded-lg'>
                        <button>
                            <User size={25} />
                        </button>
                    </li>
                    <li className='w-10 h-10 flex items-center justify-center rounded-lg'>
                        <button>
                            <Settings size={25} />
                        </button>
                    </li>
                    <li className='w-10 h-10 flex items-center justify-center rounded-lg'>
                        <button>
                            <HelpCircle size={25} />
                        </button>
                    </li>
                    <li className='w-10 h-10 flex items-center justify-center rounded-lg'>
                        <button>
                            <LogOut size={25} />
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}