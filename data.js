const data = {
    doctors: [
      {
        id: 1,
        name: 'Jeff Anderson',
        specialty: 'Cardiologist'
      },
      {
        id: 2,
        name: 'Pat Smith',
        specialty: 'Neurosurgeon'
      },
      {
        id: 3,
        name: 'Jane Johnston',
        specialty: 'Dermatologist'
      }
    ],
    patients: [
      {
        id: 1,
        name: 'Alan Mckenzie'
      },
      {
        id: 2,
        name: 'Robert Kidman'
      }
    ],
    visits: [
      {
        doctorid: 1,
        doctorName:'Jeff Anderson',
        patientid: 1,
        patientName: 'Alan Mckenzie',
        date: 'Dec 1, 2019'
      },
      {
        doctorid: 3,
        doctorName:'Jane Johnston',
        patientid: 1,
        patientName: 'Alan Mckenzie',
        date: 'Jan 6, 2020'
      },
      {
        doctorid: 2,
        doctorName:'Pat Smith',
        patientid: 2,
        patientName: 'Robert Kidman',
        date: 'Jan 12, 2020'
      }
    ]
  };
export default data;