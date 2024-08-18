import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          GRiD 6.0
        </a>
        
      </div>
      <div className="ms-auto">
        <span className="me-1">Developed by<t></t><t></t> <t></t></span>
       
          Ayush, Nikhil Sahu &amp; Ayush Chandram
        
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
