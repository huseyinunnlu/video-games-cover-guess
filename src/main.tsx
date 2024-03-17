import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import GameContext from "./contexts/GameContext";
import {StyleProvider} from "@ant-design/cssinjs";
import Modals from "./components/Modals";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <div className="w-screen h-screen">
        <StyleProvider hashPriority="high">
            <GameContext>
                <App/>
                <Modals/>
            </GameContext>
        </StyleProvider>
    </div>
)
