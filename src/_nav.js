import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSearch,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'API',
  },
  {
    component: CNavItem,
    name: 'Status & History',
    to: '/theme/colors',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Security Checks',
    to: '/theme/typography',
    icon: <CIcon icon={cilSearch} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Issues',
  },
  {
    component: CNavItem,
    name: 'Report an Issue',
    to: '/base',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    
  },
  {
    component: CNavItem,
    name: 'Active Issues',
    to: '/base',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    
  },
  {
    component: CNavItem,
    name: 'Resolved Issues',
    to: '/base',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    
  },
  
]

export default _nav
