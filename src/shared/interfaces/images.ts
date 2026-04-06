export interface IUrls {
    original: string,
    desktop_webp?: string,
    mobile_webp?: string
}

export interface IImage {
    alt: string,
    title: string,
    image_id: number,
    svg: string,
    urls: IUrls,
}