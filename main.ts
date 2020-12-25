let accY = 0
let accX = 0
radio.setGroup(0)
radio.setTransmitPower(7)
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
