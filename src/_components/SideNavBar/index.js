import React from 'react';
import './style.css'
import { Image  } from 'react-bootstrap';

import { useLocation, NavLink } from 'react-router-dom';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';

const sidebarItems = [
  { path: '/', label: 'Dashboard', icon: 'columns' },
  { path: '/test', label: 'Emploi du temps', icon: 'calendar-alt' },
  { path: '/marks', label: 'Notes', icon: 'clipboard' },
  { path: '/courses', label: 'Cours', icon: 'book' },
  { path: '/chat', label: 'Chat', icon: 'comment-alt' },
  { path: '/contact', label: 'Contact', icon: 'address-book' },
  { path: '/news', label: 'Actualités', icon: 'newspaper' },
  { path: '/blogEditor', label: 'Edition des actualités', icon: 'edit' },
  
  { path: '/hero404', label: '404 page', icon: 'exclamation-circle' },
];

 
const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar-container">
      <CDBSidebar textColor="#333" backgroundColor="#f0f0f0">
        <CDBSidebarHeader prefix={<i   className="fa fa-bars fa-large mt-2"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            <Image width={'135px'} src='/_images/Inssat.png'/>
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            {sidebarItems.map((item, index) => (
              <NavLink
                exact
                to={item.path}
                // activeClassName="activeClicked"
                className={`sidebar-item ${location.pathname === item.path ? 'activeClicked' : ''}`}
                key={index}
              >
                <CDBSidebarMenuItem icon={item.icon}>{item.label}</CDBSidebarMenuItem>
              </NavLink>
            ))}
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div style={{ padding: '20px 5px' }}>Sidebar Footer</div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
