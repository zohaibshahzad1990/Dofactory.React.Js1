import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const HomeList = React.lazy(() => import("/src/pages/Home/List"));

const OpportunitiesList = React.lazy(() => import("/src/pages/Opportunities/List"));
const OpportunitiesDetail = React.lazy(() => import("/src/pages/Opportunities/Detail"));
const OpportunitiesEdit = React.lazy(() => import("/src/pages/Opportunities/Edit"));

const LeadsList = React.lazy(() => import("/src/pages/Leads/List"));
const LeadsDetail = React.lazy(() => import("/src/pages/Leads/Detail"));
const LeadsEdit = React.lazy(() => import("/src/pages/Leads/Edit"));

const AdminList = React.lazy(() => import("/src/pages/Admin/List"));


const loading = (
    <div className="pt-10 text-center fst-italic">
        Loading...
    </div>
);

export const Body = () => {
    return (

        <Suspense fallback={loading}>
            <Routes>
                
                <Route exact path="/home" element={<HomeList />} />

                {/* Opportunities */}

                <Route exact path="/opportunities" element={<OpportunitiesList />} />
                <Route exact path="/opportunities/edit" element={<OpportunitiesEdit />}>
                    <Route index name="New" element={<OpportunitiesEdit />} />  {/* Handles path without id */}
                    <Route path=":id" name="Existing" element={<OpportunitiesEdit />} /> {/* Handles path with id */}
                </Route>
                <Route exact path="/opportunities/:id" element={<OpportunitiesDetail />} />

                {/* Leads */}

                <Route exact path="/leads" element={<LeadsList />} />
                <Route exact path="/leads/edit" element={<LeadsEdit />} >
                    <Route index name="New" element={<LeadsEdit />} />  {/* Handles path without id */}
                    <Route path=":id" name="Existing" element={<LeadsEdit />} /> {/* Handles path with id */}
                </Route>
                <Route exact path="/leads/:id" element={<LeadsDetail />} />

                {/* Admin */}

                <Route exact path="/admin" element={<AdminList />} />

                {/* Other modules here... */}

                <Route path="/" element={<Navigate to="/" replace />} />

            </Routes>
        </Suspense>
    )
}

export default React.memo(Body)