import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CCardHeader,
  CRow,
  CForm,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CButton,
} from '@coreui/react'
import { CChartDoughnut, CChartLine } from '@coreui/react-chartjs'
import axios from 'axios'

const ReportCheck = () => {
  const [apiList, setApiList] = useState([]); // Store fetched API list
  const [api, setApi] = useState(''); // Store selected API key
  const [description, setDescription] = useState(''); // Store description

  // Fetch the list of APIs from the backend
  useEffect(() => {
    fetch('https://api-security-shield-backend.ayux.in/api/apis')
      .then((response) => response.json())
      .then((data) => {
        setApiList(data); // Set the fetched data to apiList
        if (data.length > 0) {
          setApi(data[0].key); // Select the first API by default using its key
        }
      })
      .catch((error) => {
        console.error('Error fetching API list:', error);
      });
  }, []);

  // Handle API change
  const handleApiChange = (event) => {
    setApi(event.target.value); // Update the selected API key
  }

  // Handle description change
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://api-security-shield-backend.ayux.in/issues', {
        api: api, // Use the selected API key
        description: description,
      });
      alert(`Issue reported: ${response.data.id}`);
    } catch (error) {
      console.error('Error reporting issue:', error);
      alert('Failed to report the issue.');
    }
  }

  // Doughnut chart data
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

  // Line chart data
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
                <option value="" disabled>Select API</option>
                {apiList.map((apiItem) => (
                  <option key={apiItem.key} value={apiItem.key}>
                    {apiItem.name}
                  </option>
                ))}
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
