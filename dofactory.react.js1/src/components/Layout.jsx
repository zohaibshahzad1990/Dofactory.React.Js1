import React from 'react';

import Header from './Header';
import Footer from './Footer';
import Body from './Body';

export const Layout = () => {
    return (
        <React.Fragment>

            <Header />

            <div className="container-fluid body-content">
                <Body />
                <Footer />
            </div>

        </React.Fragment>
    )
}

export default Layout;