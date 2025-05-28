export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-md z-50 px-8 py-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-extrabold text-gray-900">Artify</h1>
          <p className="mt-1 text-sm font-light text-gray-600">
            Your go-to place for art collections!
          </p>
        </div>

        <nav className="space-x-6 text-gray-700 font-medium">
          <a
            href="/"
            className="hover:text-indigo-600 transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="/search"
            className="hover:text-indigo-600 transition-colors duration-300"
          >
            Search
          </a>
          <a
            href="/loginpage"
            className="hover:text-indigo-600 transition-colors duration-300"
          >
            Login
          </a>
        </nav>
      </div>
    </header>
  );
}
