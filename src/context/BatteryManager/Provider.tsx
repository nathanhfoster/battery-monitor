import { FC, createContext, useReducer, useContext, useEffect } from "react"
import { setBatteryManagerKey } from "./actions"
import { batteryManagerInitialState, batteryManagerReducer } from "./reducer"
import { BatteryManagerProviderProps } from "./types"


export const BatteryManagerStateContext = createContext(batteryManagerInitialState)
BatteryManagerStateContext.displayName = 'BatteryManagerStateContext'
export const useBatteryManagerState = () => useContext(BatteryManagerStateContext)

export const BatteryManagerDispatchContext = createContext((payload: any) => ({ type: 'UNKNOWN', payload }));
BatteryManagerDispatchContext.displayName = 'BatteryManagerDispatchContext'
export const useBatteryManagerDispatch = () => useContext(BatteryManagerDispatchContext)

export const BatteryManagerProvider: FC<BatteryManagerProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(batteryManagerReducer, batteryManagerInitialState)

    useEffect(() => {
        (async function getBatteryManager() {
            //@ts-ignore
            return await navigator?.getBattery?.().then(batteryManager => {
                //@ts-ignore
                const batterManagerAddEventListener = (event, key) => {
                    dispatch(setBatteryManagerKey(key, batteryManager[key]))
                    //@ts-ignore
                    batteryManager.addEventListener(event, (e: Event) => {
                        const batteryManagerRef = e.target
                        //@ts-ignore
                        batteryManagerDispatch(setBatteryManagerKey(key, batteryManagerRef[key]))
                    });
                }

                batterManagerAddEventListener('chargingchange', 'charging')
                batterManagerAddEventListener('levelchange', 'level')
                batterManagerAddEventListener('chargingtimechange', 'chargingTime')
                batterManagerAddEventListener('dischargingtimechange', 'dischargingTime')
            })
        })()
    }, [])

    return (
        //@ts-ignore
        <BatteryManagerDispatchContext.Provider value={dispatch}>
            <BatteryManagerStateContext.Provider value={state}>
                {children}
            </BatteryManagerStateContext.Provider>
        </BatteryManagerDispatchContext.Provider>
    )

}