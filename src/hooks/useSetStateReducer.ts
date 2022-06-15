
import { useRef, useReducer, useCallback, useEffect, MutableRefObject, Dispatch, ReducerState, Reducer, ReducerStateWithoutAction } from 'react';
import { setObjectStateReducer } from './reducers';

const defaultCallback = () => { };

export interface useSetStateReducerProps { reducer?: Reducer<any, any>, initializerArg: ReducerState<any>, initializer?: (arg: ReducerState<any>) => ReducerState<any> }

export type AugmentedDispatch = (updater: Record<string, any>, callback?: () => any) => any;

export type useSetStateReducer = (args: useSetStateReducerProps) => [Record<string, any>, AugmentedDispatch]

/**
 * Mimics React.Component this.state and this.setState
 */
const useSetStateReducer: useSetStateReducer = ({ reducer = setObjectStateReducer, initializerArg, initializer = (initializerArg) => initializerArg }) => {
    // Temporarily holds the reference to a callback
    const callbackRef: MutableRefObject<(arg: ReducerState<any>) => ReducerState<any>> = useRef(defaultCallback);
    const [state, dispatch]: [Record<string, any>, Dispatch<any>] = useReducer(
        reducer,
        initializerArg,
        initializer
    );

    /**
     * Augments the dispatch to accept a callback as a second parameter
     */
    const setState: AugmentedDispatch = useCallback((updater, callback) => {
        callbackRef.current = callback || defaultCallback;
        dispatch(updater);
    }, []);

    // Synchronously call the callback after every state change
    useEffect(() => {
        callbackRef.current(state);
        callbackRef.current = defaultCallback;
    }, [state]);

    return [state, setState];
};

export default useSetStateReducer;
