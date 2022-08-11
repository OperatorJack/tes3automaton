import { RecoilRoot } from "recoil";
import AppContainer from "./components/AppContainer";
import DarkModeProvider from "./DarkModeProvider";

function App() {
    return (
        <RecoilRoot>
            <DarkModeProvider>
                <AppContainer />
            </DarkModeProvider>
        </RecoilRoot>
    );
}

export default App;
