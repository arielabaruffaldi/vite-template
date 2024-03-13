import { createRoot } from 'react-dom/client'

import { App } from '@/App'

import '@/styles/base.scss'

const rootElement = document.getElementById('root')!
const root = createRoot(rootElement)

root.render(<App />)
