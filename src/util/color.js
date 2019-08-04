export class Color {
  constructor(hex = '#ffffffff') {
    const [r, g, b, a] = hex.match(/\w\w/g).map((c) => parseInt(c, 16));

    this.r = r || 255;
    this.g = g || 255;
    this.b = b || 255;
    this.a = (a || 255) / 255;
  }
  contrast() {
    return (this.r * 299 + this.g * 587 + this.b * 114) / 1000 >= 128
      ? new Color('#000000ff')
      : new Color('#ffffffff');
  }
  hex(noAlpha) {
    return (
      '#' +
      this.r.toString(16).padStart(2, '0') +
      this.g.toString(16).padStart(2, '0') +
      this.b.toString(16).padStart(2, '0') +
      (noAlpha ? '' : (this.a * 255).toString(16).padStart(2, '0'))
    );
  }
  rgba() {
    return (
      'rgba(' +
      [
        this.r.toFixed(0),
        this.g.toFixed(0),
        this.b.toFixed(0),
        this.a.toFixed(2)
      ].join(',') +
      ')'
    );
  }
}
