import { useNavigate } from "react-router-dom";
import type ActivityButton from "../../../activity/types/ActivityButton";
import Button from "../../../components/Button/Button";
import { type EditPage } from "../../../pages/Edit/Edit";
import type ActivityDisplayComponentProps from "../types/ActivityDisplayComponentProps";
import "./ActivityDisplayButtons.css";

type ActivityDisplayButtonsProps = {
    button1: ActivityButton | null,
    button2: ActivityButton | null,
} & ActivityDisplayComponentProps;

const ActivityDisplayButtons = (props: ActivityDisplayButtonsProps) => {
    const navigate = useNavigate();

    const goToEditPage = (page: EditPage) => {
        navigate(`/edit/${page}`);
    };

    return props.edit
        ? (
            <>
                {props.button1 !== null
                    ? <Button className="activity-button edit" onClick={() => goToEditPage("buttons")}>{props.button1.text}</Button>
                    : <Button className="activity-button edit empty" onClick={() => goToEditPage("buttons")} />
                }
                {props.button2 !== null
                    ? <Button className="activity-button edit" onClick={() => goToEditPage("buttons")}>{props.button2.text}</Button>
                    : <Button className="activity-button edit empty" onClick={() => goToEditPage("buttons")} />
                }
            </>
        )
        : (
            <>
                {props.button1 !== null &&
                    <Button className="activity-button">{props.button1.text}</Button>
                }
                {props.button2 !== null &&
                    <Button className="activity-button">{props.button2.text}</Button>
                }
            </>
        );
};

export default ActivityDisplayButtons;
