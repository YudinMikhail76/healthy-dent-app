export function generateMetaUsers(metatags) {
    const items = [
        { name: 'publisher', content: metatags.publisher }
    ]

    if (metatags.reviewer) {
        items.push({ name: 'reviewer', content: metatags.reviewer })
    }
    if (metatags.author) {
        items.push({ name: 'author', content: metatags.author })
    }

    return items
}