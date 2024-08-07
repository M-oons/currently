const MOUSE_BACKWARD = 3;
const MOUSE_FORWARD = 4;

export const handleMouseEvent = (event: MouseEvent): void => {
    if (event.button === MOUSE_BACKWARD || event.button === MOUSE_FORWARD)
        event.preventDefault();
};
