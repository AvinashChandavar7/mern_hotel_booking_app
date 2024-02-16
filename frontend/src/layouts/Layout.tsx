import Footer from '../components/Footer.tsx';
import Header from '../components/Header.tsx';
import Hero from '../components/Hero.tsx';
import SearchBar from '../components/filters/SearchBar.tsx';

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />

      <section className='container mx-auto'>
        <SearchBar />
      </section>

      <main className='container flex-1 py-10 mx-auto'>
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default Layout