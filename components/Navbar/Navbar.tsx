import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./navbar.module.scss";

const Navbar = () => {
    const { asPath } = useRouter();

    return (
        <main className={styles.navbar}>
            <section>
                <div className={styles.linkNavabr}>
                    <Link href="/">
                        <a className={asPath == "/" ? styles.selected : ""}>Home</a>
                    </Link>
                </div>
                <div className={styles.linkNavabr}>
                    <Link href="/auth">
                        <a className={asPath == "/auth" ? styles.selected : ""}>Authenticate</a>
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default Navbar;
