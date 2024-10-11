import { type ReactNode } from "react";
import "./Popup.css";

type PopupProps = {
    open: boolean,
    content?: ReactNode,
    footer?: ReactNode,
};

const Popup = (props: PopupProps) => {
    return props.open
        ? (
            <>
                <div className="popup">
                    <div className="popup-main">
                        {props.content &&
                            <div className="popup-content">
                                {props.content}
                            </div>
                        }
                        {props.footer &&
                            <div className="popup-footer">
                                {props.footer}
                            </div>
                        }
                    </div>
                </div>
                <div className="popup-overlay"></div>
            </>
        )
        : null;
};

export default Popup;
