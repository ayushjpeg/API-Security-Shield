import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CCard, CCardBody, CCol, CCardHeader, CRow, CFormSelect } from '@coreui/react'
import { CChartBar, CChartDoughnut } from '@coreui/react-chartjs'

// Mock Data for APIs
const apiData = [
  {
    id: 1,
    name: 'User Service API',
    description: 'Handles user management and authentication',
    status: 'Healthy',
    version: 'v1.2.3',
    uptime: '99.9%',
    responseTime: '120ms',
    errorRate: '0.2%',
    lastChecked: '2024-08-18T12:34:56Z',
    performanceData: {
      throughput: [5000, 5200, 5300, 5100, 5000],
      latency: [120, 130, 125, 115, 120],
      errorRate: [0.2, 0.3, 0.25, 0.2, 0.15],
    },
  },
  {
    id: 2,
    name: 'Payment Service API',
    description: 'Manages all payment-related operations',
    status: 'Warning',
    version: 'v2.0.1',
    uptime: '98.5%',
    responseTime: '300ms',
    errorRate: '1.5%',
    lastChecked: '2024-08-18T12:34:56Z',
    performanceData: {
      throughput: [2000, 2100, 2200, 2000, 1900],
      latency: [300, 320, 310, 305, 295],
      errorRate: [1.5, 1.4, 1.6, 1.5, 1.3],
    },
  },
  // Add more APIs here as needed
]

const Colors = () => {
  const [selectedApiId, setSelectedApiId] = useState(null)

  const handleApiChange = (event) => {
    const apiId = parseInt(event.target.value, 10)
    setSelectedApiId(apiId)
  }

  const selectedApi = apiData.find((api) => api.id === selectedApiId)

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>Select an API</CCardHeader>
          <CCardBody>
            <CFormSelect onChange={handleApiChange} value={selectedApiId || ''}>
              <option value="" disabled>
                Select an API
              </option>
              {apiData.map((api) => (
                <option key={api.id} value={api.id}>
                  {api.name}
                </option>
              ))}
            </CFormSelect>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12} md={4}>
        {selectedApi ? (
          <CCard className="mb-4">
            <CCardHeader>General Information</CCardHeader>
            <CCardBody>
              <p>
                <strong>Description:</strong> {selectedApi.description}
              </p>
              <p>
                <strong>Status:</strong> {selectedApi.status}
              </p>
              <p>
                <strong>Version:</strong> {selectedApi.version}
              </p>
              <p>
                <strong>Uptime:</strong> {selectedApi.uptime}
              </p>
              <p>
                <strong>Response Time:</strong> {selectedApi.responseTime}
              </p>
              <p>
                <strong>Error Rate:</strong> {selectedApi.errorRate}
              </p>
              <p>
                <strong>Last Checked:</strong> {new Date(selectedApi.lastChecked).toLocaleString()}
              </p>
            </CCardBody>
          </CCard>
        ) : (
          <CCard>
            <CCardBody>
              <p>Please select an API to view its details.</p>
            </CCardBody>
          </CCard>
        )}
      </CCol>
      {selectedApi && (
        <CCol xs={12} md={8}>
          <CRow>
            <CCol xs={12} md={6}>
              <CCard className="mb-4">
                <CCardHeader>Performance Charts</CCardHeader>
                <CCardBody>
                  <CChartBar
                    data={{
                      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                      datasets: [
                        {
                          label: 'Throughput',
                          backgroundColor: '#f87979',
                          data: selectedApi.performanceData.throughput,
                        },
                        {
                          label: 'Latency',
                          backgroundColor: '#36A2EB',
                          data: selectedApi.performanceData.latency,
                        },
                      ],
                    }}
                    labels="months"
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={12} md={6}>
              <CCard className="mb-4">
                <CCardHeader>Performance Metrics</CCardHeader>
                <CCardBody>
                  <CChartDoughnut
                    data={{
                      labels: ['Max Throughput', 'Min Latency', 'Max Error Rate'],
                      datasets: [
                        {
                          data: [
                            Math.max(...selectedApi.performanceData.throughput),
                            Math.min(...selectedApi.performanceData.latency),
                            Math.max(...selectedApi.performanceData.errorRate),
                          ],
                          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCol>
      )}
    </CRow>
  )
}

Colors.propTypes = {
  match: PropTypes.object,
}

export default Colors
