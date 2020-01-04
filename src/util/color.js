const str = (...args) =>
  args.map((c) => c.toString(16).padStart(2, '0')).join('');

export class Color {
  constructor(hex = '#ffffffff') {
    const [r, g, b, a] = hex.match(/\w\w/g).map((c) => parseInt(c, 16));

    this.r = r || 255;
    this.g = g || 255;
    this.b = b || 255;
    this.a = (a || 255) / 255;

    this.rgb = '#' + str(this.r, this.g, this.b);
    this.rgba = '#' + str(this.r, this.g, this.b, this.a * 255);
  }
}
