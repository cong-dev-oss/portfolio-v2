import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CustomCursor from "@/components/feature/CustomCursor";

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      window.history.replaceState(null, "", `${pathname}${search}`);
    }
  }, [hash, pathname, search]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={__BASE_PATH__}>
        <CustomCursor />
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
