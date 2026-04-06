export const scrollController = {
    settings: {
        scrollPosition: 0,
        offset: 0
    },

    disable() {
        if (this.settings.scrollPosition) return

        this.settings.scrollPosition = window.scrollY
        this.settings.offset = window.innerWidth - document.body.offsetWidth

        document.body.style.cssText = `
            position: fixed;
            top: -${ this.settings.scrollPosition }px;
            padding-right: ${ this.settings.offset }px;
            height: 100%;
            width: 100%;
            overflow: hidden;
        `
    },

    enable() {
        document.body.style.cssText = ''

        window.scroll({ top: this.settings.scrollPosition })

        this.settings.scrollPosition = 0
    },

    enableAfterNavigation() {
        document.body.style.cssText = ''
        this.settings.scrollPosition = 0
    },

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
}
