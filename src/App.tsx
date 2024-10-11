import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import TitleBar from "./components/TitleBar/TitleBar";
import UpdatePopup from "./components/UpdatePopup/UpdatePopup";
import Edit from "./pages/Edit/Edit";
import Home from "./pages/Home/Home";
import Settings from "./pages/Settings/Settings";
import ActivityProvider from "./providers/ActivityProvider";
import ConfigProvider from "./providers/ConfigProvider";
import { type UpdateInfo } from "./utils/updater";
import "./App.css";

const App = () => {
    const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);

    useEffect(() => {
        const checkUpdate = async () => {
            const updateInfo = await window.flow.checkForUpdate();
            setUpdateInfo(updateInfo);
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
                            <UpdatePopup updateInfo={updateInfo} />
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
