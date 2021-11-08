import styles from "./skeleton.module.scss";

const Skeleton = () => {
    return (
        <div data-title className={styles.title}>
            <div className={`${styles.skeleton} ${styles.skeletonText}`} />
        </div>
    );
};

export default Skeleton;
