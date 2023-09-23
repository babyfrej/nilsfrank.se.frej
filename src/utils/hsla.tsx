export function hsla(
  {
    saturation,
    lightness,
    alpha,
  }: {
    saturation: number;
    lightness: number;
    alpha: number;
  },
  amount: number,
) {
  return Array.from({ length: amount }, (_, i) => {
    const hue = Math.trunc((360 / amount) * i);
    return `hsla(${hue},${saturation}%,${lightness}%,${alpha})`;
  });
}
