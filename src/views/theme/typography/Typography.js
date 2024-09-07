import React, { useState } from 'react'
import { CCard, CCardHeader, CCardBody, CButton, CFormSelect, CRow, CCol } from '@coreui/react'
import { DocsLink } from 'src/components'
import './Typography.css' // Import custom CSS for additional styling

const apiList = [
  { id: 1, name: 'User Service API', url: 'api/user-service' },
  { id: 2, name: 'Payment Service API', url: 'api/payment' },
  { id: 3, name: 'Order Management API', url: 'api/order' },
  { id: 4, name: 'Inventory Service API', url: 'api/inventory' },
  { id: 5, name: 'Notification Service API', url: 'api/notification' },
  { id: 6, name: 'Demonstration', url: 'api/demo' },
]

const owaspTop10 = [
  'Broken Object Level Authorization',
  'Broken Authentication',
  'Broken Object Property Level Authorization',
  'Unrestricted Resource Consumption',
  'Broken Function Level Authorization',
  'Unrestricted Access to Sensitive Business Flows',
  'Server-Side Request Forgery (SSRF)',
  'Security Misconfiguration',
  'Improper Inventory Management',
  'Unsafe Consumption of APIs',
]

const Typography = () => {
  const [selectedApi, setSelectedApi] = useState(apiList[0])
  const [results, setResults] = useState(Array(owaspTop10.length).fill(null))
  const [testing, setTesting] = useState(false)

  const handleApiChange = (e) => {
    const selectedApiId = parseInt(e.target.value)
    const selectedApiData = apiList.find((api) => api.id === selectedApiId)
    setSelectedApi(selectedApiData)
  }

  const startTest = () => {
    setTesting(true)

    // Clear previous results
    setResults(Array(owaspTop10.length).fill(null))

    // Perform actual API request
    fetch('https://api-security-shield-backend.onrender.com/api/test_api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_url: `https://api-security-shield-backend.onrender.com/${selectedApi.url}`, // Use selectedApi.url
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResults(owaspTop10.map((risk) => data[risk] || 'Not Tested'))
        setTesting(false)
      })
      .catch((error) => {
        console.error('Error during API testing:', error)
        setTesting(false)
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
          <CFormSelect value={selectedApi.id} onChange={handleApiChange}>
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
