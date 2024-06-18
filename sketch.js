/* eslint-disable no-undef, no-unused-vars */
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
  angleMode(DEGREES)
}

const sides = 1
const gap = 5
const ringCount = 100
const waveDepth = 100
const waveSpeedFactor = 2
const waveCount = 2
const weight = 2

const greenRange = 10
const greenRing = true

const rotationSpeedQuotient = 1000  // Smaller number means faster.
const initialRotationOffset = 10

const rotateOn = true
const cameraAngleOn = true
const cameraAngle = 90


function draw() {
  background(20)

  if (cameraAngleOn)   {
    rotateX(cameraAngle)
  }


  noFill()
  stroke(255)
  strokeWeight(weight)

  for (var ring = 0; ring < ringCount; ring++) {
    var r = map(sin(frameCount / 10), -1, 1, 0, 255)
    if (greenRing && ring < (greenRange / 2)) {
      var g = map(ring, 0, greenRange / 2, 0, 255)
    } else if (greenRing) {
      var g = map(ring, greenRange / 2, greenRange, 255, 0)
    } else {
      var g = map(ring, 0, greenRange, 255, 0)
    }
    var b = map(cos(frameCount / 10), -1, 1, 200, 100)

    stroke(r, g, b)
    if (rotateOn) {
      rotate(frameCount / rotationSpeedQuotient + initialRotationOffset)
    }

    var angle;
    if (sides < 2) {
      angle = 360 / (sides + 1)
    } else {
      angle = 360 / (sides)
    }
    
    var rad = ring * gap
    
    beginShape()
    for (var j = 0; j <= 360; j += angle) {
      var x = rad * cos(j)
      var y = rad * sin(j)
      var z = sin(frameCount * waveSpeedFactor + ring * waveCount * 2) * waveDepth

      vertex(x, y, z)
    }

    endShape(CLOSE)
  }

}
function keyPressed() {
  if (key === "s") {
    saveGif("animation.gif", 10, { delay: 5 })
  }
}