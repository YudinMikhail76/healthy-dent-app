export const getServiceBenefitIcon = (type) => {
    return {
        guarantees: () => defineAsyncComponent(() => import('~/shared/assets/icons/guarantees.svg')),
        installmentPayment: () => defineAsyncComponent(() => import('~/shared/assets/icons/installment-payment.svg'))
    }[type]()
}

export const getFlagIcon = (type) => {
    const flags = {
        KR: () => defineAsyncComponent(() => import('~/shared/assets/icons/flags/KR.svg')),
        DE: () => defineAsyncComponent(() => import('~/shared/assets/icons/flags/DE.svg')),
        IL: () => defineAsyncComponent(() => import('~/shared/assets/icons/flags/IL.svg')),
        IT: () => defineAsyncComponent(() => import('~/shared/assets/icons/flags/IT.svg')),
        FR: () => defineAsyncComponent(() => import('~/shared/assets/icons/flags/FR.svg')),
        US: () => defineAsyncComponent(() => import('~/shared/assets/icons/flags/US.svg')),
        CH: () => defineAsyncComponent(() => import('~/shared/assets/icons/flags/CH.svg'))
    }

    return type in flags ? flags[type]() : null
}