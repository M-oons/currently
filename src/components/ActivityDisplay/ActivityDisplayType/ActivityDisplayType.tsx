import { useNavigate } from "react-router-dom";
import { type ActivityType, getActivityTypeDisplay } from "../../../activity/types/ActivityType";
import { type EditPage } from "../../../pages/Edit/Edit";
import type ActivityDisplayComponentProps from "../types/ActivityDisplayComponentProps";
import "./ActivityDisplayType.css";

type ActivityDisplayType = {
    type: ActivityType,
} & ActivityDisplayComponentProps;

const ActivityDisplayType = (props: ActivityDisplayType) => {
    const navigate = useNavigate();

    const goToEditPage = (page: EditPage) => {
        navigate(`/edit/${page}`);
    };

    return props.edit
        ? <div id="activity-type-name" className="edit" onClick={() => goToEditPage("type")}>{getActivityTypeDisplay(props.type)}</div>
        : <div id="activity-type-name">{getActivityTypeDisplay(props.type)}</div>;
};

export default ActivityDisplayType;
