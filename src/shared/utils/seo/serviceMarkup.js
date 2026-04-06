export function returnServiceMarkup(serviceData) {
    const config = useRuntimeConfig()
    const image = serviceData.hero_block.image?.urls ? serviceData.hero_block.image?.urls?.original : serviceData.metatags?.og_image
    const url = config.public.SITE_URL + serviceData.metatags.og_url
    const description = serviceData.description || serviceData.name

    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: serviceData.name,
        description,
        image,
        sku: serviceData.tid,
        mpn: serviceData.tid,
        brand: {
            '@type': 'Brand',
            name: 'Healthydent',
            logo: serviceData.metatags.og_image,
            url
        },
        offers: {
            '@type': 'Offer',
            price: serviceData.price_range.min,
            lowPrice: serviceData.price_range.min,
            highPrice: serviceData.price_range.max,
            priceCurrency: 'UAH',
            offerCount: serviceData.price_range.offers_count,
            availability: 'https://schema.org/InStock',
            priceValidUntil: new Date().toISOString()
        },
        ...serviceData.reviews.reviews.length > 0 && {
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: serviceData.reviews.aggregateRating.avg,
                reviewCount: serviceData.reviews.aggregateRating.count
            },
            reviews: _getReviews(serviceData.reviews.reviews)
        }
    }
}

function _getReviews(reviews) {
    const config = useRuntimeConfig()

    return reviews.map((item) => ({
        '@type': 'Review',
        author: {
            '@type': 'Person',
            name: item.author,
            url: config.public.SITE_URL
        },
        datePublished: item.date,
        reviewBody: item.text,
        reviewRating: {
            '@type': 'Rating',
            bestRating: 5,
            ratingValue: item.rating,
            worstRating: 1
        }
    }))
}
