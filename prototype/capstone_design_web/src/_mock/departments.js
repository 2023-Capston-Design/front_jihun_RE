import { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../config'

/* let departmentArray = [];


axios.get(`${API.DEPARTMENT}`, {
  params: {
    "page": 1,
    "pagesize": 100,
  }
}).then((response) => {
  console.log(response)
  departmentArray = response.data
}).catch((error) => {
  console.log(error)
});

const departments = departmentArray.map((departmentData) => {
  return {
    id: departmentData.id,
    name: departmentData.name,
    phoneNumber: departmentData.phoneNumber,
    url: departmentData.url,
    profile: departmentData.departmentProfileURL
  };
});

export default departments;

 */
function Departments() {
  const [departmentArray, setDepartmentArray] = useState([]);

  useEffect(() => {
    axios.get(`${API.DEPARTMENT}`, {
      params: {
        "page": 1,
        "pagesize": 100,
      }
    })
      .then((response) => {
        console.log(response);
        setDepartmentArray(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // 빈 배열을 넣어 최초 한 번만 실행되도록 설정

  return departmentArray;
}

export default Departments;





/* const departmentArray = [
  {
    "id" : 1,
    "name": "소프트웨어융합학과",
    "phoneNumber": "031-000-0000",
    "url": "www.software.hongik.ac.kr",
    "departmentProfileURL": ""
  },
  {
    "id" : 2,
    "name": "소프트웨어융합학과",
    "phoneNumber": "031-000-0000",
    "url": "www.software.hongik.ac.kr",
    "departmentProfileURL": ""
  },
  {
    "id" : 3,
    "name": "소프트웨어융합학과",
    "phoneNumber": "031-000-0000",
    "url": "www.software.hongik.ac.kr",
    "departmentProfileURL": ""
  },
  {
    "id" : 4,
    "name": "소프트웨어융합학과",
    "phoneNumber": "031-000-0000",
    "url": "www.software.hongik.ac.kr",
    "departmentProfileURL": ""
  },
  {
    "id" : 5,
    "name": "소프트웨어융합학과",
    "phoneNumber": "031-000-0000",
    "url": "www.software.hongik.ac.kr",
    "departmentProfileURL": ""
  },

]; */

// ----------------------------------------------------------------------
