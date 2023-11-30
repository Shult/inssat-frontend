import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './_navigation/Router';
import './App.css';
import Sidebar from './_components/SideNavBar';
import LoadingAnimation from './_components/Loading/index';
import apiClient  from './_api/client';

function App() {
  const [loading, setLoading] = useState(false);



  useEffect(() => {

    const clearInterceptors = () => {

        apiClient.addRequestTransform(request => {
            setLoading(true);

          });

        apiClient.addResponseTransform(response => {
            //TODO: for testing purpose i am adding delay to Loading so that the animation take its time to finish '3s'
            setTimeout(() => {
                setLoading(false);
              }, 2500);
          });
    };

    return clearInterceptors;
  }, []);



  return (
    <BrowserRouter>
      <div className="dashboard d-flex"
           style={{
               height: '100vh',
               width: '100%',
               overflow: "hidden"
           }}>
        <div>
          <Sidebar/>
        </div>
        <div
          style={{
            height: '100vh',
            width: '100%',
            padding: '15px 10px',
            background: 'var(--grey-dim)',
          }}
        >
          {/* Render the LoadingAnimation based on the loading state */}
          {loading && <LoadingAnimation />}
          <Router />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
