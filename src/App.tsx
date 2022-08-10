import AppContainer from "./components/AppContainer";
import DarkModeProvider from "./DarkModeProvider";

function App() {
  return (
    <DarkModeProvider>
      <AppContainer />
    </DarkModeProvider>
  );
}

export default App;
