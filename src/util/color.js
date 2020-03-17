import { isString } from './types';
import { isNumber } from './types';
import { isObject } from './types';
import { toFixed } from './math';

const precision = 4;

const toHex = ({ r = 255, g = 255, b = 255, a = 1 }) =>
  '#' +
  [r, g, b, a * 255]
    .map((c) =>
      Math.round(c)
        .toString(16)
        .padStart(2, '0'))
    .join('');

const rgbToHsv = ({ r, g, b }) => {
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
    h = 60 * ((g - b) / d % 6);
  else if (max === g)
    h = 60 * ((b - r) / d + 2);
  else if (max === b)
    h = 60 * ((r - g) / d + 4);

  let s;
  if (d === 0)
    s = 0;
  else
    s = d / max;

  const v = max;

  return { h, s, v };
};

const hsvToRgb = ({ h, s, v }) => {
  h = h % 360;

  const c = v * s;
  const x = c * (1 - Math.abs(h / 60 % 2 - 1));
  const m = v - c;

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
  constructor(color) {
    if (isString(color))
      this.fromString(color);
    if (isObject(color))
      this.fromObject(color);

    if (this.hasRgb())
      this.setHsv();
    else if (this.hasHsv())
      this.setRgb();

    this.cleanAll();
    this.setStrings();
  }

  fromString(color = '#ffffffff') {
    const [r, g, b, a] = (color.match(/\w\w/g) || []).map((c) => parseInt(c, 16));
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = toFixed(a / 255, precision);
  }

  fromObject(color = {}) {
    for (const [key, value] of Object.entries(color))
      this[key] = value;
  }

  hasRgb() {
    return this.r !== undefined && this.g !== undefined && this.b !== undefined;
  }

  hasHsv() {
    return this.h !== undefined && this.s !== undefined && this.v !== undefined;
  }

  setRgb() {
    const { r, g, b } = hsvToRgb({ h: this.h, s: this.s, v: this.v });
    if (this.r === undefined)
      this.r = r;
    if (this.g === undefined)
      this.g = g;
    if (this.b === undefined)
      this.b = b;
  }

  setHsv() {
    const { h, s, v } = rgbToHsv({ r: this.r, g: this.g, b: this.b });
    if (this.h === undefined)
      this.h = h;
    if (this.s === undefined)
      this.s = s;
    if (this.v === undefined)
      this.v = v;
  }

  setStrings() {
    this.rgb = toHex({ r: this.r, g: this.g, b: this.b });
    this.rgba = toHex({ r: this.r, g: this.g, b: this.b, a: this.a });
    this.hrgb = toHex(hsvToRgb({ h: this.h, s: 1, v: 1 }));
    this.contrast = contrast({ r: this.r, g: this.g, b: this.b });
  }

  cleanAll() {
    this.cleanKey('r', 255);
    this.cleanKey('g', 255);
    this.cleanKey('b', 255);
    this.cleanKey('h', 360);
    this.cleanKey('s', 1);
    this.cleanKey('v', 1);
    this.cleanKey('a', 1);
  }

  cleanKey(key, max) {
    if (!isNumber(this[key]))
      this[key] = max;
    else {
      if (this[key] < 0)
        this[key] = 0;
      if (this[key] > max)
        this[key] = max;
    }
  }
}
