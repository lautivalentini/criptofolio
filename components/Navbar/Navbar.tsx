import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./navbar.module.scss";

const Navbar = () => {
    const { asPath } = useRouter();

    return (
        <main className={styles.navbar}>
            <section>
                <Link className={styles.linkNavabr} href="/">
                    <a className={asPath == "/" ? styles.selected : ""}>Home</a>
                </Link>
                <Link className={styles.linkNavabr} href="/auth">
                    <a className={asPath == "/auth" ? styles.selected : ""}>Authenticate</a>
                </Link>
            </section>
        </main>
    );
};

export default Navbar;
