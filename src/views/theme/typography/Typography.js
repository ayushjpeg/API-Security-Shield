import React, { useState, useEffect } from 'react'
import { CCard, CCardHeader, CCardBody, CButton, CFormSelect, CRow, CCol } from '@coreui/react'
import { DocsLink } from 'src/components'
import './Typography.css' // Import custom CSS for additional styling

const Typography = () => {
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

  const [apiList, setApiList] = useState([])
  const [selectedApi, setSelectedApi] = useState(null)
  const [results, setResults] = useState(Array(owaspTop10.length).fill(null))
  const [testing, setTesting] = useState(false)

  useEffect(() => {
    // Fetch API list on component mount
    fetch('https://api-security-shield-backend.onrender.com/api/apis') // Use the backend URL
      .then((response) => response.json())
      .then((data) => {
        setApiList(data)
        if (data.length > 0) {
          setSelectedApi(data[0]) // Select the first API by default
        }
      })
      .catch((error) => {
        console.error('Error fetching API list:', error)
      })
  }, [])

  const handleApiChange = (e) => {
    const selectedApiKey = e.target.value
    const selectedApiData = apiList.find((api) => api.key === selectedApiKey)
    setSelectedApi(selectedApiData)
  }

  const startTest = () => {
    if (!selectedApi) return

    setTesting(true)

    // Clear previous results
    setResults(Array(owaspTop10.length).fill(null))

    // Perform actual API request
    fetch('https://api-security-shield-backend.onrender.com/test_api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_url: `https://fake-organization.onrender.com${selectedApi.url}`, // Use selectedApi.url
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
          <CFormSelect
            value={selectedApi ? selectedApi.key : ''}
            onChange={handleApiChange}
            disabled={apiList.length === 0}
          >
            {apiList.map((api) => (
              <option key={api.key} value={api.key}>
                {api.name}
              </option>
            ))}
          </CFormSelect>
        </div>
        <CButton
          color="primary"
          onClick={startTest}
          disabled={testing || !selectedApi}
          className="mb-4"
        >
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
