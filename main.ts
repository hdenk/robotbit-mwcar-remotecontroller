let x = 0
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
    x = input.acceleration(Dimension.X)
    if (input.buttonIsPressed(Button.A)) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . # . . .
            . . . . .
            . . . . .
            `)
        radio.sendNumber(1)
    } else if (input.buttonIsPressed(Button.B)) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . # .
            . . . . .
            . . . . .
            `)
        radio.sendNumber(2)
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
