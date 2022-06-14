import { ReactNode } from "react";
import { ContextBaseAction } from "../types";
import { setBatteryManagerKey } from "./actions";


export interface BatterManagerState {
    charging: boolean; // A Boolean value indicating whether the battery is currently being charged.
    chargingTime: number; // A number representing the remaining time in seconds until the battery is fully charged, or 0 if the battery is already fully charged.
    dischargingTime: number; // A number representing the remaining time in seconds until the battery is completely discharged and the system suspends.
    level: number; // A number representing the system's battery charge level scaled to a value between 0.0 and 1.0.
}

export interface BatteryManagerAction extends ContextBaseAction {

}

export interface BatteryManagerProviderProps {
    children: ReactNode
}


export type setBatteryManagerKeyAction = (key: keyof BatterManagerState, payload: BatterManagerState[typeof key]) => BatteryManagerAction