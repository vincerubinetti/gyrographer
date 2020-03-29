export const sin = (degrees) => Math.sin((2 * Math.PI * degrees) / 360);

export const cos = (degrees) => Math.cos((2 * Math.PI * degrees) / 360);

export const sign = (value) => {
  if (value > 0)
    return 1;
  else if (value < 0)
    return -1;
  else
    return 0;
};

export const toFixed = (value, precision) => Number(value.toFixed(precision));

export const avg = (array) =>
  array.reduce((total, current) => total + current, 0) / array.length;

export class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  subtract(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  normalize() {
    const length = this.length();
    return new Vector(this.x / length, this.y / length);
  }

  scale(length) {
    return new Vector(this.x * length, this.y * length);
  }

  rotate(angle) {
    return new Vector(
      this.x * cos(angle) - this.y * sin(angle),
      this.x * sin(angle) + this.y * cos(angle)
    );
  }
}
