i18next
.use(i18nextHttpBackend)
.init({
    debug: true,
    fallbackLng: 'en',
}).then(() => {
    console.log('i18 init complete')
    // for options see
    // https://github.com/i18next/jquery-i18next#initialize-the-plugin
    jqueryI18next.init(i18next, $, { useOptionsAttr: true });
    console.log('jqueryI18next init complete')
    
    // start localizing, details:
    // https://github.com/i18next/jquery-i18next#usage-of-selector-function
}).catch(err => console.error(err));

function changeLanguage(lang='en') {
    i18next.changeLanguage(lang).then(() => translate());
}

function translate() {
    $('body').localize();
    console.log('localized top menu')
}

function addDataAttribute(value) {
    if(value) {
        return 'data-i18n="' + value + '"'
    }
    return ''
}

function findTranslation(translationKey) {
    const currentLanguage = UI.projects.education.spaces.docsSpace.language.toLowerCase()
    let value = i18next.translator.resourceStore.data[currentLanguage].translation
    const tKeyParts = translationKey.split('.')
    for(let i = 0; i < tKeyParts.length; i++) {
        value = value[tKeyParts[i]]
    }
    return value
}