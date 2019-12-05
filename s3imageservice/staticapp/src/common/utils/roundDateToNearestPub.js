import { closestTo, startOfToday, startOfTomorrow, startOfYesterday, setHours } from 'date-fns';
import PUB_TIMES from 'Common/constants/pubTimes';

export default dt => {
  const yesterday = [];
  const today = [];
  const tomorrow = [];

  for (const time of PUB_TIMES) {
    const yest = setHours(startOfYesterday(), time);
    const toda = setHours(startOfToday(), time);
    const tomo = setHours(startOfTomorrow(), time);

    yesterday.push(yest);
    today.push(toda);
    tomorrow.push(tomo);
  }

  const allTimes = [...yesterday, ...today, ...tomorrow];

  return closestTo(dt, allTimes).toISOString();
};
