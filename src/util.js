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

export function sign(value) {
  if (value > 0)
    return 1;
  else if (value < 0)
    return -1;
  else
    return 0;
}

export class Point {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
}

export function vLength(pointA, pointB) {
  if (point2) {
    return Math.sqrt(
      Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2)
    );
  } else
    return Math.sqrt(Math.pow(pointA.x, 2) + Math.pow(pointA.y, 2));
}

export function vCircle(angle, radius, cx, cy) {
  return new Point(
    (cx || 0) + cos(angle) * radius,
    (cy || 0) - sin(angle) * radius
  );
}
