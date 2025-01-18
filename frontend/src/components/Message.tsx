import { forwardRef } from "react";
import styles from "./Message.module.css";



const Message = forwardRef<HTMLDivElement, { message: string; messageType: "sender" | "receiver" }>(
    (props, ref) => {
        return (
            <div ref={ref} className={styles[props.messageType]}>
                <p>{props.message}</p>
            </div>
        );
    }
);

export default Message;