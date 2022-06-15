import { FC } from "react"
import { BatteryManagerStateContext, } from "../../../context/BatteryManager/Provider"
import { BatteryManagerState } from "../../../context/BatteryManager/types"
import connect from "../../../context/connect"
import { MapStateToPropsType } from "../../../context/types"
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Box from "@mui/material/Box"
import { Typography } from "@mui/material"

const MIN = 0
const MAX = 100

// MIN = Minimum expected value
// MAX = Maximium expected value
// Function to normalize the values (MIN / MAX could be integrated)
const normalize = (value: number) => isFinite(value) ? ((value - MIN) * 100) / (MAX - MIN) : 0;

interface BatteryLevelProps {
    value: number;
    buffer?: number;
    color: LinearProgressProps['color']
    chargingTimeMessage: string;
}


const BatteryLevel: FC<BatteryLevelProps> = ({ value, buffer, color, chargingTimeMessage }) => {

    return (
        <>
            <Box display='flex' justifyContent="center">
                <Typography variant="h3" >{value}%</Typography>
            </Box>
            <LinearProgress
                variant={buffer ? "buffer" : "determinate"}
                value={value}
                valueBuffer={buffer}
                color={color}
                sx={{ height: 50, borderRadius: 2 }}
            />
            <Box display='flex' justifyContent="center">
                <Typography variant="subtitle1">{chargingTimeMessage}</Typography>

            </Box>
        </>
    )
}

const mapStateToProps: MapStateToPropsType<BatteryManagerState, BatteryLevelProps> = ({ charging, chargingTime, dischargingTime, level }) => {
    const value = level * 100

    const buffer = charging ? normalize(chargingTime) : undefined
    const color = value <= 30 ? 'error' : value <= 50 ? 'warning' : 'success'

    const chargingTimeMessage = `${charging ? chargingTime : dischargingTime} seconds until ${charging ? 'fully charged' : 'empty'}`

    return { value, buffer, color, chargingTimeMessage }
}

const mapStateToPropsArray = [{ context: BatteryManagerStateContext, mapStateToProps }]

export default connect(mapStateToPropsArray)(BatteryLevel)