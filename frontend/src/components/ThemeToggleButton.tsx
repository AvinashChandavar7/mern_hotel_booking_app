import { useTheme } from "../contexts/ThemeContext";

const ThemeToggleButton = () => {
  const { mode, setMode } = useTheme();

  return (
    <button
      className="px-4 py-1 my-5 bg-white border border-blue-600 rounded-md w-fit shadow-blue-500 dark:shadow-blue-500 "
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
    >
      <img src="/assets/moon.svg" alt="dark-moon" width={30} height={30} loading="lazy" />
    </button>
  );
}

export default ThemeToggleButton;
