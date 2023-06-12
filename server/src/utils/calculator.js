exports.getOffset = (page, limit) => {
    return (limit || 10) * ((page || 1) - 1)
}
