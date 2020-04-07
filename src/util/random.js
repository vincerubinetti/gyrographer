import { swatches } from '../components/color-picker';
import { random } from './math';

const colors = swatches.slice(1, swatches.length - 1);

const number = 10;
const ratio = 0.5;

export const generateRandomProject = () => {
  const orbs = {};

  const hasChild = (id) => Object.values(orbs).find((orb) => orb.parent === id);
  const withChild = () => Object.keys(orbs).filter((id) => hasChild(id));
  const withoutChild = () => Object.keys(orbs).filter((id) => !hasChild(id));

  for (let id = 0; id < number; id++) {
    let parent = null;
    if (Math.random() < ratio)
      parent = random([null, ...withChild()]);
    else
      parent = random([...withoutChild()]);

    orbs[id] = { parent };
  }

  for (const [id, orb] of Object.entries(orbs)) {
    orb.path = hasChild(id) ? false : true;
    orb.radius = -300 + Math.random() * 150;
    orb.spin = Math.round(-5 + Math.random() * 10);
    orb.offset = Math.random() * 360;
    orb.stroke = colors[Math.floor(Math.random() * colors.length)];
  }

  return { orbs };
};
