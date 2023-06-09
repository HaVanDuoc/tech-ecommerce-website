const calculatePayment = (price, quantity, discount) => {
    return Number((price - price * ((discount ? discount : 0) / 100)) * (quantity || 1))
}

module.exports = calculatePayment
