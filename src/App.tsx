import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { RoadmapPage } from "./pages/RoadmapPage";

type Page = "home" | "roadmap";

function getInitialPage(): Page {
  return window.location.pathname === "/roadmap" ? "roadmap" : "home";
}

export default function App() {
  const [page, setPage] = useState<Page>(() => getInitialPage());

  useEffect(() => {
    function handlePopState() {
      setPage(getInitialPage());
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function navigate(nextPage: Page) {
    const nextPath = nextPage === "roadmap" ? "/roadmap" : "/";
    setPage(nextPage);
    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, "", nextPath);
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#c8c8c8] flex flex-col">
      <Header currentPage={page} onNavigate={navigate} />
      <div className="flex-1 flex flex-col">
        {page === "home" ? (
          <HomePage onStart={() => navigate("roadmap")} />
        ) : (
          <RoadmapPage />
        )}
      </div>
    </div>
  );
}
