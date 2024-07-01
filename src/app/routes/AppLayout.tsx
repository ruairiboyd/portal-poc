import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout: React.FC = () => {
  console.count('AppLayout rendered');
  return (
    <div className='app-container'>
      <div className='container-fluid p-0'>
        <nav className='navbar primary'>
          <div className='container-fluid'>
            <div className='navbar-brand'>
              <h2 className='fs-2 fw-bold'>Dashboard</h2>
            </div>
          </div>
        </nav>
      </div>
      <div className='container-fluid p-0 m-0'>
        <nav className='navbar light align-items-center border border-1'>
          <div className='container-fluid justify-content-between'>
            {/* <div className='row'>
              <div className='col'>Teams</div>
              <div className='col'>Release Selector</div>
              <div className='col'>Time Selector</div>
            </div> */}
          </div>
        </nav>
      </div>

      <div className='container-fluid p-0 content-container'>
        <div className='content content-container'>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
