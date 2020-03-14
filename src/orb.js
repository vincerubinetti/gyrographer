import { sin } from './util/math';
import { cos } from './util/math';
import { Vector } from './util/math';

export class Orb {
  constructor() {
    this.cache = {};
  }

  computeProp(prop, time) {
    let value = this[prop];
    // if (prop === 'radius')
    //   value += sin((360 * time) / 100) * 50;
    if (prop === 'to')
      value = time * (360 / 300);
    // if (prop === 'offset')
    //   value = (360 * time) / 300;

    return value;
  }

  computePoint(trace, time, radius, spin, offset) {
    radius = radius || this.computeProp('radius', time);
    spin = spin || this.computeProp('spin', time);
    offset = offset || this.computeProp('offset', time);

    const angle = spin * trace + offset;

    let parentPoint = { x: 0, y: 0 };
    if (this.parent)
      parentPoint = this.parent.computePoint(trace, time);

    const point = new Vector(
      parentPoint.x + cos(angle) * radius,
      parentPoint.y - sin(angle) * radius
    );

    return point;
  }

  computePath(time) {
    if (this.cache[time])
      return this.cache[time];

    const from = this.computeProp('from', time);
    const to = this.computeProp('to', time);
    const step = this.step;
    const radius = this.computeProp('radius', time);
    const spin = this.computeProp('spin', time);
    const offset = this.computeProp('offset', time);

    const path = [];

    if (from < to) {
      for (let trace = from; trace < to; trace += step)
        path.push(this.computePoint(trace, time, radius, spin, offset));
    }
    if (from > to) {
      for (let trace = from; trace > to; trace -= step)
        path.push(this.computePoint(trace, time, radius, spin, offset));
    }
    path.push(this.computePoint(to, time, radius, spin, offset));

    this.cache[time] = path;

    return path;
  }

  static buildTree(orbs) {
    const tree = [];

    for (const [id, orb] of Object.entries(orbs)) {
      const leaf = new Orb();
      leaf.id = id;
      for (const prop of Object.keys(orb))
        leaf[prop] = orb[prop];
      tree.push(leaf);
    }

    for (const leaf of tree) {
      leaf.parent = tree.find((parent) =>
        parent.id === leaf.parent);
    }

    return tree;
  }
}
