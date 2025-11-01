import React from 'react';
import TimeTracker from './components/TimeTracker';

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-slate-800 dark:text-slate-200 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Control Horario del Equipo
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Registra tu entrada y salida con un solo clic.
          </p>
        </header>
        <main>
          <TimeTracker />
        </main>
        <footer className="text-center mt-8 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Mi Empresa. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;