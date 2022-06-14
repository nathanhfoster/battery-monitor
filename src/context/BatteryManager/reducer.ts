
import { Reducer } from "react";
import { ACTION_BATTERY_MANAGER_SET_KEY } from "./actions";
import { BatteryManagerState, BatteryManagerAction } from "./types";

export const batteryManagerInitialState: BatteryManagerState = {
    charging: false,
    chargingTime: Infinity,
    dischargingTime: Infinity,
    level: 0,
}

export const batteryManagerReducer: Reducer<BatteryManagerState, BatteryManagerAction> = (state, action) => {
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