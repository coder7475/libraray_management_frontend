import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useGetPokemonByNameQuery } from "@/services/pokemon";

const Home = () => {
    // Using a query hook automatically fetches data and returns query values
    const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')
    
    return (
      <>
        <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-gray-900">
          <Navbar />
        </header>
        <main className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 px-4 h-screen">
          <h1 className="text-4xl font-bold text-primary mb-2">Welcome to the Pokémon App</h1>
          <p className="text-lg text-muted-foreground mb-4 text-center max-w-xl">
            Discover information about your favorite Pokémon. This is a demo using RTK Query and React.
          </p>
          <section className="w-full max-w-md">
            {/* Example: Show Pokémon data */}
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></span>
                <span className="ml-2">Loading Bulbasaur...</span>
              </div>
            )}
            {error && (
              <div className="text-red-500 text-center py-4">
                Failed to load Pokémon data.
              </div>
            )}
            {data && (
              <div className="flex flex-col items-center bg-card rounded-lg shadow p-6">
                <img
                  src={data.sprites?.front_default}
                  alt={data.name}
                  className="w-32 h-32 mb-4"
                />
                <h2 className="text-2xl font-semibold capitalize mb-2">{data.name}</h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  {data.types?.map((t: any) => (
                    <span
                      key={t.type.name}
                      className="px-2 py-1 rounded bg-primary text-primary-foreground text-xs font-medium"
                    >
                      {t.type.name}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span>Height: {data.height}</span> &nbsp;|&nbsp; <span>Weight: {data.weight}</span>
                </div>
              </div>
            )}
          </section>
        </main>
        <Footer />
      </>
        
    );
};

export default Home;