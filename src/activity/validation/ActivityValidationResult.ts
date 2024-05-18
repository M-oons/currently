import ActivityValidationError from "./ActivityValidationError";

class PresenceValidationResult {
    private _valid: boolean;
    private _errors: ActivityValidationError[];

    public get valid(): boolean {
        return this._valid;
    }

    public get errors(): ActivityValidationError[] {
        return this._errors;
    }

    private constructor(valid: boolean, errors: ActivityValidationError[]) {
        this._valid = valid;
        this._errors = errors;
    }

    public static from(errors: ActivityValidationError[]): PresenceValidationResult {
        return new PresenceValidationResult(errors.length > 0, errors);
    }
}

export default PresenceValidationResult;
