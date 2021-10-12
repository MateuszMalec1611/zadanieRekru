export type ProviderValue = {
    appState: AppState;
    appDispatch: (action: AppActions) => void;
};

export interface AppState {
    loading: boolean;
    error: boolean;
    errorMessage: string;
}

export type Loading = {
    type: AppActionType.LOADING;
    payload: boolean;
};

export type Error = {
    type: AppActionType.ERROR;
    payload: {
        error: boolean;
        errorMessage: string;
    };
};

export type AppActions = Loading | Error;

export enum AppActionType {
    LOADING = 'LOADING',
    ERROR = 'ERROR',
}
