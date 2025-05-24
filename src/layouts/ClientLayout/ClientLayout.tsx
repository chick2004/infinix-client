import { Header } from "@/components";

import styles from "./ClientLayout.module.scss";

export default function ClientLayout({children}: {children: React.ReactNode}) {

    return (
        <div className={styles.layout}>
            <Header></Header>
            <div className={styles.main}> 
                {children}
            </div>
        </div>
    )
}