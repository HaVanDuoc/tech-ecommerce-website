const generateSequenceRandomInteger = (length) => {
    let number = ""
    const min = 0
    const max = 9

    for (let i = 0; i < length; i++) {
        const random = Math.floor(Math.random() * (max - min)) + min
        number = number + random
    }

    return Number(number)
}

module.exports = generateSequenceRandomInteger
