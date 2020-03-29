import { swatches } from '../components/color-picker';

const colors = swatches.slice(1, 17);

const complexity = 5;

export const generateRandomProject = () => {
  const project = {};

  project.orbs = {};
  for (let i = 0; i < complexity; i++) {
    project.orbs[i] = {
      parent: String(Math.floor(Math.random() * complexity)),
      path: Math.random() < 0.5,
      radius: -400 + Math.random() * 200,
      spin: -5 + Math.random() * 10,
      offset: Math.random() * 360,
      stroke: colors[Math.floor(Math.random() * colors.length)]
    };
  }

  return project;
};
