
import React, { useState, useEffect, useCallback } from 'react';
import { TimeEntry, TimeEntryType } from '../types';

// --- ICONS --- //

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

const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>
);

const CalendarWeekIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M7.5 14.25h.008v.008H7.5v-.008Zm3 0h.008v.008H10.5v-.008Zm3 0h.008v.008H13.5v-.008Z" />
    </svg>
);

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

const PencilIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.036-2.134H8.718c-1.126 0-2.037.954-2.037 2.134v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);


// --- MODALS --- //

interface DeleteModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={onCancel}>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 md:p-8 shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Confirmar Eliminación</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">¿Estás seguro de que quieres eliminar este registro? Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-4">
                <button onClick={onCancel} className="px-4 py-2 rounded-lg font-semibold bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">Cancelar</button>
                <button onClick={onConfirm} className="px-4 py-2 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors">Eliminar</button>
            </div>
        </div>
    </div>
);

interface EditModalProps {
    entry: TimeEntry;
    onSave: (newTimestamp: string) => void;
    onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ entry, onSave, onClose }) => {
    const formatForInput = (isoString: string) => {
        const d = new Date(isoString);
        // Adjust for timezone offset to display local time correctly in the input
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        return d.toISOString().slice(0, 16);
    };

    const [timestamp, setTimestamp] = useState(formatForInput(entry.timestamp));

    const handleSave = () => {
        // Convert local input time back to a standard ISO string in UTC for storage
        const newDate = new Date(timestamp);
        onSave(newDate.toISOString());
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 md:p-8 shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Editar Registro</h3>
                <div className="mb-6">
                    <label htmlFor="datetime" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Fecha y Hora
                    </label>
                    <input
                        type="datetime-local"
                        id="datetime"
                        value={timestamp}
                        onChange={(e) => setTimestamp(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                    />
                </div>
                <div className="flex justify-end gap-4">
                     <button onClick={onClose} className="px-4 py-2 rounded-lg font-semibold bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">Cancelar</button>
                     <button onClick={handleSave} className="px-4 py-2 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">Guardar Cambios</button>
                </div>
            </div>
        </div>
    );
};


// --- HELPERS --- //

const formatDuration = (ms: number) => {
    if (ms < 0) ms = 0;
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};


// --- MAIN COMPONENT --- //

const TimeTracker: React.FC = () => {
    const [isClockedIn, setIsClockedIn] = useState<boolean>(false);
    const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [dailyHours, setDailyHours] = useState(0);
    const [weeklyHours, setWeeklyHours] = useState(0);
    const [entryToDelete, setEntryToDelete] = useState<TimeEntry | null>(null);
    const [entryToEdit, setEntryToEdit] = useState<TimeEntry | null>(null);

    // Load state from localStorage on initial render
    useEffect(() => {
        try {
            const storedIsClockedIn = localStorage.getItem('isClockedIn');
            if (storedIsClockedIn) setIsClockedIn(JSON.parse(storedIsClockedIn));
            
            const storedTimeEntries = localStorage.getItem('timeEntries');
            if (storedTimeEntries) setTimeEntries(JSON.parse(storedTimeEntries));
        } catch (error) {
            console.error("Error reading from localStorage", error);
        }
    }, []);

    // Save state to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('isClockedIn', JSON.stringify(isClockedIn));
            localStorage.setItem('timeEntries', JSON.stringify(timeEntries));
        } catch (error) {
            console.error("Error writing to localStorage", error);
        }
    }, [isClockedIn, timeEntries]);

    // Update current time every second
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Calculate daily and weekly hours
    useEffect(() => {
        const calculateHours = () => {
            const now = currentTime;
            let dailyMs = 0;
            let weeklyMs = 0;

            const entriesToProcess = [...timeEntries];
            if (isClockedIn) {
                const lastEntry = entriesToProcess[entriesToProcess.length - 1];
                if(lastEntry?.type === 'in') {
                    entriesToProcess.push({ type: 'out', timestamp: now.toISOString() });
                }
            }

            let lastInTimestamp: number | null = null;
            const workSessions: { start: number, duration: number }[] = [];

            for (const entry of entriesToProcess) {
                const entryTime = new Date(entry.timestamp).getTime();
                if (entry.type === 'in') {
                    lastInTimestamp = entryTime;
                } else if (entry.type === 'out' && lastInTimestamp) {
                    workSessions.push({ start: lastInTimestamp, duration: entryTime - lastInTimestamp });
                    lastInTimestamp = null;
                }
            }
            
            const startOfToday = new Date(now);
            startOfToday.setHours(0, 0, 0, 0);

            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay()); // Week starts on Sunday
            startOfWeek.setHours(0, 0, 0, 0);

            workSessions.forEach(session => {
                if (session.start >= startOfToday.getTime()) {
                    dailyMs += session.duration;
                }
                if (session.start >= startOfWeek.getTime()) {
                    weeklyMs += session.duration;
                }
            });

            setDailyHours(dailyMs);
            setWeeklyHours(weeklyMs);
        };

        calculateHours();
    }, [timeEntries, currentTime, isClockedIn]);

    const handleClockToggle = useCallback(() => {
        const newEntry: TimeEntry = {
            type: isClockedIn ? 'out' : 'in',
            timestamp: new Date().toISOString(),
        };
        setTimeEntries(prevEntries => [...prevEntries, newEntry]);
        setIsClockedIn(!isClockedIn);
    }, [isClockedIn]);

    const handleExport = useCallback(() => {
        if (timeEntries.length === 0) {
            alert("No hay registros para exportar.");
            return;
        }

        const headers = ['Tipo', 'Fecha', 'Hora'];
        const rows = timeEntries.map(entry => {
            const date = new Date(entry.timestamp);
            const type = entry.type === 'in' ? 'Entrada' : 'Salida';
            const dateStr = date.toLocaleDateString('es-ES');
            const timeStr = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            return [type, dateStr, timeStr].join(',');
        });

        const csvContent = [headers.join(','), ...rows].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `control-horario-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [timeEntries]);
    
    const handleConfirmDelete = useCallback(() => {
        if (!entryToDelete) return;
        setTimeEntries(prev => prev.filter(e => e.timestamp !== entryToDelete.timestamp));
        setEntryToDelete(null);
    }, [entryToDelete]);

    const handleConfirmEdit = useCallback((newTimestamp: string) => {
        if (!entryToEdit) return;
        setTimeEntries(prev => {
            const updated = prev.map(e => 
                e.timestamp === entryToEdit.timestamp ? { ...e, timestamp: newTimestamp } : e
            );
            // Re-sort to maintain chronological order, crucial for calculations
            updated.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
            return updated;
        });
        setEntryToEdit(null);
    }, [entryToEdit]);

    const lastClockIn = timeEntries.filter(e => e.type === 'in').pop();

    const formatTimestamp = (timestamp: string) => {
        return new Date(timestamp).toLocaleString('es-ES', {
            dateStyle: 'long',
            timeStyle: 'medium',
        });
    };

    return (
        <>
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
                
                <div className="grid grid-cols-2 gap-4 text-center mb-8">
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                        <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
                            <SunIcon className="w-5 h-5" />
                            <h4 className="font-semibold">Horas Hoy</h4>
                        </div>
                        <p className="text-2xl font-bold mt-2 text-slate-800 dark:text-slate-100 tabular-nums">
                            {formatDuration(dailyHours)}
                        </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                        <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
                            <CalendarWeekIcon className="w-5 h-5" />
                            <h4 className="font-semibold">Horas Semana</h4>
                        </div>
                        <p className="text-2xl font-bold mt-2 text-slate-800 dark:text-slate-100 tabular-nums">
                            {formatDuration(weeklyHours)}
                        </p>
                    </div>
                </div>

                <div className="flex justify-center items-center my-8">
                    <button
                        onClick={handleClockToggle}
                        aria-label={isClockedIn ? 'Marcar Salida' : 'Marcar Entrada'}
                        className={`
                            w-full md:w-auto text-white font-bold py-4 px-8 rounded-full shadow-lg
                            transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4
                            ${isClockedIn 
                                ? 'bg-red-500 hover:bg-red-600 focus:ring-red-300 dark:focus:ring-red-800' 
                                : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-300 dark:focus:ring-indigo-800'}
                        `}
                    >
                        <span className="text-xl">{isClockedIn ? 'Marcar Salida' : 'Marcar Entrada'}</span>
                    </button>
                </div>
                
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Historial de Registros</h3>
                        {timeEntries.length > 0 && (
                            <button
                                onClick={handleExport}
                                className="flex items-center justify-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 px-3 py-2 rounded-lg transition-colors"
                                aria-label="Exportar historial a CSV"
                            >
                                <DownloadIcon className="w-5 h-5" />
                                <span>Exportar CSV</span>
                            </button>
                        )}
                    </div>
                    <div className="max-h-60 overflow-y-auto bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                        {timeEntries.length > 0 ? (
                            <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                                {[...timeEntries].reverse().map((entry) => (
                                    <li key={entry.timestamp} className="py-3 flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            {entry.type === 'in' ? 
                                                <LoginIcon className="w-5 h-5 text-green-500" /> : 
                                                <LogoutIcon className="w-5 h-5 text-red-500" />}
                                            <span className={`font-medium ${entry.type === 'in' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                                                {entry.type === 'in' ? 'Entrada' : 'Salida'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm text-slate-500 dark:text-slate-400">
                                                {formatTimestamp(entry.timestamp)}
                                            </span>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
                                                <button onClick={() => setEntryToEdit(entry)} aria-label="Editar registro" className="p-1 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                                    <PencilIcon className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => setEntryToDelete(entry)} aria-label="Eliminar registro" className="p-1 text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-slate-500 dark:text-slate-400 py-4">No hay registros todavía.</p>
                        )}
                    </div>
                </div>
            </div>

            {entryToEdit && (
                <EditModal 
                    entry={entryToEdit} 
                    onClose={() => setEntryToEdit(null)} 
                    onSave={handleConfirmEdit} 
                />
            )}
            {entryToDelete && (
                <DeleteModal 
                    onCancel={() => setEntryToDelete(null)} 
                    onConfirm={handleConfirmDelete} 
                />
            )}
        </>
    );
};

export default TimeTracker;
