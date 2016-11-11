import color from 'onecolor';

/**
 * Generates a number of colors between the provided colors, by generating equally distributed colors between them
 * @param colorStrings {string[]} base colors as strings in every common color format
 * @param steps {number} number of resulting colors
 * @return {[string]} resulting colors as hex values
 */
export function generateSteps(colorStrings, steps) {
  const colors = colorStrings.map(str => color(str));

  if (colors.length <= 1) {
    return colors.map(color => color.hex());
  } else if (steps <= 1) {
    return [colors[Math.floor(colors.length / 2)].hex()]
  } else {
    // generate the step width on the linear gradient
    // of the provided colors (reduced by 1 because the gradient and the steps are 0-based)
    const stepWidth = (colors.length - 1) / (steps - 1);

    let result = [];
    for (let i = 0; i <= steps - 1; i++) {
      result = result.concat([getGradientValue(colors, i * stepWidth)]);
    }

    return result.map(color => color.hex());
  }
}

/**
 * Simulates a linear gradient from the colors in 'colors' over the argument 'arg'
 */
function getGradientValue(colors, arg) {
  if (Math.floor(arg) >= colors.length - 1) {
    return colors.slice(-1)[0];
  }

  const startColor = colors[Math.floor(arg)];
  const endColor = colors[Math.floor(arg) + 1];
  const relativeArg = arg - Math.floor(arg);

  return color('#000000')
    .red(startColor.red() + ((endColor.red() - startColor.red()) * relativeArg))
    .green(startColor.green() + ((endColor.green() - startColor.green()) * relativeArg))
    .blue(startColor.blue() + ((endColor.blue() - startColor.blue()) * relativeArg));
}
