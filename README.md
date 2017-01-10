# color-stepper
A JavaScript library / Node.js tool for generating stepped color gradients.

color-stepper extracts a specified number od colors from a linear color gradient, which is defined by the main colors in the gradient.

## Example
When defining a gradient via three colors, i.e.
```
#FF0000 #00FF00 #0000FF
```
color-stepper generates a number colors from the linear gradient which is defined by these colors. The resulting colors contain the first and the last color of the gradient and have the same distance to each other.<br>
When creating 1 color, the result is
```
#00FF00
```
For 2 colors:
```
#FF0000 #0000F
```
For 4 colors:
```
#ff0000 #55aa00 #00aa55 #0000ff
```
and so on.

## Usage as command line tool
To use color-stepper as a command line tool you need Node.js and npm installed. Install color-stepper by opening a terminal and running
```sh
npm install -g color-stepper
```

You can then run
```
color-steps [<COLOR>...] <STEPS>
```
to create the colors.

For the example above with 5 generated colors, the command would be
```
color-steps ff0000 00ff00 0000ff 5
```

## Usage as library
You can use color-stepper as a JavaScript library for generating colors dynamically in your application. To do so, install it via
```
npm install -S color-stepper
```

You can then import it in your sources via
```javascript
const cs = require('color-stepper');
```
and generate the colors by using
```javascript
const colors = cs.generateSteps([<COLOR>...], <steps>])
```
The function returns the resulting colors as array of hex-strings.

For the example above, the corresponding call would be
```javascript
const colors = cs.generateSteps(["ff0000", "00ff00", "0000ff"], 5);

// colors: [ '#ff0000', '#808000', '#00ff00', '#008080', '#0000ff' ]
```
