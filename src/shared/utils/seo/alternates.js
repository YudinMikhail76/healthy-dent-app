export function returnAlternates(metatags) {
    return metatags.alternate.map((el) => {
        return { ...el, rel: 'alternate' }
    })
}