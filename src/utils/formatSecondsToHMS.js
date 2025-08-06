export default function formatSecondsToHMS(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const pad = (n) => n.toString()

  return `${pad(h)}小时 ${pad(m)}分钟`;
}