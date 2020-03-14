import YAML from 'yaml';

window.console.logSync = (...args) => {
  const lines = YAML.stringify(args)
    .split('\n')
    .filter((line) =>
      line.trim());
  for (const line of lines) {
    const index = line.indexOf(':');
    const key = line.substr(0, index);
    const value = line.substr(index + 1);
    console.log('%c' + key + '%c' + value, 'color: gray;', 'color: blue;');
  }
};
