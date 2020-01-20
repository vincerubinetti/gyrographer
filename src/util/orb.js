import { sin } from './math.js';
import { cos } from './math.js';
import { Vector } from './math.js';

export class Orb {
  constructor() {
    this.parent = null;
    this.children = [];

    this.cache = {};
  }

  computeProp(prop, time) {
    let value = this[prop];
    // if (prop === 'radius')
    //   value += sin((360 * time) / 100) * 50;
    if (prop === 'to')
      value = (100 * time) / 300;
    // if (prop === 'offset')
    //   value = (360 * time) / 300;

    return value;
  }

  computePoint(trace, time, radius, spin, offset) {
    radius = radius || this.computeProp('radius', time);
    spin = spin || this.computeProp('spin', time);
    offset = offset || this.computeProp('offset', time);

    const angle = (spin * 360 * trace) / 100 + offset;

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
    const radius = this.computeProp('radius', time);
    const spin = this.computeProp('spin', time);
    const offset = this.computeProp('offset', time);

    const stepSize = this.stepSize;

    const path = [];

    for (let trace = from; trace < to; trace += stepSize)
      path.push(this.computePoint(trace, time, radius, spin, offset));
    path.push(this.computePoint(to, time, radius, spin, offset));

    this.cache[time] = path;

    return path;
  }

  static buildTree(orbs) {
    const tree = [];

    const orbIds = Object.keys(orbs);
    for (const orbId of orbIds) {
      const leaf = new Orb();
      const orb = orbs[orbId];
      const props = Object.keys(orb);
      for (const prop of props)
        leaf[prop] = orb[prop];
      leaf.id = orbId;
      leaf.children = [];
      tree.push(leaf);
    }

    for (let index = 0; index < tree.length; index++) {
      for (let parentIndex = 0; parentIndex < tree.length; parentIndex++) {
        if (
          tree[index].id !== tree[parentIndex].id &&
          tree[parentIndex].id === tree[index].parentId
        ) {
          tree[index].parent = tree[parentIndex];
          tree[parentIndex].children.push(tree[index]);
        }
      }
    }

    return tree;
  }
}
