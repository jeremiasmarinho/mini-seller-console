import { useTheme } from '../../hooks/useTheme';

export function ThemeDebug() {
  const { theme } = useTheme();
  
  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 rounded text-xs font-mono z-50">
      <div>Current theme: {theme}</div>
      <div>HTML classes: {document.documentElement.className}</div>
      <div>Dark mode active: {document.documentElement.classList.contains('dark') ? 'YES' : 'NO'}</div>
    </div>
  );
}