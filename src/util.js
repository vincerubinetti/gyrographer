export function getContrastColor(hexColor) {
  const [r, g, b] = hexColor.match(/\w\w/g).map((c) => parseInt(c, 16));
  return (r * 299 + g * 587 + b * 114) / 1000 >= 128 ? '#000000' : '#ffffff';
}

export function sin(degrees) {
  return Math.sin((2 * Math.PI * degrees) / 360);
}

export function cos(degrees) {
  return Math.cos((2 * Math.PI * degrees) / 360);
}
