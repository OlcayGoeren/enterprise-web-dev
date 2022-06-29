import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutComponent from './components/Layout';
import RequireAuth from './components/RequireAuth';
import AboutPage from './pages/About';
import HomePage from './pages/Home';
import ShareAccessPage from './pages/ShareAccessPage';
import TestPage from './pages/Test';

export interface IApplicationProps { }

const Application: React.FunctionComponent<IApplicationProps> = (props) => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/share/:shareId" element={<ShareAccessPage />} />
                <Route
                    path="/kalender"
                    element={
                        <RequireAuth>
                            <TestPage />
                        </RequireAuth>
                    }
                />
                {/* <Route path="layout" element={<LayoutComponent />}>
                    <Route index element={<AboutPage />} />
                    <Route path=":number" element={<AboutPage />} />
                </Route> */}
            </Routes>
        </BrowserRouter>
    );
};

export default Application;
