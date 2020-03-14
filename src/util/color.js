const str = (...args) =>
  args.map((c) =>
    c.toString(16).padStart(2, '0')).join('');

const contrast = ({ r, g, b }) => {
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq > 128 ? '#ffffffff' : '#00000000';
};

export class Color {
  constructor(hex = '#ffffffff') {
    const [r = 255, g = 255, b = 255, a = 255] = (
      hex.match(/\w\w/g) || []
    ).map((c) =>
      parseInt(c, 16));

    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a / 255;

    this.rgb = '#' + str(this.r, this.g, this.b);
    this.rgba = '#' + str(this.r, this.g, this.b, this.a * 255);
    this.contrast = contrast(this);
  }
}
