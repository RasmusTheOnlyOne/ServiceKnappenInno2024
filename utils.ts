const units = [
  { label: "y", seconds: 31536000 },
  { label: "m", seconds: 2592000 },
  { label: "w", seconds: 604800 },
  { label: "d", seconds: 86400 },
  { label: "h", seconds: 3600 },
  { label: "m", seconds: 60 },
  { label: "s", seconds: 1 },
];

const calculateTimeDifference = (time: number) => {
  for (let { label, seconds } of units) {
    const interval = Math.floor(time / seconds);
    if (interval >= 1) {
      return {
        interval: interval,
        unit: label,
      };
    }
  }

  return false;
};

export const timeAgo = (date: string | number | Date) => {
  const time = Math.floor(
    (new Date().valueOf() - new Date(date).valueOf()) / 1000
  );
  const result = calculateTimeDifference(time);
  if (!result) return "Now";
  return `${result.interval}${result.unit} ago`;
};
