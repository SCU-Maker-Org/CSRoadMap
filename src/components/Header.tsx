type Page = "home" | "roadmap";

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="border-b border-stone-300 bg-[#fffaf0]/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="text-left text-xl font-semibold text-slate-950"
        >
          CS Roadmap
        </button>

        <nav className="flex items-center gap-2" aria-label="主导航">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className={`rounded-md px-3 py-2 text-sm font-medium transition ${
              currentPage === "home"
                ? "bg-red-50 text-red-700"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-950"
            }`}
          >
            首页
          </button>
          <button
            type="button"
            onClick={() => onNavigate("roadmap")}
            className={`rounded-md px-3 py-2 text-sm font-medium transition ${
              currentPage === "roadmap"
                ? "bg-red-50 text-red-700"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-950"
            }`}
          >
            Roadmap
          </button>
        </nav>
      </div>
    </header>
  );
}
