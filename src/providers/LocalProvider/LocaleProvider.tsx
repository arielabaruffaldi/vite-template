import React, { useState, useEffect, PropsWithChildren } from 'react'
import { I18nProvider } from '@lingui/react'
import { I18n, Messages, i18n } from '@lingui/core'
import * as plurals from 'make-plural/plurals'

interface Props extends PropsWithChildren {
    currentLocale: string

    getCatalog: (language: string) => Promise<{ messages: Messages }>
}

export interface LocaleContextValue {
    currentLocale: string
    changeLocale: (locale: string) => Promise<void>
    loading: boolean
    _: I18n['_']
}

export const LocaleContext = React.createContext<LocaleContextValue>({} as LocaleContextValue)

export const LocaleProvider: React.FunctionComponent<Props> = props => {
    const [loading, setLoading] = useState(true)
    const [currentLocale, setCurrentLocale] = useState(props.currentLocale)

    async function changeLocale(locale: string) {
        setLoading(true)
        setCurrentLocale(locale)

        try {
            const catalog = await props.getCatalog(locale)

            const plural = locale.split('-')[0].toLowerCase() as keyof typeof plurals

            i18n.loadLocaleData(locale, { plurals: plurals[plural] })

            i18n.load(locale, catalog.messages)
            i18n.activate(locale)

            setLoading(false)
        } catch (e) {
            console.warn(e)
            setLoading(false)
        }
    }

    useEffect(() => {
        void (async function change() {
            await changeLocale(props.currentLocale)
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) return null

    return (
        <I18nProvider i18n={i18n}>
            <LocaleContext.Provider
                value={{
                    currentLocale,
                    changeLocale: changeLocale,
                    loading,
                    _: i18n._.bind(i18n),
                }}
            >
                {props.children}
            </LocaleContext.Provider>
        </I18nProvider>
    )
}
