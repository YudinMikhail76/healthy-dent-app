import { isNonEmptyObject } from '~/shared/utils/helpers'

export function returnBlogPostMarkup(blogPostData, path) {
    const config = useRuntimeConfig()
    const dateModified = new Date(blogPostData.changed * 1000).toISOString()
    const datePublished = new Date(blogPostData.created * 1000).toISOString()
    const authorName = blogPostData?.author?.name || 'Healthydent'
    const headline = blogPostData.metatags.head_title
    const image = blogPostData.image?.urls?.original
    const description = blogPostData.subtitle || blogPostData.metatags.description

    let reviewer = null

    if (isNonEmptyObject(blogPostData.reviewer)) {
        reviewer = {
            '@type': 'Person',
            name: blogPostData?.reviewer?.doctor.label || 'Medical expert',
            jobTitle: blogPostData?.reviewer?.position,
            url: config.public.SITE_URL + blogPostData?.reviewer?.doctor?.url
        }
    }

    return {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': config.public.SITE_URL + path,
            ...(reviewer ? { reviewedBy: reviewer } : {})
        },
        author: {
            '@type': 'Person',
            name: authorName,
            url: config.public.SITE_URL
        },
        publisher: {
            '@type': 'Organization',
            name: 'Healthy Dent',
            logo: {
                '@type': 'ImageObject',
                url: config.public.SITE_URL + '/logo.png'
            }
        },
        dateModified,
        datePublished,
        headline,
        description,
        image,
    }
}