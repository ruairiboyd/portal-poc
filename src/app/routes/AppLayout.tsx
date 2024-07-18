import React, { Suspense } from 'react'
import { Link, Outlet } from 'react-router-dom'

export function AppLayout(): JSX.Element {
    return (
        <div className="app-container">
            <div className="container-fluid p-0">
                <nav className="navbar primary">
                    <div className="container-fluid">
                        <div className="navbar-brand">
                            <h2 className="fs-2 fw-bold">Portal Sandbox</h2>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="container-fluid p-0 m-0">
                <nav className="navbar light align-items-center border border-1">
                    <div className="container-fluid justify-content-between">
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/user">User</Link>
                            </li>
                            <li>
                                <Link to="/posts">Posts</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            <div className="container-fluid p-0 content-container">
                <div className="content content-container">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Outlet />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default AppLayout
