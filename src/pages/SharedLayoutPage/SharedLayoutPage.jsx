// import Header from '../../../shared/components/Header';

import React, { Suspense } from 'react';

import { Outlet } from 'react-router-dom';
import Container from 'shared/components/Container';


const SharedLayoutPage = () => {
    return (
        <div>
            <Suspense fallback={null}>
            <Container>
              <h1>I'm ready to start</h1>
              <p>Wallet Finance App</p>
             </Container>
                {/* <Header /> */}
                <Suspense fallback={null}>
                    <Outlet />
                </Suspense>
            </Suspense>
        </div>
    );
};


export default SharedLayoutPage;