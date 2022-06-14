
import { Reducer } from "react";
import { ACTION_BATTERY_MANAGER_SET_KEY } from "./actions";
import { BatterManagerState, BatteryManagerAction } from "./types";

export const batteryManagerInitialState: BatterManagerState = {
    charging: false,
    chargingTime: 0,
    dischargingTime: 0,
    level: 0,
}

export const batteryManagerReducer: Reducer<BatterManagerState, BatteryManagerAction> = (state, action) => {
    const { type, key, payload } = action

    switch (type) {
        case ACTION_BATTERY_MANAGER_SET_KEY:
            return {
                ...state,
                [key]: payload
            }

        default:
            return state
    }
}