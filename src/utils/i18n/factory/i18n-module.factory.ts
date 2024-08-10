import {
    QueryResolver,
    type I18nOptions,
    AcceptLanguageResolver,
    HeaderResolver,
} from 'nestjs-i18n';
import path from 'path';

/**
 * The I18n configuration.
 */
export const I18nModuleFactory: I18nOptions = {
    fallbackLanguage: 'en',
    loaderOptions: {
        path: path.resolve(__dirname, '../../../i18n/lang'),
        watch: true,
    },
    resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
    ],
    typesOutputPath: path.join(
        path.resolve(__dirname, '../../../../src/i18n/types/'),
        'i18n.generated.ts',
    ),
};
