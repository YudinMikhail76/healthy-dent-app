export const getSocialIconComponent = (type) => {
    return {
        telegram: () => defineAsyncComponent(() => import('~/shared/assets/icons/telegram.svg')),
        viber: () => defineAsyncComponent(() => import('~/shared/assets/icons/viber.svg')),
        facebook: () => defineAsyncComponent(() => import('~/shared/assets/icons/facebook.svg')),
        instagram: () => defineAsyncComponent(() => import('~/shared/assets/icons/instagram.svg')),
        youtube: () => defineAsyncComponent(() => import('~/shared/assets/icons/youtube.svg'))
    }[type]()
}

export function toTelegramBotLink(nickName = '') {
    if (!nickName) return ''

    const cleanNickname = nickName.startsWith('@') ? nickName.slice(1) : nickName
    return `https://t.me/${ cleanNickname }?start=`
}