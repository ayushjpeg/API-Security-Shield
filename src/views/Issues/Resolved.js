import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCollapse,
  CContainer,
} from '@coreui/react'

function ResolvedIssues() {
  const [issues, setIssues] = useState([])
  const [selectedIssue, setSelectedIssue] = useState(null)

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/issues/resolved')
      .then((response) => setIssues(response.data))
      .catch((error) => console.error('Error fetching resolved issues:', error))
  }, [])

  return (
    <CContainer>
      <h2 className="mb-4">Resolved Issues</h2>
      <CCard>
        <CCardHeader>Issues List</CCardHeader>
        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Issue ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">API Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date Reported</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date Resolved</CTableHeaderCell>
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
                      {new Date(issue.date_reported).toLocaleDateString()}
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

export default ResolvedIssues
