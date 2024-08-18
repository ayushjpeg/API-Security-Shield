import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CCard, CCardBody, CCol, CCardHeader, CRow, CFormSelect } from '@coreui/react'
import { Line, Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto'

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
    security: {
      authMechanism: 'OAuth 2.0',
      encryption: 'TLS 1.2',
      vulnerability: 'None detected',
      firewallProtection: 'Enabled',
      DDOSProtection: 'Enabled',
      penetrationTesting: 'Passed',
    },
    performance: {
      requestCount: 1231,
      avgResponseTime: '110ms',
      successRate: '99.0%',
      throughput: '1500 req/s',
      maxConcurrentUsers: 1000,
      latencyPercentiles: {
        p95: '150ms',
        p99: '200ms',
      },
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
    security: {
      authMechanism: 'API Key',
      encryption: 'TLS 1.2',
      vulnerability: 'Minor issue detected',
      firewallProtection: 'Enabled',
      DDOSProtection: 'Enabled',
      penetrationTesting: 'Pending',
    },
    performance: {
      requestCount: 800,
      avgResponseTime: '320ms',
      successRate: '95.0%',
      throughput: '1000 req/s',
      maxConcurrentUsers: 800,
      latencyPercentiles: {
        p95: '350ms',
        p99: '400ms',
      },
    },
  },
  {
    id: 3,
    name: 'Order Management API',
    description: 'Handles order processing and tracking',
    status: 'Healthy',
    version: 'v3.1.0',
    uptime: '99.7%',
    responseTime: '200ms',
    errorRate: '0.5%',
    lastChecked: '2024-08-18T12:34:56Z',
    security: {
      authMechanism: 'JWT',
      encryption: 'TLS 1.3',
      vulnerability: 'None detected',
      firewallProtection: 'Enabled',
      DDOSProtection: 'Enabled',
      penetrationTesting: 'Passed',
    },
    performance: {
      requestCount: 1500,
      avgResponseTime: '190ms',
      successRate: '98.8%',
      throughput: '1800 req/s',
      maxConcurrentUsers: 1200,
      latencyPercentiles: {
        p95: '220ms',
        p99: '270ms',
      },
    },
  },
  {
    id: 4,
    name: 'Inventory Service API',
    description: 'Manages product inventory and stock levels',
    status: 'Degraded',
    version: 'v1.0.0',
    uptime: '96.0%',
    responseTime: '500ms',
    errorRate: '3.0%',
    lastChecked: '2024-08-18T12:34:56Z',
    security: {
      authMechanism: 'API Key',
      encryption: 'TLS 1.2',
      vulnerability: 'Major issue detected',
      firewallProtection: 'Disabled',
      DDOSProtection: 'Disabled',
      penetrationTesting: 'Failed',
    },
    performance: {
      requestCount: 1000,
      avgResponseTime: '480ms',
      successRate: '92.0%',
      throughput: '800 req/s',
      maxConcurrentUsers: 500,
      latencyPercentiles: {
        p95: '600ms',
        p99: '700ms',
      },
    },
  },
  {
    id: 5,
    name: 'Notification Service API',
    description: 'Handles user notifications and alerts',
    status: 'Healthy',
    version: 'v2.3.4',
    uptime: '99.8%',
    responseTime: '180ms',
    errorRate: '0.1%',
    lastChecked: '2024-08-18T12:34:56Z',
    security: {
      authMechanism: 'OAuth 2.0',
      encryption: 'TLS 1.2',
      vulnerability: 'None detected',
      firewallProtection: 'Enabled',
      DDOSProtection: 'Enabled',
      penetrationTesting: 'Passed',
    },
    performance: {
      requestCount: 900,
      avgResponseTime: '170ms',
      successRate: '99.5%',
      throughput: '1200 req/s',
      maxConcurrentUsers: 900,
      latencyPercentiles: {
        p95: '200ms',
        p99: '250ms',
      },
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

  // Enhanced data for latency chart with more variation
  const latencyData = {
    labels:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Latency (ms)',
        data: [100, 300, 150, 200, 500, 120, 320], // Example latency data with more variation
        borderColor: 'blue',
        fill: false,
        pointBackgroundColor: 'red', // Color for points
        pointBorderColor: 'blue',
        pointHoverBackgroundColor: 'yellow', // Change color on hover
        pointHoverBorderColor: 'black',
        pointRadius: 5, // Increase point size for better visibility
      },
    ],
  }

  const requestsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Requests',
        data: [500, 600, 700, 650, 800, 720, 750], // Example request data
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

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

      {selectedApi ? (
        <>
          {/* General, Security, and Performance Information */}
          

          {/* Charts and Cards */}
          <CRow>
            {/* Latency Line Chart */}
            <CCol xs={12} md={4}>
              <CCard className="mb-4" style={{ marginTop: '1.5rem' }}>
                <CCardHeader>API Latency (Last 7 Days)</CCardHeader>
                <CCardBody>
                  <Line
                    data={latencyData}
                    options={{
                      maintainAspectRatio: false,
                      tooltips: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                          label: function (tooltipItem) {
                            return `Latency: ${tooltipItem.yLabel} ms`
                          },
                        },
                      },
                      hover: {
                        mode: 'nearest',
                        intersect: true,
                      },
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>

            {/* Requests Histogram */}
            <CCol xs={12} md={4}>
              <CCard className="mb-4" style={{ marginTop: '1.5rem' }}>
                <CCardHeader>API Requests (Last 7 Days)</CCardHeader>
                <CCardBody>
                  <Bar data={requestsData} options={{ maintainAspectRatio: false }} />
                </CCardBody>
              </CCard>
            </CCol>

            {/* Latency and Unique Users Cards */}
            <CCol xs={12} md={2} style={{ marginTop: '1rem' }}>
              <CCard className="mb-4">
                <CCardHeader>Latency  <small style={{ fontSize: 'xx-small' }}>(24 hrs)</small></CCardHeader>
                <CCardBody>
                  <h5>{selectedApi.responseTime}</h5>
                </CCardBody>
              </CCard>

              <CCard className="mb-4">
                <CCardHeader>Users     <small style={{ fontSize: 'xx-small' }}>(24 hrs)</small></CCardHeader>
                <CCardBody>
                  <h5>3,328</h5> {/* Example data */}
                </CCardBody>
              </CCard>
            </CCol>

            {/* Requests and Failures Cards */}
            <CCol xs={12} md={2} style={{ marginTop: '1rem' }}>
              <CCard className="mb-4">
                <CCardHeader>Requests <small style={{ fontSize: 'xx-small' }}>(24 hrs)</small></CCardHeader>
                <CCardBody>
                  <h5>{selectedApi.performance.requestCount}</h5>
                </CCardBody>
              </CCard>

              <CCard className="mb-4">
                <CCardHeader>Failures <small style={{ fontSize: 'xx-small' }}>(24 hrs)</small></CCardHeader>
                <CCardBody>
                  <h5>765</h5> {/* Example data */}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs={12} md={4} >
              <CCard className="mb-4" style={{ marginTop: '1rem' }}>
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
       
                </CCardBody>
              </CCard>
            </CCol>

            <CCol xs={12} md={4}>
              <CCard className="mb-4" style={{ marginTop: '1rem' }}>
                <CCardHeader>Security Information</CCardHeader>
                <CCardBody>
                  <p>
                    <strong>Authentication Mechanism:</strong> {selectedApi.security.authMechanism}
                  </p>
                  <p>
                    <strong>Encryption:</strong> {selectedApi.security.encryption}
                  </p>
                  <p>
                    <strong>Vulnerability:</strong> {selectedApi.security.vulnerability}
                  </p>
                  <p>
                    <strong>Firewall Protection:</strong> {selectedApi.security.firewallProtection}
                  </p>
                  <p>
                    <strong>DDOS Protection:</strong> {selectedApi.security.DDOSProtection}
                  </p>
                  <p>
                    <strong>Penetration Testing:</strong> {selectedApi.security.penetrationTesting}
                  </p>
                </CCardBody>
              </CCard>
            </CCol>

            <CCol xs={12} md={4}>
              <CCard className="mb-4" style={{ marginTop: '1rem' }}>
                <CCardHeader>Performance Metrics</CCardHeader>
                <CCardBody>
                  <p>
                    <strong>Request Count:</strong> {selectedApi.performance.requestCount}
                  </p>
                  <p>
                    <strong>Average Response Time:</strong>{' '}
                    {selectedApi.performance.avgResponseTime}
                  </p>
                  <p>
                    <strong>Success Rate:</strong> {selectedApi.performance.successRate}
                  </p>
                  <p>
                    <strong>Throuhput:</strong> {selectedApi.performance.throughput}
                  </p>
                  <p>
                    <strong>Max Concurrent Users:</strong>{' '}
                    {selectedApi.performance.maxConcurrentUsers}
                  </p>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </>
      ) : (
        <CCol xs={12}>
          <CCard>
            <CCardBody>
              <p>Please select an API to view its details.</p>
            </CCardBody>
          </CCard>
        </CCol>
      )}
    </CRow>
  )
}

Colors.propTypes = {
  match: PropTypes.object,
}

export default Colors
