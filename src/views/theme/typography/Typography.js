import React, { useState } from 'react'
import { CCard, CCardHeader, CCardBody, CButton, CFormSelect, CRow, CCol } from '@coreui/react'
import { DocsLink } from 'src/components'
import './Typography.css' // Import custom CSS for additional styling

const apiList = [
  { id: 1, name: 'User Service API' },
  { id: 2, name: 'Payment Service API' },
  { id: 3, name: 'Order Management API' },
  { id: 4, name: 'Inventory Service API' },
  { id: 5, name: 'Notification Service API' },
]

const owaspTop10 = [
  'Broken Access Control',
  'Cryptographic Failures',
  'Injection',
  'Insecure Design',
  'Security Misconfiguration',
  'Vulnerable and Outdated Components',
  'Identification and Authentication Failures',
  'Software and Data Integrity Failures',
  'Security Logging and Monitoring Failures',
  'Server-Side Request Forgery (SSRF)',
]

const Typography = () => {
  const [selectedApi, setSelectedApi] = useState(apiList[0].id)
  const [results, setResults] = useState(Array(owaspTop10.length).fill(null))
  const [testing, setTesting] = useState(false)

  const handleApiChange = (e) => {
    setSelectedApi(parseInt(e.target.value))
  }

  const startTest = () => {
    setTesting(true)

    // Clear previous results
    setResults(Array(owaspTop10.length).fill(null))

    owaspTop10.forEach((risk, index) => {
      setTimeout(() => {
        // Set 80% probability for Pass and 20% for Fail
        const newResult = Math.random() < 0.8 ? 'Pass' : 'Fail'
        setResults((prevResults) => {
          const updatedResults = [...prevResults]
          updatedResults[index] = newResult
          return updatedResults
        })
        if (index === owaspTop10.length - 1) {
          setTesting(false)
        }
      }, index * 1000)
    })
  }

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <span>OWASP Top 10 API Attacks Coverage</span>
        <DocsLink href="https://owasp.org/www-project-api-security/" />
      </CCardHeader>
      <CCardBody>
        <div className="mb-4">
          <CFormSelect value={selectedApi} onChange={handleApiChange}>
            {apiList.map((api) => (
              <option key={api.id} value={api.id}>
                {api.name}
              </option>
            ))}
          </CFormSelect>
        </div>
        <CButton color="primary" onClick={startTest} disabled={testing} className="mb-4">
          {testing ? 'Testing in Progress...' : 'Start Test'}
        </CButton>
        <CRow>
          {owaspTop10.map((risk, index) => (
            <CCol md={6} key={index} className="mb-3">
              <div className="risk-item">
                <h5 className="risk-title">{risk}</h5>
                {results[index] !== null && (
                  <div
                    className={`risk-result ${results[index] === 'Pass' ? 'result-pass' : 'result-fail'}`}
                  >
                    <strong>Result: {results[index]}</strong>
                  </div>
                )}
              </div>
            </CCol>
          ))}
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default Typography
