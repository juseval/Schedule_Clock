import React, { useState, useEffect, useCallback } from 'react';
import { TimeEntry, TimeEntryType } from '../types';

const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const LoginIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H5.25" />
    </svg>
);

const LogoutIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
    </svg>
);

const TimeTracker: React.FC = () => {
    const [isClockedIn, setIsClockedIn] = useState<boolean>(false);
    const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        try {
            const storedIsClockedIn = localStorage.getItem('isClockedIn');
            if (storedIsClockedIn) {
                setIsClockedIn(JSON.parse(storedIsClockedIn));
            }
            const storedTimeEntries = localStorage.getItem('timeEntries');
            if (storedTimeEntries) {
                setTimeEntries(JSON.parse(storedTimeEntries));
            }
        } catch (error) {
            console.error("Error reading from localStorage", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('isClockedIn', JSON.stringify(isClockedIn));
            localStorage.setItem('timeEntries', JSON.stringify(timeEntries));
        } catch (error) {
            console.error("Error writing to localStorage", error);
        }
    }, [isClockedIn, timeEntries]);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleClockToggle = useCallback(() => {
        const newEntry: TimeEntry = {
            type: isClockedIn ? 'out' : 'in',
            timestamp: new Date().toISOString(),
        };
        setTimeEntries(prevEntries => [...prevEntries, newEntry]);
        setIsClockedIn(!isClockedIn);
    }, [isClockedIn]);
    
    const lastClockIn = timeEntries.filter(e => e.type === 'in').pop();

    const formatTimestamp = (timestamp: string) => {
        return new Date(timestamp).toLocaleString('es-ES', {
            dateStyle: 'long',
            timeStyle: 'medium',
        });
    };

    return (
        <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-6 md:p-10">
            <div className="text-center border-b border-slate-200 dark:border-slate-700 pb-6 mb-6">
                <div className="flex items-center justify-center gap-2 text-lg text-slate-500 dark:text-slate-400">
                    <ClockIcon className="w-6 h-6" />
                    <span>{currentTime.toLocaleTimeString('es-ES')}</span>
                </div>
                <div className="mt-4">
                    {isClockedIn && lastClockIn ? (
                        <p className="text-green-600 dark:text-green-400">
                            Entrada registrada a las {new Date(lastClockIn.timestamp).toLocaleTimeString('es-ES')}
                        </p>
                    ) : (
                        <p className="text-slate-600 dark:text-slate-300">Actualmente estás fuera.</p>
                    )}
                </div>
            </div>

            <div className="flex justify-center items-center my-8">
                <button
                    onClick={handleClockToggle}
                    className={`
                        w-full md:w-auto text-white font-bold py-4 px-8 rounded-full shadow-lg
                        transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4
                        ${isClockedIn 
                            ? 'bg-red-500 hover:bg-red-600 focus:ring-red-300 dark:focus:ring-red-800' 
                            : 'bg-green-500 hover:bg-green-600 focus:ring-green-300 dark:focus:ring-green-800'}
                    `}
                >
                    <span className="text-xl">{isClockedIn ? 'Marcar Salida' : 'Marcar Entrada'}</span>
                </button>
            </div>
            
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-center text-slate-700 dark:text-slate-300">Historial de Registros</h3>
                <div className="max-h-60 overflow-y-auto bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                    {timeEntries.length > 0 ? (
                        <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                            {[...timeEntries].reverse().map((entry, index) => (
                                <li key={index} className="py-3 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {entry.type === 'in' ? 
                                            <LoginIcon className="w-5 h-5 text-green-500" /> : 
                                            <LogoutIcon className="w-5 h-5 text-red-500" />}
                                        <span className={`font-medium ${entry.type === 'in' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                                            {entry.type === 'in' ? 'Entrada' : 'Salida'}
                                        </span>
                                    </div>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                        {formatTimestamp(entry.timestamp)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-slate-500 dark:text-slate-400 py-4">No hay registros todavía.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TimeTracker;