import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { RoadmapPage } from "./pages/RoadmapPage";
import { EditorPage } from "./pages/EditorPage";

type Page = "home" | "roadmap" | "editor";

function getInitialPage(): Page {
  // Hash routes also work when GitHub Pages serves the app in a repository subdirectory.
  const path = window.location.hash.slice(1) || window.location.pathname;
  if (path === "/roadmap") return "roadmap";
  if (path === "/editor") return "editor";
  return "home";
}

export default function App() {
  const [page, setPage] = useState<Page>(() => getInitialPage());

  useEffect(() => {
    function handlePopState() {
      setPage(getInitialPage());
    }
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handlePopState);
    };
  }, []);

  function navigate(nextPage: Page) {
    const pathMap: Record<Page, string> = {
      home: "/",
      roadmap: "/roadmap",
      editor: "/editor",
    };
    const nextPath = `${import.meta.env.BASE_URL}#${pathMap[nextPage]}`;
    setPage(nextPage);
    if (`${window.location.pathname}${window.location.hash}` !== nextPath) {
      window.history.pushState(null, "", nextPath);
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#c8c8c8] flex flex-col">
      <Header currentPage={page} onNavigate={navigate} />
      <div className="flex-1 flex flex-col">
        {page === "home" ? (
          <HomePage onStart={() => navigate("roadmap")} />
        ) : page === "editor" ? (
          <EditorPage />
        ) : (
          <RoadmapPage />
        )}
      </div>
    </div>
  );
}
