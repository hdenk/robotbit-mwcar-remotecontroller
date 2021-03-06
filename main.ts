function accelerationSector (angle: number) {
    if (angle < -150 || angle > 150) {
        return 1
    } else if (angle > -30 && angle < 30) {
        return 2
    } else if (angle < -60 && angle > -120) {
        return 3
    } else if (angle > 60 && angle < 120) {
        return 4
    } else if (angle < -120 && angle > -150) {
        return 5
    } else if (angle < -30 && angle > -60) {
        return 6
    } else if (angle > 30 && angle < 60) {
        return 7
    } else if (angle > 120 && angle < 150) {
        return 8
    } else {
        return 0
    }
}
function calCButtonState () {
    if (input.buttonIsPressed(Button.AB)) {
        return 3
    } else if (input.buttonIsPressed(Button.A)) {
        return 1
    } else if (input.buttonIsPressed(Button.B)) {
        return 2
    } else {
        return 0
    }
}
function accelerationAmount (x: number, y: number) {
    return Math.trunc(Math.sqrt(x * x + y * y))
}
function calculateTransmitData (sector: number, amount: number, bState: number) {
    return bState * 65536 + (amount * 16 + sector)
}
function displayMovement (sector: number, bState: number) {
    if (bState == 1) {
        return images.createImage(`
            . . . . .
            . # # # .
            # # . # .
            . # # # .
            . . . . .
            `)
    } else if (bState == 2) {
        return images.createImage(`
            . . . . .
            . # # # .
            . # . # #
            . # # # .
            . . . . .
            `)
    }
    if (sector == 1) {
        return images.createImage(`
            . . . . .
            . . . . .
            . # . . .
            . . . . .
            . . . . .
            `)
    } else if (sector == 2) {
        return images.createImage(`
            . . . . .
            . . . . .
            . . . # .
            . . . . .
            . . . . .
            `)
    } else if (sector == 3) {
        return images.createImage(`
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            . . . . .
            `)
    } else if (sector == 4) {
        return images.createImage(`
            . . . . .
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            `)
    } else if (sector == 5) {
        return images.createImage(`
            . . . . .
            . # . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    } else if (sector == 6) {
        return images.createImage(`
            . . . . .
            . . . # .
            . . . . .
            . . . . .
            . . . . .
            `)
    } else if (sector == 7) {
        return images.createImage(`
            . . . . .
            . . . . .
            . . . . .
            . . . # .
            . . . . .
            `)
    } else if (sector == 8) {
        return images.createImage(`
            . . . . .
            . . . . .
            . . . . .
            . # . . .
            . . . . .
            `)
    } else {
        return images.createImage(`
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            # . . . #
            `)
    }
}
function accelerationAngle (x: number, y: number) {
    return Math.round(Math.atan2(y, x) * 180 / PI)
}
let accSector = 0
let accAngle = 0
let accAmount = 0
let accY = 0
let accX = 0
let buttonState = 0
let PI = 0
radio.setGroup(0)
radio.setTransmitPower(7)
PI = 3.14159265359
basic.forever(function () {
    buttonState = calCButtonState()
    accX = input.acceleration(Dimension.X)
    accY = input.acceleration(Dimension.Y)
    accAmount = accelerationAmount(accX, accY)
    accAngle = accelerationAngle(accX, accY)
    accSector = accelerationSector(accAngle)
    if (buttonState > 0 || accAmount > 256) {
        displayMovement(accSector, buttonState).showImage(0)
        radio.sendNumber(calculateTransmitData(accSector, accAmount, buttonState))
    } else {
        basic.showLeds(`
            . . . . .
            . . # . .
            . # # # .
            . . # . .
            . . . . .
            `)
        radio.sendNumber(0)
    }
})
