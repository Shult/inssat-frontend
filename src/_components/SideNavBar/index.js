import React from 'react';
import '../SideNavBar/style.css'
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
import {RoleManager} from "../../_navigation/RoleManager";
import UserService from "../../services/UserServices";

const sidebarItems = [
  { path: '/', label: 'Dashboard', icon: 'columns' },
  { path: '/schedule', label: 'Emploi du temps', icon: 'calendar-alt' },
  { path: '/apprenticeshipTickets', label: 'Notation', icon: 'clipboard' },
  { path: '/apprenticeshipManagement', label: 'Association', icon: 'clipboard' },
  { path: '/courses', label: 'Cours', icon: 'book' },
  { path: '/chat', label: 'Chat', icon: 'comment-alt' },
  // { path: '/contact', label: 'Contact', icon: 'address-book' },
  { path: '/news', label: 'Actualités', icon: 'newspaper' },
  { path: '/article/new', label: 'Edition des actualités', icon: 'edit' },
  { path: '/hero404', label: '404 page', icon: 'exclamation-circle' },
];

const Sidebar = () => {
  const location = useLocation();
  const roleManager = RoleManager()

  let localSidebarItems = []

  if (roleManager.isStudent || roleManager.isTeacher){
    localSidebarItems.push({ path: '/', label: 'Dashboard', icon: 'columns' })
    localSidebarItems.push({ path: '/schedule', label: 'Emploi du temps', icon: 'calendar-alt' })
    localSidebarItems.push({ path: '/courses', label: 'Cours', icon: 'book' })
  }

  if (roleManager.isApprenticeshipManager){
    localSidebarItems.push( { path: '/apprenticeshipManagement', label: 'Association', icon: 'clipboard'})
  }

  if (roleManager.isNewsManager){
    localSidebarItems.push( { path: '/article/new', label: 'Edition des actualités', icon: 'edit' })
  }
  // localSidebarItems.push({ path: '/contact', label: 'Contact', icon: 'address-book' })
  localSidebarItems.push({ path: '/news', label: 'Article ENSSAT', icon: 'newspaper' })

  if (roleManager.isStudent || roleManager.isApprentice || roleManager.isStudentSupervisor || roleManager.isStudentTutor){
    localSidebarItems.push({ path: '/apprenticeshipTickets', label: 'Notation', icon: 'clipboard' })
  }
  localSidebarItems.push({ path: '/article', label: 'Article INSSAT', icon: 'newspaper' })


  const handleCourseLinkClick = () => {
    window.open('https://foad.univ-rennes.fr/my/', '_blank');
  };

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
            {localSidebarItems.map((item, index) => (
              <NavLink
                to={item.path}
                className={`sidebar-item ${location.pathname === item.path ? 'activeClicked' : ''}`}
                key={index}
                onClick={item.path === '/courses' ? handleCourseLinkClick : undefined}
              >
                <CDBSidebarMenuItem icon={item.icon}>{item.label}</CDBSidebarMenuItem>
              </NavLink>
            ))}
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter>
            <CDBSidebarContent style={{ textAlign: 'center' }}>
              <CDBSidebarMenu className={"txtLeft"}>
                <NavLink className={`sidebar-item ${location.pathname === "#" ? 'activeClicked' : ''}`}
                         onClick={() => {window.open(UserService.createAccountUrl(), "_blank")}}
                >
                  <CDBSidebarMenuItem icon={"edit"}>Mon profil</CDBSidebarMenuItem>
                </NavLink>
                <NavLink className={`sidebar-item ${location.pathname === "#" ? 'activeClicked' : ''}`}
                         onClick={() => {UserService.doLogout({redirectUri: window.location.origin })}}
                >
                  <CDBSidebarMenuItem icon={"lock"}>Déconnexion</CDBSidebarMenuItem>
                </NavLink>
              </CDBSidebarMenu>
            </CDBSidebarContent>
          </CDBSidebarFooter>
        </CDBSidebar>

      </div>
  );
};

export default Sidebar;
