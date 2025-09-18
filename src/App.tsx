import { ThemeProvider } from "./contexts/ThemeContext";
import LeadsPage from "./ui/pages/LeadsPage";

export default function App() {
  return (
    <ThemeProvider>
      <LeadsPage />
    </ThemeProvider>
  );
}
