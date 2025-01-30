import { IsNullOrEmpty } from './helpers.class';
import { FileUploadTypes } from './file-types.class';
/**
 * function used to check file size
 */
const checkFileSize = (actualSize, maxSize, minSize = 0, file) => {
    return (!IsNullOrEmpty(maxSize) && actualSize > maxSize) || actualSize < minSize ?
        { maxSize, minSize, actual: actualSize, file } : null;
};
const getFileType = (file, fileExtension) => {
    const type = file.type;
    if (!IsNullOrEmpty(type)) {
        return type;
    }
    return FileUploadTypes[fileExtension];
};
var CheckType;
(function (CheckType) {
    CheckType[CheckType["ALLOWED"] = 0] = "ALLOWED";
    CheckType[CheckType["NOTALLOWED"] = 1] = "NOTALLOWED";
})(CheckType || (CheckType = {}));
const FILE_EXT_REG = /(^[.]\w*)$/m;
/**
 * function used to check file type
 *
 * #### allowedTypes
 * file_extension|audio/*|video/*|image/*|media_type
 */
const checkFileTypes = (file, types, checkType) => {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const fileType = getFileType(file, fileExtension);
    for (const type of types) {
        const isFound = FILE_EXT_REG.test(type) ? type === `.${fileExtension}` : new RegExp(type).test(fileType);
        if (isFound) {
            return checkType === CheckType.ALLOWED ? null : { notAllowedTypes: types, actual: fileType, file };
        }
    }
    return checkType === CheckType.ALLOWED ? { allowedTypes: types, actual: fileType, file } : null;
};
const checkValueType = (value) => {
    if (!Array.isArray(value)) {
        throw Error(`FormControl.setValue was provided with wrong argument type, ${value} was provided instead Array<File>`);
    }
};
// @dynamic
export class FileUploadValidators {
    /**
     * Validator that compare the summary size of all files
     */
    static sizeLimit(maxSize) {
        return (control) => {
            const files = control.value;
            if (IsNullOrEmpty(files)) {
                return null;
            }
            checkValueType(files);
            const sum = files.map(file => file.size).reduce((a, b) => a + b, 0);
            const toLargeFiles = checkFileSize(sum, maxSize);
            return toLargeFiles ?
                { 'sizeLimit': toLargeFiles } : null;
        };
    }
    /**
     * Validator that validate individually file maximum size length.
     * Compare the File size in bytes
     * @dynamic
     */
    static fileSize(maxSize) {
        return (control) => {
            const files = control.value;
            if (IsNullOrEmpty(files)) {
                return null;
            }
            checkValueType(files);
            const toLargeFiles = files.map((file) => checkFileSize(file.size, maxSize, 0, file))
                .filter((error) => error);
            return toLargeFiles.length > 0 ?
                { 'fileSize': toLargeFiles } : null;
        };
    }
    /**
     * Compare the File size in bytes with max and min size limits
     * @dynamic
     */
    static sizeRange({ minSize, maxSize }) {
        return (control) => {
            const files = control.value;
            if (IsNullOrEmpty(files)) {
                return null;
            }
            checkValueType(files);
            const sizeMismatch = files.map((file) => checkFileSize(file.size, maxSize, minSize, file))
                .filter((error) => error);
            return sizeMismatch.length > 0 ?
                { 'sizeRange': sizeMismatch } : null;
        };
    }
    /**
     * validator that requires control to have limit on files number
     * @dynamic
     */
    static filesLimit(numFiles) {
        return (control) => {
            const files = control.value;
            if (IsNullOrEmpty(files)) {
                return null;
            }
            checkValueType(files);
            const filesLimit = files.slice(-1 * (files.length - numFiles))
                .map(file => ({ 'max': numFiles, 'actual': files.length, file }));
            return files.length > numFiles ?
                { 'filesLimit': filesLimit } : null;
        };
    }
    /**
     * validator that requires control to have limit on media types
     *
     * ##### Allowed media types are
     *
     * - file_extension - a file extension starting with the STOP character,
     * e.g: .gif, .jpg, .png, .doc
     * - audio/* -        All sound files are accepted
     * - video/* -        All video files are accepted
     * - image/* -        All image files are accepted
     * - media_type -     A valid media type, with no parameters. Look at [IANA Media Types]
     *      (https://www.iana.org/assignments/media-types/media-types.xhtml) for a complete list of standard media types
     *
     * #### Example
     * `FileUploadValidators.accept([file_extension, audio/*, video/*, image/*, media_type])`
     * @dynamic
     */
    static accept(allowedFileTypes) {
        return (control) => {
            const files = control.value;
            if (IsNullOrEmpty(files)) {
                return null;
            }
            checkValueType(files);
            const notAllowedFiles = files.map((file) => checkFileTypes(file, allowedFileTypes, CheckType.ALLOWED))
                .filter((error) => error);
            return notAllowedFiles.length > 0 ?
                { 'fileTypes': notAllowedFiles } : null;
        };
    }
    /**
     * validator that requires control to have limit on media types
     *
     * ##### Not allowed media types are
     *
     * - file_extension - a file extension starting with the STOP character,
     * e.g: .gif, .jpg, .png, .doc
     * - audio/* -        All sound files are accepted
     * - video/* -        All video files are accepted
     * - image/* -        All image files are accepted
     * - media_type -     A valid media type, with no parameters. Look at [IANA Media Types]
     *      (https://www.iana.org/assignments/media-types/media-types.xhtml) for a complete list of standard media types
     *
     * #### Example
     * `FileUploadValidators.reject([file_extension, audio/*, video/*, image/*, media_type])`
     * @dynamic
     */
    static reject(rejectFileTypes) {
        return (control) => {
            const files = control.value;
            if (IsNullOrEmpty(files)) {
                return null;
            }
            checkValueType(files);
            const notAllowedFiles = files.map((file) => checkFileTypes(file, rejectFileTypes, CheckType.NOTALLOWED))
                .filter((error) => error);
            return notAllowedFiles.length > 0 ?
                { 'fileTypes': notAllowedFiles } : null;
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9ycy5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2lwbGFiL25neC1maWxlLXVwbG9hZC9zcmMvbGliL2hlbHBlcnMvdmFsaWRhdG9ycy5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBY3JEOztHQUVHO0FBQ0gsTUFBTSxhQUFhLEdBQUcsQ0FBQyxVQUFrQixFQUFFLE9BQWUsRUFBRSxVQUFrQixDQUFDLEVBQUUsSUFBVyxFQUEyQixFQUFFO0lBQ3JILE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBQzlFLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDNUQsQ0FBQyxDQUFDO0FBRUYsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFVLEVBQUUsYUFBcUIsRUFBbUIsRUFBRTtJQUN2RSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdEIsT0FBTyxJQUF1QixDQUFDO0tBQ2xDO0lBRUQsT0FBTyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDMUMsQ0FBQyxDQUFDO0FBRUYsSUFBSyxTQUdKO0FBSEQsV0FBSyxTQUFTO0lBQ1YsK0NBQU8sQ0FBQTtJQUNQLHFEQUFVLENBQUE7QUFDZCxDQUFDLEVBSEksU0FBUyxLQUFULFNBQVMsUUFHYjtBQUVELE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQztBQUNuQzs7Ozs7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QztRQUM5QyxDQUFDLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFDSSxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQThCO1FBQy9DLE9BQU8sQ0FBQyxPQUE0QyxFQUFvQixFQUFFO1lBQ3RFLE1BQU0sS0FBSyxHQUFnQixPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ3pDLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUFFLE9BQU8sSUFBSSxDQUFDO2FBQUU7WUFDMUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXRCLE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDM0UsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUV0RCxPQUFPLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLEVBQUMsV0FBVyxFQUFFLGVBQWUsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDOUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztDQUVKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBJc051bGxPckVtcHR5IH0gZnJvbSAnLi9oZWxwZXJzLmNsYXNzJztcclxuaW1wb3J0IHsgRmlsZVVwbG9hZENvbnRyb2wgfSBmcm9tICcuL2NvbnRyb2wuY2xhc3MnO1xyXG5pbXBvcnQgeyBGaWxlVXBsb2FkVHlwZXMgfSBmcm9tICcuL2ZpbGUtdHlwZXMuY2xhc3MnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0aW9uRXJyb3Ige1xyXG4gICAgYWN0dWFsOiBhbnk7XHJcbiAgICBmaWxlOiBGaWxlO1xyXG4gICAgW2tleTogc3RyaW5nXTogYW55O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRpb25FcnJvcnMge1xyXG4gICAgW2tleTogc3RyaW5nXTogYW55O1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSAgVmFsaWRhdG9yRm4gPSAoYzogQWJzdHJhY3RDb250cm9sIHwgRmlsZVVwbG9hZENvbnRyb2wpID0+IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsO1xyXG5cclxuLyoqXHJcbiAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgZmlsZSBzaXplXHJcbiAqL1xyXG5jb25zdCBjaGVja0ZpbGVTaXplID0gKGFjdHVhbFNpemU6IG51bWJlciwgbWF4U2l6ZTogbnVtYmVyLCBtaW5TaXplOiBudW1iZXIgPSAwLCBmaWxlPzogRmlsZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcclxuICAgIHJldHVybiAoIUlzTnVsbE9yRW1wdHkobWF4U2l6ZSkgJiYgYWN0dWFsU2l6ZSA+IG1heFNpemUpIHx8IGFjdHVhbFNpemUgPCBtaW5TaXplID9cclxuICAgICAgICB7bWF4U2l6ZSwgbWluU2l6ZSwgYWN0dWFsOiBhY3R1YWxTaXplLCBmaWxlfSA6IG51bGw7XHJcbn07XHJcblxyXG5jb25zdCBnZXRGaWxlVHlwZSA9IChmaWxlOiBGaWxlLCBmaWxlRXh0ZW5zaW9uOiBzdHJpbmcpOiBGaWxlVXBsb2FkVHlwZXMgPT4ge1xyXG4gICAgY29uc3QgdHlwZSA9IGZpbGUudHlwZTtcclxuICAgIGlmICghSXNOdWxsT3JFbXB0eSh0eXBlKSkge1xyXG4gICAgICAgIHJldHVybiB0eXBlIGFzIEZpbGVVcGxvYWRUeXBlcztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gRmlsZVVwbG9hZFR5cGVzW2ZpbGVFeHRlbnNpb25dO1xyXG59O1xyXG5cclxuZW51bSBDaGVja1R5cGUge1xyXG4gICAgQUxMT1dFRCxcclxuICAgIE5PVEFMTE9XRURcclxufVxyXG5cclxuY29uc3QgRklMRV9FWFRfUkVHID0gLyheWy5dXFx3KikkL207XHJcbi8qKlxyXG4gKiBmdW5jdGlvbiB1c2VkIHRvIGNoZWNrIGZpbGUgdHlwZVxyXG4gKlxyXG4gKiAjIyMjIGFsbG93ZWRUeXBlc1xyXG4gKiBmaWxlX2V4dGVuc2lvbnxhdWRpby8qfHZpZGVvLyp8aW1hZ2UvKnxtZWRpYV90eXBlXHJcbiAqL1xyXG5jb25zdCBjaGVja0ZpbGVUeXBlcyA9IChmaWxlOiBGaWxlLCB0eXBlczogQXJyYXk8c3RyaW5nPiwgY2hlY2tUeXBlOiBDaGVja1R5cGUpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XHJcbiAgICBjb25zdCBmaWxlRXh0ZW5zaW9uID0gZmlsZS5uYW1lLnNwbGl0KCcuJykucG9wKCkudG9Mb3dlckNhc2UoKTtcclxuICAgIGNvbnN0IGZpbGVUeXBlID0gZ2V0RmlsZVR5cGUoZmlsZSwgZmlsZUV4dGVuc2lvbik7XHJcblxyXG4gICAgZm9yIChjb25zdCB0eXBlIG9mIHR5cGVzKSB7XHJcbiAgICAgICAgY29uc3QgaXNGb3VuZCA9IEZJTEVfRVhUX1JFRy50ZXN0KHR5cGUpID8gdHlwZSA9PT0gYC4ke2ZpbGVFeHRlbnNpb259YCA6IG5ldyBSZWdFeHAodHlwZSkudGVzdChmaWxlVHlwZSk7XHJcbiAgICAgICAgaWYgKGlzRm91bmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNoZWNrVHlwZSA9PT0gQ2hlY2tUeXBlLkFMTE9XRUQgPyBudWxsIDoge25vdEFsbG93ZWRUeXBlczogdHlwZXMsIGFjdHVhbDogZmlsZVR5cGUsIGZpbGV9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY2hlY2tUeXBlID09PSBDaGVja1R5cGUuQUxMT1dFRCA/IHthbGxvd2VkVHlwZXM6IHR5cGVzLCBhY3R1YWw6IGZpbGVUeXBlLCBmaWxlfSA6IG51bGw7XHJcbn07XHJcblxyXG5jb25zdCBjaGVja1ZhbHVlVHlwZSA9ICh2YWx1ZTogYW55ICk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgIHRocm93IEVycm9yKGBGb3JtQ29udHJvbC5zZXRWYWx1ZSB3YXMgcHJvdmlkZWQgd2l0aCB3cm9uZyBhcmd1bWVudCB0eXBlLCAke3ZhbHVlfSB3YXMgcHJvdmlkZWQgaW5zdGVhZCBBcnJheTxGaWxlPmApO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gQGR5bmFtaWNcclxuZXhwb3J0IGNsYXNzIEZpbGVVcGxvYWRWYWxpZGF0b3JzIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFZhbGlkYXRvciB0aGF0IGNvbXBhcmUgdGhlIHN1bW1hcnkgc2l6ZSBvZiBhbGwgZmlsZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzaXplTGltaXQobWF4U2l6ZTogbnVtYmVyKTogVmFsaWRhdG9yRm4ge1xyXG4gICAgICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sIHwgRmlsZVVwbG9hZENvbnRyb2wpOiB7c2l6ZUxpbWl0OiBWYWxpZGF0aW9uRXJyb3JzfSB8IG51bGwgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmaWxlczogQXJyYXk8RmlsZT4gPSBjb250cm9sLnZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoSXNOdWxsT3JFbXB0eShmaWxlcykpIHsgcmV0dXJuIG51bGw7IH1cclxuICAgICAgICAgICAgY2hlY2tWYWx1ZVR5cGUoZmlsZXMpO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3VtID0gZmlsZXMubWFwKGZpbGUgPT4gZmlsZS5zaXplKS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcclxuICAgICAgICAgICAgY29uc3QgdG9MYXJnZUZpbGVzID0gY2hlY2tGaWxlU2l6ZShzdW0sIG1heFNpemUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRvTGFyZ2VGaWxlcyA/XHJcbiAgICAgICAgICAgICAgICAgICAgeydzaXplTGltaXQnOiB0b0xhcmdlRmlsZXN9IDogbnVsbDtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmFsaWRhdG9yIHRoYXQgdmFsaWRhdGUgaW5kaXZpZHVhbGx5IGZpbGUgbWF4aW11bSBzaXplIGxlbmd0aC5cclxuICAgICAqIENvbXBhcmUgdGhlIEZpbGUgc2l6ZSBpbiBieXRlc1xyXG4gICAgICogQGR5bmFtaWNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmaWxlU2l6ZShtYXhTaXplOiBudW1iZXIpOiBWYWxpZGF0b3JGbiB7XHJcbiAgICAgICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wgfCBGaWxlVXBsb2FkQ29udHJvbCk6IHtmaWxlU2l6ZTogQXJyYXk8VmFsaWRhdGlvbkVycm9ycz59ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmlsZXM6IEFycmF5PEZpbGU+ID0gY29udHJvbC52YWx1ZTtcclxuICAgICAgICAgICAgaWYgKElzTnVsbE9yRW1wdHkoZmlsZXMpKSB7IHJldHVybiBudWxsOyB9XHJcbiAgICAgICAgICAgIGNoZWNrVmFsdWVUeXBlKGZpbGVzKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRvTGFyZ2VGaWxlcyA9IGZpbGVzLm1hcCgoZmlsZSkgPT4gY2hlY2tGaWxlU2l6ZShmaWxlLnNpemUsIG1heFNpemUsIDAsIGZpbGUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoZXJyb3IpID0+IGVycm9yKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0b0xhcmdlRmlsZXMubGVuZ3RoID4gMCA/XHJcbiAgICAgICAgICAgICAgICAgICAgeydmaWxlU2l6ZSc6IHRvTGFyZ2VGaWxlc30gOiBudWxsO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb21wYXJlIHRoZSBGaWxlIHNpemUgaW4gYnl0ZXMgd2l0aCBtYXggYW5kIG1pbiBzaXplIGxpbWl0c1xyXG4gICAgICogQGR5bmFtaWNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzaXplUmFuZ2UoeyBtaW5TaXplLCBtYXhTaXplIH06IHsgbWluU2l6ZT86IG51bWJlcjsgbWF4U2l6ZT86IG51bWJlciB9KTogVmFsaWRhdG9yRm4ge1xyXG4gICAgICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sIHwgRmlsZVVwbG9hZENvbnRyb2wpOiB7c2l6ZVJhbmdlOiBBcnJheTxWYWxpZGF0aW9uRXJyb3JzPn0gPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmaWxlczogQXJyYXk8RmlsZT4gPSBjb250cm9sLnZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoSXNOdWxsT3JFbXB0eShmaWxlcykpIHsgcmV0dXJuIG51bGw7IH1cclxuICAgICAgICAgICAgY2hlY2tWYWx1ZVR5cGUoZmlsZXMpO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2l6ZU1pc21hdGNoID0gZmlsZXMubWFwKChmaWxlKSA9PiBjaGVja0ZpbGVTaXplKGZpbGUuc2l6ZSwgbWF4U2l6ZSwgbWluU2l6ZSwgZmlsZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChlcnJvcikgPT4gZXJyb3IpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNpemVNaXNtYXRjaC5sZW5ndGggPiAwID9cclxuICAgICAgICAgICAgICAgICAgICB7J3NpemVSYW5nZSc6IHNpemVNaXNtYXRjaH0gOiBudWxsO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB2YWxpZGF0b3IgdGhhdCByZXF1aXJlcyBjb250cm9sIHRvIGhhdmUgbGltaXQgb24gZmlsZXMgbnVtYmVyXHJcbiAgICAgKiBAZHluYW1pY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZpbGVzTGltaXQobnVtRmlsZXM6IG51bWJlcik6IFZhbGlkYXRvckZuIHtcclxuICAgICAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCB8IEZpbGVVcGxvYWRDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGVzOiBBcnJheTxGaWxlPiA9IGNvbnRyb2wudmFsdWU7XHJcbiAgICAgICAgICAgIGlmIChJc051bGxPckVtcHR5KGZpbGVzKSkgeyByZXR1cm4gbnVsbDsgfVxyXG4gICAgICAgICAgICBjaGVja1ZhbHVlVHlwZShmaWxlcyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmaWxlc0xpbWl0ID0gZmlsZXMuc2xpY2UoLTEgKiAoZmlsZXMubGVuZ3RoIC0gbnVtRmlsZXMpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKGZpbGUgPT4gKHsnbWF4JzogbnVtRmlsZXMsICdhY3R1YWwnOiBmaWxlcy5sZW5ndGgsIGZpbGUgfSkpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZpbGVzLmxlbmd0aCA+IG51bUZpbGVzID9cclxuICAgICAgICAgICAgICAgIHsnZmlsZXNMaW1pdCc6IGZpbGVzTGltaXR9IDogbnVsbDtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdmFsaWRhdG9yIHRoYXQgcmVxdWlyZXMgY29udHJvbCB0byBoYXZlIGxpbWl0IG9uIG1lZGlhIHR5cGVzXHJcbiAgICAgKlxyXG4gICAgICogIyMjIyMgQWxsb3dlZCBtZWRpYSB0eXBlcyBhcmVcclxuICAgICAqXHJcbiAgICAgKiAtIGZpbGVfZXh0ZW5zaW9uIC0gYSBmaWxlIGV4dGVuc2lvbiBzdGFydGluZyB3aXRoIHRoZSBTVE9QIGNoYXJhY3RlcixcclxuICAgICAqIGUuZzogLmdpZiwgLmpwZywgLnBuZywgLmRvY1xyXG4gICAgICogLSBhdWRpby8qIC0gICAgICAgIEFsbCBzb3VuZCBmaWxlcyBhcmUgYWNjZXB0ZWRcclxuICAgICAqIC0gdmlkZW8vKiAtICAgICAgICBBbGwgdmlkZW8gZmlsZXMgYXJlIGFjY2VwdGVkXHJcbiAgICAgKiAtIGltYWdlLyogLSAgICAgICAgQWxsIGltYWdlIGZpbGVzIGFyZSBhY2NlcHRlZFxyXG4gICAgICogLSBtZWRpYV90eXBlIC0gICAgIEEgdmFsaWQgbWVkaWEgdHlwZSwgd2l0aCBubyBwYXJhbWV0ZXJzLiBMb29rIGF0IFtJQU5BIE1lZGlhIFR5cGVzXVxyXG4gICAgICogICAgICAoaHR0cHM6Ly93d3cuaWFuYS5vcmcvYXNzaWdubWVudHMvbWVkaWEtdHlwZXMvbWVkaWEtdHlwZXMueGh0bWwpIGZvciBhIGNvbXBsZXRlIGxpc3Qgb2Ygc3RhbmRhcmQgbWVkaWEgdHlwZXNcclxuICAgICAqXHJcbiAgICAgKiAjIyMjIEV4YW1wbGVcclxuICAgICAqIGBGaWxlVXBsb2FkVmFsaWRhdG9ycy5hY2NlcHQoW2ZpbGVfZXh0ZW5zaW9uLCBhdWRpby8qLCB2aWRlby8qLCBpbWFnZS8qLCBtZWRpYV90eXBlXSlgXHJcbiAgICAgKiBAZHluYW1pY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFjY2VwdChhbGxvd2VkRmlsZVR5cGVzOiBBcnJheTxzdHJpbmc+KTogVmFsaWRhdG9yRm4ge1xyXG4gICAgICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sIHwgRmlsZVVwbG9hZENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmlsZXM6IEFycmF5PEZpbGU+ID0gY29udHJvbC52YWx1ZTtcclxuICAgICAgICAgICAgaWYgKElzTnVsbE9yRW1wdHkoZmlsZXMpKSB7IHJldHVybiBudWxsOyB9XHJcbiAgICAgICAgICAgIGNoZWNrVmFsdWVUeXBlKGZpbGVzKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG5vdEFsbG93ZWRGaWxlcyA9IGZpbGVzLm1hcCgoZmlsZSkgPT4gY2hlY2tGaWxlVHlwZXMoZmlsZSwgYWxsb3dlZEZpbGVUeXBlcywgQ2hlY2tUeXBlLkFMTE9XRUQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoZXJyb3IpID0+IGVycm9yKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBub3RBbGxvd2VkRmlsZXMubGVuZ3RoID4gMCA/XHJcbiAgICAgICAgICAgICAgICB7J2ZpbGVUeXBlcyc6IG5vdEFsbG93ZWRGaWxlc30gOiBudWxsO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB2YWxpZGF0b3IgdGhhdCByZXF1aXJlcyBjb250cm9sIHRvIGhhdmUgbGltaXQgb24gbWVkaWEgdHlwZXNcclxuICAgICAqXHJcbiAgICAgKiAjIyMjIyBOb3QgYWxsb3dlZCBtZWRpYSB0eXBlcyBhcmVcclxuICAgICAqXHJcbiAgICAgKiAtIGZpbGVfZXh0ZW5zaW9uIC0gYSBmaWxlIGV4dGVuc2lvbiBzdGFydGluZyB3aXRoIHRoZSBTVE9QIGNoYXJhY3RlcixcclxuICAgICAqIGUuZzogLmdpZiwgLmpwZywgLnBuZywgLmRvY1xyXG4gICAgICogLSBhdWRpby8qIC0gICAgICAgIEFsbCBzb3VuZCBmaWxlcyBhcmUgYWNjZXB0ZWRcclxuICAgICAqIC0gdmlkZW8vKiAtICAgICAgICBBbGwgdmlkZW8gZmlsZXMgYXJlIGFjY2VwdGVkXHJcbiAgICAgKiAtIGltYWdlLyogLSAgICAgICAgQWxsIGltYWdlIGZpbGVzIGFyZSBhY2NlcHRlZFxyXG4gICAgICogLSBtZWRpYV90eXBlIC0gICAgIEEgdmFsaWQgbWVkaWEgdHlwZSwgd2l0aCBubyBwYXJhbWV0ZXJzLiBMb29rIGF0IFtJQU5BIE1lZGlhIFR5cGVzXVxyXG4gICAgICogICAgICAoaHR0cHM6Ly93d3cuaWFuYS5vcmcvYXNzaWdubWVudHMvbWVkaWEtdHlwZXMvbWVkaWEtdHlwZXMueGh0bWwpIGZvciBhIGNvbXBsZXRlIGxpc3Qgb2Ygc3RhbmRhcmQgbWVkaWEgdHlwZXNcclxuICAgICAqXHJcbiAgICAgKiAjIyMjIEV4YW1wbGVcclxuICAgICAqIGBGaWxlVXBsb2FkVmFsaWRhdG9ycy5yZWplY3QoW2ZpbGVfZXh0ZW5zaW9uLCBhdWRpby8qLCB2aWRlby8qLCBpbWFnZS8qLCBtZWRpYV90eXBlXSlgXHJcbiAgICAgKiBAZHluYW1pY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlamVjdChyZWplY3RGaWxlVHlwZXM6IEFycmF5PHN0cmluZz4pOiBWYWxpZGF0b3JGbiB7XHJcbiAgICAgICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wgfCBGaWxlVXBsb2FkQ29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmaWxlczogQXJyYXk8RmlsZT4gPSBjb250cm9sLnZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoSXNOdWxsT3JFbXB0eShmaWxlcykpIHsgcmV0dXJuIG51bGw7IH1cclxuICAgICAgICAgICAgY2hlY2tWYWx1ZVR5cGUoZmlsZXMpO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgbm90QWxsb3dlZEZpbGVzID0gZmlsZXMubWFwKChmaWxlKSA9PiBjaGVja0ZpbGVUeXBlcyhmaWxlLCByZWplY3RGaWxlVHlwZXMsIENoZWNrVHlwZS5OT1RBTExPV0VEKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKGVycm9yKSA9PiBlcnJvcik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbm90QWxsb3dlZEZpbGVzLmxlbmd0aCA+IDAgP1xyXG4gICAgICAgICAgICAgICAgeydmaWxlVHlwZXMnOiBub3RBbGxvd2VkRmlsZXN9IDogbnVsbDtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=