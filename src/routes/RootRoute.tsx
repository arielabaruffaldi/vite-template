import { Fragment, FunctionComponent } from 'react'
import { Route } from 'react-router-dom'

import { RedirectRoute } from './RedirectRoute'

export const RootRoute: FunctionComponent = () => {
    return (
        <Fragment>
            <Route path="*" element={<RedirectRoute />} />
        </Fragment>
    )
}
