import "./Tooltip.css";

type TooltipProps = {
    id?: string,
    text: string,
    x?: number,
    y?: number,
    maxWidth?: number,
    maxHeight?: number,
};

const Tooltip = (props: TooltipProps) => {
    return (
        <div id={props.id} className="tooltip" style={{ bottom: `${props.y ?? 0}px`, left: `${props.x ?? 0}px` }}>
            <div className="tooltip-inner" style={{ maxWidth: `${props.maxWidth ?? 140}px` }}>
                <div className="tooltip-pointer"></div>
                <div className="tooltip-content">{props.text}</div>
            </div>
        </div>
    );
};

export default Tooltip;
