import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './_navigation/Router';
import './App.css';
import Sidebar from './_components/SideNavBar';
import LoadingAnimation from './_components/Loading/index';
import apiClient  from './_api/client';
import {debounce} from 'lodash';


interface Styles {
  [key: string]: React.CSSProperties;
}


const styles:Styles = {
  dashboard: {
    height: '100vh',
    display: 'flex',
  },
  mainContent: {
    height: '100vh',
    width: '100%',
    overflowY: 'scroll',
    padding: '15px 10px',
    scrollbarWidth: 'none',
    background: 'var(--grey-dim)',
  },
  hiddenContent: {
    display: 'none',
  },
};

function App() {
  const [loading, setLoading] = useState(false);

  const setLoadingDebounced = debounce(setLoading, 300);



  useEffect(() => {

    const clearInterceptors = () => {

        apiClient.addRequestTransform(request => {
          setLoadingDebounced(true);
        });

        apiClient.addResponseTransform(response => {
          //TODO: for testing purpose i am adding delay to Loading so that the animation take its time to finish '3s'
          setTimeout(() => {
            setLoading(false);
          }, 800);
        });
      };

    return clearInterceptors;
  }, [setLoadingDebounced]);



  return (
    <BrowserRouter>
       <div style={styles.dashboard}>
        <div id={"divSideNav"}>
          <Sidebar />
        </div>

        <div style={styles.mainContent}>
          {loading && <LoadingAnimation />}

          <div style={loading ? styles.hiddenContent : {}}>
            <Router />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
