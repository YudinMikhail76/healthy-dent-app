export function generateGtmStartScript() {
    return {
        'data-id': 'gtm-start',
        children: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KTGG9C');
        `,
        type: 'text/javascript',
        defer: true,
        async: true
    }
}

export function generateGtmDeferredScript() {
    return {
        'data-id': 'gtm-deferred',
        children: `
            (function(w,d){
                function loadGTM(){
                    if(w._gtmLoaded)return;w._gtmLoaded=1;
                    var s='script',l='dataLayer',i='GTM-KTGG9C';
                    w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
                    var f=d.getElementsByTagName(s)[0],j=d.createElement(s),
                    dl=l!='dataLayer'?'&l='+l:'';j.async=true;
                    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                    f.parentNode.insertBefore(j,f);
                }
                if('requestIdleCallback' in w){w.requestIdleCallback(loadGTM,{timeout:3500})}
                else{setTimeout(loadGTM,3500)}
            })(window,document);
        `,
        type: 'text/javascript'
    }
}

export function generateGtmNoScript() {
    return { 
        body: true,
        children: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KTGG9C" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
    }
}