const addOrUpdateURLParams = (key, value) => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set(key, value)
    const newRelativePathQuery = window.location.pathname + "?" + searchParams.toString()
    // eslint-disable-next-line no-restricted-globals
    history.pushState(null, "", newRelativePathQuery)
}

export default addOrUpdateURLParams
