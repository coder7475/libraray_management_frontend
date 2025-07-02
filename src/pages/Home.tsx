import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useGetPokemonByNameQuery } from "@/services/pokemon";
import Hero from "@/components/Hero";

const Home = () => {
  // Using a query hook automatically fetches data and returns query values
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-gray-900">
        <Navbar />
      </header>
      <main className="flex flex-col items-center min-h-[60vh] space-y-6 h-screen">
        <Hero />
      </main>
      <Footer />
    </>
  );
};

export default Home;