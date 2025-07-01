import Header from './../../components/ComponentHeader';
import Footer from './../../components/ComponentFooter';
import Sidebar from './../../components/ComponentSideBar';

function AdminDashboard() {
    return (
        <div id="wrapper">
            {/* Sidebar */}
            <Sidebar />

            <div id="content-wrapper" className="d-flex flex-column">
                {/* Main Content */}
                <div id="content">
                    {/* Topbar/Header */}
                    <Header />

                    {/* Content */}
                    <div className="container-fluid">
                        <h1 className="h3 mb-4 text-gray-800">Dashboard Admin</h1>

                        <div className="row">
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-primary shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                    Jumlah Kategori
                                                </div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">5</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-list fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tambah card lainnya di sini */}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}

export default AdminDashboard;
