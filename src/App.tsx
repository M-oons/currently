import { HashRouter, Route, Routes } from "react-router-dom";
import TitleBar from "./components/TitleBar/TitleBar";
import Edit from "./pages/Edit/Edit";
import Home from "./pages/Home/Home";
import Settings from "./pages/Settings/Settings";
import ActivityProvider from "./providers/ActivityProvider";
import ConfigProvider from "./providers/ConfigProvider";
import "./App.css";

const App = () => {
    return (
        <div id="app">
            <HashRouter>
                <ConfigProvider>
                    <ActivityProvider>
                        <TitleBar />
                        <div id="main">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/edit/:page" element={<Edit />} />
                                <Route path="/settings" element={<Settings />} />
                            </Routes>
                        </div>
                    </ActivityProvider>
                </ConfigProvider>
            </HashRouter>
        </div>
    );
};

export default App;
