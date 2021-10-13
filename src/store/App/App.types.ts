export type ProviderValue = {
    appState: AppState;
    appDispatch: (action: AppActions) => void;
};

export interface AppState {
    loading: boolean;
    error: boolean;
    errorMessage: string;
    updateApp: boolean;
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

export type UpdateApp = {
    type: AppActionType.UPDATE_APP;
    payload: boolean;
};

export type AppActions = Loading | Error | UpdateApp;

export enum AppActionType {
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    UPDATE_APP = 'UPDATE_APP',
}
