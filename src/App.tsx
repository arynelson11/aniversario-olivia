import DaisyBackground from './components/DaisyBackground';
import Hero from './components/Hero';
import Details from './components/Details';
import RSVP from './components/RSVP';

function App() {
  return (
    <div className="min-h-screen bg-background text-text overflow-hidden selection:bg-primary selection:text-text">
      <DaisyBackground />

      <main className="relative z-10 w-full">
        <Hero />
        <Details />
        <RSVP />
      </main>

      <footer className="relative z-10 text-center py-8 text-text/40 text-sm">
        <p>Feito com ❤️ para a Olívia</p>
      </footer>
    </div>
  )
}

export default App
