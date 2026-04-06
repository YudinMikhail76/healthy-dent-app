export function returnDoctorMarkup(doctorData) {
    const dateModified = new Date(doctorData.changed * 1000).toISOString()
    const dateCreated = new Date(doctorData.created * 1000).toISOString()
    const name = doctorData.title
    const description = doctorData.hero_block.teaser_text
    const image = doctorData.hero_block.photo.urls?.original

    return {
        '@context': 'http://schema.org',
        '@type': 'ProfilePage',
        dateModified,
        dateCreated,
        mainEntity: {
            '@type': 'Person',
            name,
            description,
            image
        }
    }
}