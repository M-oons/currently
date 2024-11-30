import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import TitleBar from "./components/TitleBar/TitleBar";
import UpdatePopup from "./components/UpdatePopup/UpdatePopup";
import Edit from "./pages/Edit/Edit";
import Home from "./pages/Home/Home";
import Settings from "./pages/Settings/Settings";
import ActivityProvider from "./providers/ActivityProvider";
import ConfigProvider from "./providers/ConfigProvider";
import "./App.css";

const App = () => {
    const [update, setUpdate] = useState<boolean>(false);

    useEffect(() => {
        const checkUpdate = async () => {
            const update = await window.flow.checkForUpdate();
            setUpdate(update);
        };
        checkUpdate();
    }, []);

    return (
        <div id="app">
            <HashRouter>
                <ConfigProvider>
                    <ActivityProvider>
                        <div id="main">
                            <TitleBar />
                            <UpdatePopup update={update} />
                            <div id="content">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/edit/:page" element={<Edit />} />
                                    <Route path="/settings" element={<Settings />} />
                                </Routes>
                            </div>
                        </div>
                    </ActivityProvider>
                </ConfigProvider>
            </HashRouter>
        </div>
    );
};

export default App;
