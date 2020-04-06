import { sin } from '../util/math';
import { cos } from '../util/math';

const precision = 2;

export class Orb {
  constructor(props) {
    for (const [key, value] of Object.entries(props))
      this[key] = value;
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

    if (this.parent) {
      const parentPoint = this.parent.computePoint(trace, time);
      return {
        x: parentPoint.x + cos(angle) * radius,
        y: parentPoint.y - sin(angle) * radius
      };
    } else {
      return {
        x: cos(angle) * radius,
        y: -sin(angle) * radius
      };
    }
  }

  computePath(time) {
    const from = this.computeProp('from', time);
    const to = this.computeProp('to', time);
    const step = this.computeProp('step', time);
    const radius = this.computeProp('radius', time);
    const spin = this.computeProp('spin', time);
    const offset = this.computeProp('offset', time);
    const close = this.computeProp('close', time);

    let d = '';
    let point;
    if (from < to) {
      for (let trace = from; trace < to; trace += step) {
        point = this.computePoint(trace, time, radius, spin, offset);
        d +=
          (d.length ? 'L' : 'M') +
          point.x.toFixed(precision) +
          ',' +
          point.y.toFixed(precision);
      }
    }
    if (from > to) {
      for (let trace = from; trace > to; trace -= step) {
        point = this.computePoint(trace, time, radius, spin, offset);
        d +=
          (d.length ? 'L' : 'M') +
          point.x.toFixed(precision) +
          ',' +
          point.y.toFixed(precision);
      }
    }
    point = this.computePoint(to, time, radius, spin, offset);
    d +=
      (d.length ? 'L' : 'M') +
      point.x.toFixed(precision) +
      ',' +
      point.y.toFixed(precision);

    if (close)
      d += 'z';

    return d;
  }
}

export const buildTree = (orbs) => {
  const tree = [];

  for (let [id, orb] of Object.entries(orbs)) {
    orb = { ...orb };
    orb.id = id;
    orb.depth = 0;
    tree.push(new Orb({ ...orb }));
  }

  for (const leaf of tree)
    leaf.parent = tree.find((parent) => parent.id === leaf.parent);

  const traverse = (leaf, depth = 0) =>
    leaf.parent ? traverse(leaf.parent, depth + 1) : depth;

  for (const leaf of tree)
    leaf.depth = traverse(leaf);

  tree.sort((a, b) => {
    if (a.order > b.order)
      return -1;
    if (a.order < b.order)
      return 1;

    if (a.depth < b.depth)
      return -1;
    if (a.depth > b.depth)
      return 1;

    return 0;
  });

  return tree;
};
