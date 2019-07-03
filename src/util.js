export function getContrastColor(hexColor) {
  const [r, g, b] = hexColor.match(/\w\w/g).map((c) => parseInt(c, 16));
  return (r * 299 + g * 587 + b * 114) / 1000 >= 128
    ? '#000000'
    : '#ffffff';
}
