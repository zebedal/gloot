import Header from './Header'
import Footer from './Footer'
import { Fragment } from 'react'

const Layout = ({ children }) => (
    <Fragment>
        <Header />
        <main>
            {children}
        </main>
        <Footer />
    </Fragment>
)

export default Layout