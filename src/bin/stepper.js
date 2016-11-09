import { generateSteps } from '../lib';
import color from 'onecolor';
import printf from 'printf';

const colorsHex = generateSteps(process.argv.slice(2,-1), process.argv.slice(-1)[0]);

const output = [
  '| STEP |   HEX   |        CMYK        |      RGB      |',
  '|------+---------+--------------------+---------------|'
].concat(colorsHex.map((hexColor, i) => {
  const c = color(hexColor);

  return `|${printf(' % 4d ', i)}` +
  `| ${hexColor} ` +
  `|${printf(" %03d; %03d; %03d; %03d ", c.cyan() * 255, c.magenta() * 255, c.yellow() * 255, c.black() * 255)}` +
  `|${printf(" %03d; %03d; %03d ", c.red() * 255, c.green() * 255, c.blue() * 255)}|`;
}));

output.forEach(line => console.log(line));
