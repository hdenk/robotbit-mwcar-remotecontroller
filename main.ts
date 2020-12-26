function accelerationAmount (x: number, y: number) {
    return Math.trunc(Math.sqrt(x * x + y * y))
}
function accelerationAngle (x: number, y: number) {
    return Math.round(Math.atan2(y, x) * 180 / PI)
}
let accAngle = 0
let accAmount = 0
let accY = 0
let accX = 0
let PI = 0
radio.setGroup(0)
radio.setTransmitPower(7)
PI = 3.14159265359
basic.showLeds(`
    . . . . .
    . . # . .
    . # # # .
    . . # . .
    . . . . .
    `)
basic.forever(function () {
    accX = input.acceleration(Dimension.X)
    accY = input.acceleration(Dimension.Y)
    accAmount = accelerationAmount(accX, accY)
    accAngle = accelerationAngle(accX, accY)
    basic.showString("" + (accAngle))
    if (accX < -256) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . # . . .
            . . . . .
            . . . . .
            `)
        radio.sendNumber(1)
    } else if (accX > 256) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . # .
            . . . . .
            . . . . .
            `)
        radio.sendNumber(2)
    } else if (accY < -256) {
        basic.showLeds(`
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            . . . . .
            `)
        radio.sendNumber(3)
    } else if (accY > 256) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            `)
        radio.sendNumber(4)
    } else {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . # . .
            . # . # .
            . . . . .
            `)
        radio.sendNumber(0)
    }
})
