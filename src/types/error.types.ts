export type ErrorType = {
    isError: boolean;
    errorMessage: string;
};

export interface FormValidationError {
    errors: {
        code: string;
        field: string;
        message: string;
    }[];
}
