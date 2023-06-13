exports.getOffset = (page, limit) => {
    return (limit || 10) * ((page || 1) - 1)
}

exports.calculatePayment = (price, quantity, discount) => {
    return Number((price - price * ((discount ? discount : 0) / 100)) * (quantity || 1))
}
