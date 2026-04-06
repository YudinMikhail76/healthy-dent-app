export function debounce(func, timeout = 300) {
    let timer = null

    return (...args) => {
        clearTimeout(timer)

        timer = setTimeout(() => func.apply(this, args), timeout)
    }
}

export function getDeclination(count, arr) {
    if (count === 1 || count % 10 === 1 && count !== 11) return arr[0]
    else if (count >= 2 && count < 5 || count % 10 < 5 && count % 10 !== 1 && count % 10 !== 0 && count > 20) return arr[1]
    else if (count >= 5 && count <= 10 || count % 10 >= 5 || count % 10 === 0 || count === 11 || count % 10 >= 2 && count < 20) return arr[2]
}

export function getCurrentLocale(locale) {
    return locale === 'uk' ? '' : `/${ locale }`
}

export function getNumberWithPrefixZero(number) {
    return number < 10 ? `0${ number }` : number
}

export function getLimitedList(list, limit) {
    return list.slice(0, limit)
}

export function calculateRatingValueToMark(sum, count) {
    if (!count || !sum) return 0

    const result = sum / count / 20
    const isDecimal = result % 1 !== 0

    return isDecimal ? +result.toFixed(1) : result
}

export function formatPhoneNumber(phoneNumber) {
    // Видаляємо все, крім цифр
    const cleaned = phoneNumber.replace(/\D/g, '')
    
    if (!/^380\d{9}$/.test(cleaned)) {
        console.warn('Неправильний формат номера. Очікується: +380XXXXXXXXX')
        return cleaned
    }

    return cleaned.replace(/^(380)(\d{2})(\d{3})(\d{2})(\d{2})$/, '+$1 $2 $3 $4 $5')
}

export function removeSpaces(str) {
    return str?.replace(/\s+/g, '')
}

export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function groupItemsBy(items, key) {
    return items.reduce((groups, item) => {
        const groupValue = item[key]
        if (!groups[groupValue]) {
            groups[groupValue] = []
        }
        groups[groupValue].push(item)
        return groups
    }, {})
}

export function capitalize(string) {
    const firstLetter = string.charAt(0).toUpperCase()
    const slicedString = string.slice(1)

    return `${ firstLetter }${ slicedString }`
}

export const formatPrice = (price) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export function isEmptyImageUrls(urls) {
    if (Array.isArray(urls)) {
        return urls.length === 0
    }

    if (typeof urls === 'object' && urls !== null) {
        return Object.keys(urls).length === 0
    }

    return false
}

export function filterResponse(response, excludedKeys = []) {
    if (!response || typeof response !== 'object') return response

    return Object.keys(response).reduce((acc, key) => {
        if (!excludedKeys.includes(key)) {
            acc[key] = response[key]
        }
        return acc
    }, {})
}

export function isNonEmptyObject(value) {
    return typeof value === 'object' && 
           value !== null && 
           !Array.isArray(value) && 
           Object.keys(value).length > 0
}

export function isArrayWithItems(value) {
    return Array.isArray(value) && value.length > 0
}