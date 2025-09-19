import LeadsPage from "./ui/pages/LeadsPage";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <LeadsPage />
      </div>
    </ThemeProvider>
  );
}
