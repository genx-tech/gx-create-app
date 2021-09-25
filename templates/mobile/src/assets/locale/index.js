import { fs } from '@genx/sys';

export default function initialize(registerLocale) {
    const locales = fs.readDirSync(__dirname);

    locales.forEach(locale => {
        console.log(locale);
    });    

    /*
    registerLocale('en-AU', 'app', enApp);
    registerLocale('en-US', 'app', enApp);
    registerLocale('en-UK', 'app', enApp);

    registerLocale('en-AU', 'user', enUser);
    registerLocale('en-US', 'user', enUser);
    registerLocale('en-UK', 'user', enUser);
    */
}
