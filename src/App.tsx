import { FunctionComponent } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { config } from '@/config'

import { RootRoute } from '@/routes'
import { LocaleProvider } from '@/providers'

export const App: FunctionComponent = () => {
    return (
        <LocaleProvider
            currentLocale={config.defaultLocale}
            getCatalog={language => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return require(
                    /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
                    `./locales/${language}/messages`
                )
            }}
        >
            <Router>
                <RootRoute />
            </Router>
        </LocaleProvider>
    )
}
