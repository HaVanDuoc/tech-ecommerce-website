export const calculatePayment = (price, quantity, discount) => {
    return Number((price - price * ((discount ? discount : 0) / 100)) * (quantity || 1))
}

export const setPositionWindow = (scrollX, scrollY) => {
    return window.scrollTo(scrollX, scrollY)
}
