import { FunctionComponent, PropsWithChildren, Suspense } from 'react'
import { Routes } from 'react-router-dom'

import { Helmet, HelmetProvider } from 'react-helmet-async'

export const AppProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <Suspense>
            <HelmetProvider>
                <Helmet titleTemplate={'HCI | %s'} />
                <Routes>{children}</Routes>
            </HelmetProvider>
        </Suspense>
    )
}
