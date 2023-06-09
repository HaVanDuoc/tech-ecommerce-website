const calculatePayment = (price, quantity, discount) => {
    return Number((price - price * ((discount ? discount : 0) / 100)) * (quantity || 1))
}

export default calculatePayment
