import * as React from 'react';
import { useInitializeTheming } from "./utils/Theming";
import { useInitializeStore } from "./utils/Store";
import { A11yAnnouncementProvider } from "./components/ld/A11yAnnouncement";
import { A11yDevAssertions } from "./components/ld/A11yDevAssertions";

import PortfolioPage from "./pages/PortfolioPage";

export default function App() {
  useInitializeTheming('Walmart', ['Walmart'] as const);
  useInitializeStore();

  return (
    <A11yAnnouncementProvider>
      <A11yDevAssertions />
      <PortfolioPage />
    </A11yAnnouncementProvider>
  );
}
