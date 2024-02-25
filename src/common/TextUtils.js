export const formatToCurrency = (value) => {
    return value.toLocaleString('en-UK', {
        style: 'currency',
        currency: 'NZD',
    });
}

export const isTextNullOrEmpty = (text) => {
    return text === null || text === undefined || text === ""
}

export const textOrDefault = (text, defaultText) => {
    return isTextNullOrEmpty(text) ? defaultText : text
}

export const fromUpperCaseToDisplay = (text) => {
    if(isTextNullOrEmpty(text))
        return text

    return text.substr(0, 1).toUpperCase() + text.substr(1).toLowerCase()
}
