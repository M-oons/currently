import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Switch from "../../components/Switch/Switch";
import useConfig from "../../hooks/useConfig";
import Page from "../Page";
import "./Settings.css";
import { AppInfo } from "src/AppInfo";

const Settings = () => {
    const navigate = useNavigate();
    const { config, setConfig } = useConfig();
    const [appInfo, setAppInfo] = useState<AppInfo>({} as AppInfo);
    const [launchOnSystemStartup, setLaunchOnSystemStartup] = useState<boolean>(config.launchOnSystemStartup);
    const [setActivityOnLaunch, setSetActivityOnLaunch] = useState<boolean>(config.setActivityOnLaunch);

    useEffect(() => {
        const getAppInfo = async () => {
            const appInfo = await window.info.getAppInfo();
            setAppInfo(appInfo);
        };
        getAppInfo();
    }, []);

    const toggleLaunchOnSystemStartup = useCallback((value: boolean) => {
        setLaunchOnSystemStartup(value);
    }, []);

    const toggleSetActivityOnLaunch = useCallback((value: boolean) => {
        setSetActivityOnLaunch(value);
    }, []);

    const saveSettings = () => {
        setConfig({
            launchOnSystemStartup,
            setActivityOnLaunch,
        });
        navigate("/");
    };

    return (
        <Page name="settings">
            <div className="settings-section">
                <div className="settings-title">Settings</div>
                <div className="settings-item">
                    <div className="setting-main">
                        <div className="setting-label">Run on system start-up</div>
                        <div className="setting-input">
                            <Switch
                                scale={1.2}
                                value={config.launchOnSystemStartup}
                                onChange={toggleLaunchOnSystemStartup}
                            />
                        </div>
                    </div>
                    <div className="setting-description">Automatically launch {appInfo.name} when your computer starts up</div>
                </div>
                <div className="settings-item">
                    <div className="setting-main">
                        <div className="setting-label">Set activity on launch</div>
                        <div className="setting-input">
                            <Switch
                                scale={1.2}
                                value={config.setActivityOnLaunch}
                                onChange={toggleSetActivityOnLaunch}
                            />
                        </div>
                    </div>
                    <div className="setting-description">Automatically set activity when {appInfo.name} is launched</div>
                </div>
            </div>
            <div id="settings-controls">
                <Button id="edit-done" onClick={saveSettings}>Save</Button>
            </div>
        </Page>
    );
};

export default Settings;
