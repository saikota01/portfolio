import { Ripple } from "@/components/magicui/ripple";

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Foreground content */}
      <div className="relative z-10 text-center px-4">
        <h5 className="font-extrabold text-4xl md:text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 animate-text">
          Hi, there!
        </h5>
        <p className="text-base sm:text-lg md:text-xl max-w-xl mx-auto text-gray-300 transition-opacity duration-300 hover:opacity-80">
          Thank you for visiting, I&apos;m actively working on this portfolio,
          updates coming soon!
        </p>
        <footer className="flex gap-2 flex-wrap items-center justify-center mt-6 text-sm sm:text-base text-gray-400">
          <span className="transition-transform duration-300">
            with <span className="text-red-500">&#x2764;</span> @saikotareddy
          </span>
        </footer>
      </div>

      {/* Subtle ripple effect */}
      <Ripple className="absolute inset-0 pointer-events-none" />
    </div>
  );
}