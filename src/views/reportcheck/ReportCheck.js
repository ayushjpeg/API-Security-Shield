import React, { useState } from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow, CForm, CFormLabel, CFormSelect, CFormTextarea, CButton } from '@coreui/react'
import { CChartDoughnut, CChartLine } from '@coreui/react-chartjs'

const ReportCheck = () => {
  const [api, setApi] = useState('')
  const [description, setDescription] = useState('')

  const handleApiChange = (event) => {
    setApi(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const handleSubmit = () => {
    alert(`API: ${api}\nDescription: ${description}`)
  }

  const doughnutData = {
    labels: ['Resolved', 'Open', 'Unresolved'],
    datasets: [
      {
        data: [229, 157, 107],
        backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
        hoverBackgroundColor: ['#41B883', '#E46651', '#00D8FF'],
      },
    ],
  }

  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Issues Reported',
        backgroundColor: 'rgba(220, 220, 220, 0.2)',
        borderColor: 'rgba(220, 220, 220, 1)',
        pointBackgroundColor: 'rgba(220, 220, 220, 1)',
        pointBorderColor: '#fff',
        data: [50, 60, 70, 90],
      },
      {
        label: 'Issues Resolved',
        backgroundColor: 'rgba(151, 187, 205, 0.2)',
        borderColor: 'rgba(151, 187, 205, 1)',
        pointBackgroundColor: 'rgba(151, 187, 205, 1)',
        pointBorderColor: '#fff',
        data: [30, 45, 65, 85],
      },
    ],
  }

  return (
    <CRow>
      <CCol xs={12} md={6}>
        <CCard className="mb-4">
          <CCardHeader>Report Check</CCardHeader>
          <CCardBody>
            <CForm>
              <CFormLabel>Select an API</CFormLabel>
              <CFormSelect value={api} onChange={handleApiChange} className="mb-3">
                <option value="API 1">API 1</option>
                <option value="API 2">API 2</option>
                <option value="API 3">API 3</option>
              </CFormSelect>

              <CFormLabel>Description</CFormLabel>
              <CFormTextarea
                value={description}
                onChange={handleDescriptionChange}
                rows="4"
                className="mb-3"
              />

              <CButton color="primary" onClick={handleSubmit}>
                Submit
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader>Issues This Month</CCardHeader>
          <CCardBody>
            <CChartLine data={lineData} />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12} md={6}>
        <CCard className="mb-4">
          <CCardHeader>Support Status</CCardHeader>
          <CCardBody>
            <CChartDoughnut data={doughnutData} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ReportCheck