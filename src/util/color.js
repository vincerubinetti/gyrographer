import { toFixed } from './math';

const precision = 4;

export const toHex = ({ r = 255, g = 255, b = 255, a = 255 }) =>
  '#' +
  [r, g, b, a]
    .map((c) =>
      Math.round(c)
        .toString(16)
        .padStart(2, '0'))
    .join('');

export const rgbToHsl = ({ r, g, b }) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h;
  if (d === 0)
    h = 0;
  else if (max === r)
    h = 60 * ((g - b) / d) + 60 * 0;
  else if (max === g)
    h = 60 * ((b - r) / d) + 60 * 2;
  else if (max === b)
    h = 60 * ((r - g) / d) + 60 * 4;
  h = (360 + h) % 360;

  let l = (max + min) / 2;

  let s;
  if (d === 0)
    s = 0;
  else
    s = d / (1 - Math.abs(2 * l - 1));

  h = Math.round(h);
  s = toFixed(s, precision);
  l = toFixed(l, precision);

  return { h, s, l };
};

export const hslToRgb = ({ h, s, l }) => {
  h = h % 360;
  s = Math.min(1, Math.max(0, s));
  l = Math.min(1, Math.max(0, l));

  const c = s * (1 - Math.abs(2 * l - 1));
  const x = c * (1 - Math.abs(h / 60 % 2 - 1));
  const m = l - c / 2;

  let r;
  let g;
  let b;
  if (h < 60)
    [r, g, b] = [c, x, 0];
  else if (h < 120)
    [r, g, b] = [x, c, 0];
  else if (h < 180)
    [r, g, b] = [0, c, x];
  else if (h < 240)
    [r, g, b] = [0, x, c];
  else if (h < 300)
    [r, g, b] = [x, 0, c];
  else if (h < 360)
    [r, g, b] = [c, 0, x];

  r = Math.round(255 * (r + m));
  g = Math.round(255 * (g + m));
  b = Math.round(255 * (b + m));

  return { r, g, b };
};

const contrast = ({ r, g, b }) => {
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq > 128 ? '#ffffffff' : '#00000000';
};

export class Color {
  constructor(hex = '#ffffffff') {
    const [r = 255, g = 255, b = 255, a = 255] = (
      hex.match(/\w\w/g) || []
    ).map((c) => parseInt(c, 16));
    const { h, s, l } = rgbToHsl({ r, g, b });

    this.r = r;
    this.g = g;
    this.b = b;
    this.a = toFixed(a / 255, precision);
    this.h = h;
    this.s = s;
    this.l = l;
    this.rgb = toHex({ r, g, b });
    this.rgba = toHex({ r, g, b, a });
    this.hrgb = toHex(hslToRgb({ h, s: 1, l: 0.5 }));
    this.contrast = contrast({ r, g, b });
  }
}

window.Color = Color;
window.rgbToHsl = rgbToHsl;
window.hslToRgb = hslToRgb;
