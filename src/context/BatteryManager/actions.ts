import { setBatteryManagerKeyAction } from './types'

export const ACTION_BATTERY_MANAGER_SET_KEY = 'ACTION_BATTERY_MANAGER_SET_KEY'

export const setBatteryManagerKey: setBatteryManagerKeyAction = (key, payload) => ({ type: ACTION_BATTERY_MANAGER_SET_KEY, key, payload })