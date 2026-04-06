export function waitForBinotelAndReplacePhones(timeout = 5000, interval = 100) {
    const startTime = Date.now()

    const check = () => {
        if (typeof window.BinotelCallTracking !== 'undefined') {
            Object.values(window.BinotelCallTracking).forEach((widget) => {
                if (typeof widget?.replacePhoneNumbersOnDynamicContent === 'function') {
                    widget.replacePhoneNumbersOnDynamicContent()
                }
            })
        // Якщо бінотел скрипт не підгрузився, перевіряємо кожних 100мс
        // допоки він не буде готовим до використання, максимум очікуємо 5 секунд
        } else if (Date.now() - startTime < timeout) {
            setTimeout(check, interval)
        } else {
            console.warn('BinotelCallTracking not found within timeout')
        }
    }

    check()
}