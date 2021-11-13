import { useState } from "react";

import styles from "./tabs.module.scss";

interface Props {
    handleChangeAauth: (tab: number) => void;
}

interface StylesTabsTypes {
    login: styles;
    register: styles;
}

type styles = {
    [key: number]: object;
};

const STYLES_TABS: styles = {
    0: {
        left: "0",
    },
    1: {
        right: "0",
    },
};

const STYLES_TABS_TEXT: StylesTabsTypes = {
    login: {
        1: {
            color: "#a5a7af",
        },
        0: {
            color: "#7908FF",
        },
    },
    register: {
        0: {
            color: "#a5a7af",
        },
        1: {
            color: "#7908FF",
        },
    },
};

const Tabs: React.FC<Props> = ({ handleChangeAauth }) => {
    const [activeTab, setActiveTab] = useState<number>(0);

    function handleClickTab(tab: number) {
        setActiveTab(tab);
        handleChangeAauth(tab);
    }

    return (
        <section className={styles.tabsContainer}>
            <div className={styles.tabs}>
                <div className={styles.tabsText}>
                    <span
                        style={STYLES_TABS_TEXT.login[activeTab]}
                        onClick={() => handleClickTab(0)}
                    >
                        Login
                    </span>
                    <span
                        style={STYLES_TABS_TEXT.register[activeTab]}
                        onClick={() => handleClickTab(1)}
                    >
                        Sign up
                    </span>
                </div>
                <div className={styles.tab} style={STYLES_TABS[activeTab]} />
            </div>
        </section>
    );
};

export default Tabs;
