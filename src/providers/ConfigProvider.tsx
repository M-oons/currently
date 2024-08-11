import { type ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { type Config, defaultConfig } from "../config/types/Config";

type ConfigProviderProps = {
    children: ReactNode,
};

type ConfigContextState = {
    config: Config,
    setConfig: (settings: Config) => void,
};

export const ConfigContext = createContext<ConfigContextState>({} as ConfigContextState);

export const ConfigProvider = (props: ConfigProviderProps) => {
    const [config, setConfig] = useState<Config>(defaultConfig);

    useEffect(() => {
        const getConfig = async () => {
            const config = await window.config.getConfig();
            setConfig(config);
        };
        getConfig();
    }, []);

    const updateConfig = useCallback((config: Config) => {
        setConfig(config);
        window.config.setConfig(config);
    }, []);

    return (
        <ConfigContext.Provider
            value={{
                config,
                setConfig: updateConfig,
            }}
        >
            {props.children}
        </ConfigContext.Provider>
    );
};

export default ConfigProvider;
