import React from "react";
import ComponentSideBar from '../components/ComponentSideBar';
import ComponentHeader from '../components/ComponentHeader';
import ComponentFooter from '../components/ComponentFooter';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div id="wrapper" className="bg-light">
            <ComponentSideBar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <ComponentHeader />
                    <div className="container-fluid py-4">
                        <div className="card shadow-sm border-0 rounded-3 animate__animated animate__fadeIn">
                            <div className="card-body">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
                <ComponentFooter />
            </div>
        </div>
    );
};

export default AdminLayout;
