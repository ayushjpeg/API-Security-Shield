import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCollapse,
  CContainer,
} from '@coreui/react'

function ActiveIssues() {
  const [issues, setIssues] = useState([])
  const [selectedIssue, setSelectedIssue] = useState(null)

  useEffect(() => {
    axios
      .get('https://api-security-shield-backend.onrender.com/issues/active')
      .then((response) => setIssues(response.data))
      .catch((error) => console.error('Error fetching active issues:', error))
  }, [])

  const handleResolve = (issueId) => {
    axios
      .put(`https://api-security-shield-backend.onrender.com/issues/${issueId}/resolve`)
      .then(() => {
        setIssues(issues.filter((issue) => issue.id !== issueId))
        setSelectedIssue(null)
      })
      .catch((error) => console.error('Error resolving issue:', error))
  }

  return (
    <CContainer>
      <h2 className="mb-4">Active Issues</h2>
      <CCard>
        <CCardHeader>Issues List</CCardHeader>
        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Issue ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">API Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date Reported</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {issues.map((issue) => (
                <React.Fragment key={issue.id}>
                  <CTableRow
                    onClick={() => setSelectedIssue(selectedIssue?.id === issue.id ? null : issue)}
                  >
                    <CTableDataCell>{issue.id}</CTableDataCell>
                    <CTableDataCell>{issue.api}</CTableDataCell>
                    <CTableDataCell>
                      {new Date(issue.date_reported).toLocaleDateString()}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="success"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleResolve(issue.id)
                        }}
                      >
                        Resolve
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell colSpan="4">
                      <CCollapse visible={selectedIssue?.id === issue.id}>
                        <strong>Description:</strong>
                        <p>{issue.description}</p>
                      </CCollapse>
                    </CTableDataCell>
                  </CTableRow>
                </React.Fragment>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default ActiveIssues
