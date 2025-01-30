import { BehaviorSubject, Observable } from 'rxjs';
import { ValidatorFn, ValidationErrors, ValidationError } from './validators.class';
import { IFileUploadControlConfiguration } from './control.interface';
export declare enum STATUS {
    INVALID = 0,
    VALID = 1,
    DISABLED = 2
}
export declare enum FileEvent {
    click = "click",
    focus = "focus",
    blur = "blur"
}
export declare class FileUploadControl {
    private readonly files;
    private listVisible;
    private status;
    private errors;
    private validators;
    private multipleEnabled;
    private nativeBehavior;
    private readonly multipleChanged;
    private readonly statusChanged;
    private readonly eventsChanged;
    private readonly discardedValue;
    private accept;
    private discard;
    private readonly acceptChanged;
    /**
     * track status `VALID`, `INVALID` or `DISABLED`
     */
    readonly statusChanges: Observable<STATUS>;
    /**
     * emit an event every time the value of the control
     * changes.
     * Initially returns last value
     */
    readonly valueChanges: BehaviorSubject<Array<File>>;
    /**
     * @internal
     * used to trigger layout change for list visibility
     */
    readonly listVisibilityChanges: BehaviorSubject<boolean>;
    /**
     * track changed on accept attribute
     */
    readonly acceptChanges: Observable<string>;
    /**
     * emit an event every time user programmatically ask for certain event
     */
    readonly eventsChanges: Observable<FileEvent>;
    /**
     * track changed on multiple attribute
     */
    readonly multipleChanges: Observable<boolean>;
    /**
     * track which files were discarded
     */
    readonly discardedValueChanges: Observable<Array<ValidationError>>;
    constructor(configuration?: IFileUploadControlConfiguration, validators?: ValidatorFn | Array<ValidatorFn>);
    /**
     * set functions that determines the synchronous validity of this control.
     */
    setValidators(newValidators: ValidatorFn | Array<ValidatorFn>): this;
    addFile(file: File): this;
    removeFile(file: File): this;
    addFiles(files: FileList): this;
    get valid(): boolean;
    get invalid(): boolean;
    getError(): Array<ValidationErrors>;
    /**
     * number of uploaded files
     */
    get size(): number;
    /**
     * return list of Files
     */
    get value(): Array<File>;
    setValue(files: Array<File>): this;
    /**
     * reset the control
     */
    clear(): this;
    get isListVisible(): boolean;
    setListVisibility(isVisible?: boolean): this;
    get disabled(): boolean;
    enable(isEnabled?: boolean): this;
    disable(isDisabled?: boolean): this;
    click(): this;
    focus(): this;
    blur(): this;
    /**
     * specifies the types of files that the server accepts
     *
     * ### Example
     *
     * ```
     * acceptFiles("file_extension|audio/*|video/*|image/*|media_type")
     * ```
     *
     * To specify more than one value, separate the values with a comma (e.g. acceptFiles("audio/*,video/*,image/*").
     *
     */
    acceptFiles(accept: string): this;
    acceptAll(): this;
    get isMultiple(): boolean;
    multiple(isEnabled?: boolean): this;
    native(isNativeBehaviorEnabled?: boolean): this;
    discardInvalid(discard?: boolean): this;
    private initialState;
    private defineValidators;
    /**
     * @internal
     * used to prevent valueChanges emit more times
     * when multiple files are uploaded
     */
    private addMultipleFiles;
    /**
     * method used to discard invalid files
     */
    private analyzeToDiscard;
    private discardFile;
    private validate;
}
//# sourceMappingURL=control.class.d.ts.map