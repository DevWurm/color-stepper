import color from 'onecolor';

/**
 * Generates a number of colors between the provided colors, by generating equally distributed colors between them
 * @param colorStrings {string[]} base colors as strings in every common color format
 * @param steps {number} number of resulting colors
 * @return {[string]} resulting colors as hex values
 */
export function generateSteps(colorStrings, steps) {
  const colors = colorStrings.map(str => color(str));

  if (colors.length <= 1 || colors.length >= steps) {
    return colors.map(color => color.hex());
  } else {
    // divide number of needed steps by the number of gaps
    const stepsPerGap = Math.floor((steps - colors.length) / (colors.length - 1));

    const colorGaps = colors
      .map((_, ind) => {
        if (ind == colors.length - 1) {
          // ignore the last element, because there is no more gap after last element
          return null;
        }

        return {
          color1: colors[ind],
          color2: colors[ind + 1]
        }
      })
      // remove last element, because its not a gap
      .slice(0, -1);

    const filledColorGaps = colorGaps.map(gap => calculateSteps(gap, stepsPerGap));

    // flatten array
    const resultColors = [].concat.apply([], filledColorGaps)
      // remove consecutive duplicates (end of the one gap is the beginning of the next gap)
      .reduce((acc, curr) => (acc.length > 0 && acc[acc.length - 1].hex() == curr.hex()) ? acc : acc.concat([curr]), []);

    return resultColors.map(color => color.hex());
  }
}

function calculateSteps({color1, color2}, steps) {
  const redStepWidth = (color2.red() - color1.red()) / (steps + 1);
  const greenStepWidth = (color2.green() - color1.green()) / (steps + 1);
  const blueStepWidth = (color2.blue() - color1.blue()) / (steps + 1);

  const colors = [];
  for (let i = 0; i < steps; i++) {
   colors[i] = color('#000000')
     .red(color1.red() + (redStepWidth * (i + 1)))
     .green(color1.green() + (greenStepWidth * (i + 1)))
     .blue(color1.blue() + (blueStepWidth * (i + 1)));
  }

  return [
    color1,
    ...colors,
    color2
  ];
}