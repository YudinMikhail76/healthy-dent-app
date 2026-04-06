export function getQueries(route, disabledKeys = []) {
    let queryParams = ''

    for (let [key, value] of Object.entries(route.query)) {
        // Виключаємо ті ключі, які нам не потрібні
        if (disabledKeys.includes(key)) continue

        // Якщо буде щось типу &lol=1&cheburek&kek, то я на вихід ми повинні віддати таку саму стінгу
        // А не &lol=1&cheburek=null&kek=null
        if (!value) {
            const startQueryString = `?${ key }`
            const continueQueryString = `&${ key }`

            queryParams += !queryParams ? startQueryString : continueQueryString
        } else {
            // Нормальний варіант коли немає ні виключених ключів, ні гібридних квері параметрів
            const startQueryString = `?${ key }=${ value }`
            const continueQueryString = `&${ key }=${ value }`

            queryParams += !queryParams ? startQueryString : continueQueryString
        }
    }

    // Повертаємо у двох форматах для того щоб юзати при різних обставинах
    const queryParamsWithoutQuestionMark = queryParams.replace('?', '&')

    return { queryParams, queryParamsWithoutQuestionMark }
}
