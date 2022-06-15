import { Context, Dispatch, ReactElement, } from "react";

export interface ContextBaseAction {
    type: string;
    key?: string;
    payload?: any
}

export type MapStateToPropsType<S, P> = (state: S, ownProps: P) => (S | P) | (S & P);

export type MapDispatchToPropsType<D> = (
    dispatch: Dispatch<D>
) => D

export interface MapStateToPropsArray<S, P> {
    context: Context<S>;
    mapStateToProps: MapStateToPropsType<S, P>
}

export type ConnectType<S, P> = (
    mapStateToPropsArray: MapStateToPropsType<S, P>[],
    // mapDispatchToProps: MapDispatchToPropsType<D>,
) => (Component: React.FC<P>) => (ownProps: P) => ReactElement<P>;