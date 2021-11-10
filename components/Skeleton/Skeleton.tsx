import React from "react";

import styles from "./skeleton.module.scss";

interface Props {
    width?: string;
    heigth?: string;
}

const Skeleton: React.FC<Props> = ({ width, heigth }) => {
    return (
        <div data-title className={styles.title}>
            <div
                className={`${styles.skeleton} ${styles.skeletonText}`}
                style={{ width: width, height: heigth }}
            />
        </div>
    );
};

export default Skeleton;
