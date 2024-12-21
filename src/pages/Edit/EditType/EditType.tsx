import { type Dispatch, type SetStateAction, useCallback } from "react";
import ActivityType from "../../../activity/types/ActivityType";
import Select from "../../../components/Select/Select";
import "./EditType.css";

type EditTypeProps = {
    type: ActivityType,
    setType: Dispatch<SetStateAction<ActivityType>>,
};

const EditType = (props: EditTypeProps) => {
    const changeType = useCallback((type: ActivityType) => {
        props.setType(type);
    }, []);

    return (
        <>
            <div className="edit-section">
                <div className="edit-title">Activity type</div>
                <div className="edit-item">
                    <div id="edit-type">
                        <Select
                            options={Object.entries(ActivityType).map(type => ({
                                label: type[0],
                                value: type[1],
                            }))}
                            value={props.type}
                            label="- Select Type -"
                            onChange={changeType}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditType;
