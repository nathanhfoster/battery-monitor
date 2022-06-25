import { FC } from 'react';
import { BatteryManagerStateContext } from '../../../context/BatteryManager/Provider';
import { BatteryManager } from '../../../context/BatteryManager/types';
import connect from '../../../context/connect';
import { MapStateToPropsType } from '../../../context/types';
import LinearProgress, {
  LinearProgressProps
} from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import useRandomBuffer from '../../../hooks/useRandomBuffer';
import { secondsToHms, toFixedNumber } from '../../../utils';

interface BatteryLevelProps {
  value: number;
  initialBuffer?: number;
  color: LinearProgressProps['color'];
  chargingTimeMessage: string;
}

const BatteryLevel: FC<BatteryLevelProps> = ({
  value,
  initialBuffer,
  color,
  chargingTimeMessage
}) => {
  const [buffer] = useRandomBuffer({ value, initialBuffer });

  return (
    <>
      <Box display='flex' justifyContent='center'>
        <Typography variant='h3'>{value}%</Typography>
      </Box>
      <LinearProgress
        variant={buffer ? 'buffer' : 'determinate'}
        value={value}
        valueBuffer={buffer}
        color={color}
        sx={{ height: 50, borderRadius: 2 }}
      />
      <Box display='flex' justifyContent='center'>
        <Typography variant='subtitle1'>{chargingTimeMessage}</Typography>
      </Box>
    </>
  );
};

const mapStateToProps: MapStateToPropsType<
  BatteryManager,
  BatteryLevelProps
> = ({ charging, chargingTime, dischargingTime, level }) => {
  const value = toFixedNumber(level * 100, 1);
  const initialBuffer = charging ? chargingTime : undefined;
  const color = value <= 30 ? 'error' : value <= 50 ? 'warning' : 'success';

  const chargingTimeMessage = `${secondsToHms(
    charging ? chargingTime : dischargingTime
  )} until ${charging ? 'fully charged' : 'empty'}`;

  return { value, initialBuffer, color, chargingTimeMessage };
};

const mapStateToPropsArray = [
  { context: BatteryManagerStateContext, mapStateToProps }
];

export default connect(mapStateToPropsArray)(BatteryLevel);
