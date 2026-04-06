export function returnOrganizationalMarkup({
    staticData,
    metatags,
    legalName,
    alternateName
}) {
    const runtimeConfig = useRuntimeConfig()
    const phone = staticData.phones?.values[0] || '0674436490'
    const { mail } = staticData.address?.values[0]
    const address = staticData.address?.values[0]
    const rating = staticData?.aggregateRating
    const openingHours = staticData.seoTimetable
    const socials = staticData.socials?.values || []

    return {
        '@context': 'http://schema.org',
        '@type': 'Organization',
        image: metatags.og_image,
        url: runtimeConfig.public.SITE_URL,
        department: {
            '@type': 'MedicalOrganization',
            name: 'Healthy Dent',
            department: {
                '@type': 'Dentist',
                name: 'Healthy Dent',
                aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: Number(rating?.avg)?.toFixed(2) || '',
                    reviewCount: rating.count || ''
                },
                logo: metatags.og_image,
                legalName,
                alternateName,
                telephone: phone,
                email: mail || 'clinic_dent@ukr.net',
                sameAs: socials.map(({ url }) => url),
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: address.value,
                    addressLocality: address.city,
                    addressRegion: address.region,
                    postalCode: address.postal_code,
                    addressCountry: 'UA'
                },
                geo: {
                    '@type': 'GeoCoordinates',
                    latitude: address?.map_lat || '',
                    longitude: address?.map_lng || ''
                },
                openingHours,
            }
        }
    }
}
