import React, { useState, useEffect } from 'react';
import { Table,Button } from '@mantine/core';
import axios from 'axios';

export default function ListExpenseManager() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dataApproved, setDataApproved] = useState([]);

  useEffect(() => {
    fetchData();
    
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get('https://localhost:7171/api/ManagerExpenses/Get');
      fetchDataApproved();
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchDataApproved() {
    try {
      const response = await axios.get('https://localhost:7171/api/ManagerExpenses/GetApproved');
      setDataApproved(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  if (data.length === 0 && dataApproved.length === 0) {
    return <div>No data available</div>;
  }


  async function Save() {
    
            let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://localhost:7171/api/ManagerExpenses/Update',
            headers: { },
            data : data
            };
            try {
                const response = await axios.request(config);
                fetchData();
                fetchDataApproved();
              } catch (error) {
                console.log(error);
              }
  }

   function ApprovedControl(id) {
    data.map((item) => {

        if(item.id === id){
            if(item.approved === true)
                item.approved = false
            else
                item.approved = true
        } 

    })
    

    
  }




  return (
 <div> 
<div>
      <h1>Expenses List</h1>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }} >Expense Number</th>
            <th style={{ textAlign: 'left' }} >Receipt Number</th>
            <th style={{ textAlign: 'left' }} >Description</th>
            <th style={{ textAlign: 'left' }} >Expense Type</th>
            <th style={{ textAlign: 'left' }} >Currency</th>
            <th style={{ textAlign: 'left' }} >Exchange Rate</th>
            <th style={{ textAlign: 'left' }} >Receipt Amount</th>
            <th style={{ textAlign: 'left' }} >Total mount</th>
            <th style={{ textAlign: 'left' }} >Receipt Date</th>
            <th style={{ textAlign: 'left' }} >Approved</th>
            <th style={{ textAlign: 'left' }} >Confirm</th>
            
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td style={{  width : '200px' }} >{item.expenseNumber}</td>
              <td style={{  width : '200px'  }} >{item.receiptNumber}  </td>
              <td style={{  width : '200px' }}  >{item.description} </td>
              <td style={{  width : '200px' }} >{item.expenseType}</td>
              <td style={{  width : '100px' }} >{item.currency}</td>
              <td style={{  width : '200px' }} >{item.exchangeRate}</td>
              <td style={{  width : '200px' }} >{item.receiptAmount}</td>
              <td style={{  width : '200px' }} >{item.totalAmount}</td>
              <td style={{  width : '300px' }} >{item.receiptDate}</td>
              <td style={{  width : '200px' }} >{item.approved.toString()}</td>
              <input
                    type="checkbox"
                    onChange={() => ApprovedControl(item.id)}
                  />               
            </tr>
          ))}
        </tbody>
      </table>
     <br>
     </br> 
      <Button m="5px" onClick={() => { Save() }} > Save </Button>
    </div>
    

    <div>
      <h1>List Approved Expense</h1>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }} >Expense Number</th>
            <th style={{ textAlign: 'left' }} >Receipt Number</th>
            <th style={{ textAlign: 'left' }} >Description</th>
            <th style={{ textAlign: 'left' }} >Expense Type</th>
            <th style={{ textAlign: 'left' }} >Currency</th>
            <th style={{ textAlign: 'left' }} >Exchange Rate</th>
            <th style={{ textAlign: 'left' }} >Receipt Amount</th>
            <th style={{ textAlign: 'left' }} >Total mount</th>
            <th style={{ textAlign: 'left' }} >Receipt Date</th>
            <th style={{ textAlign: 'left' }} >Approved</th>
            
          </tr>
        </thead>
        <tbody>
          {dataApproved.map((item) => (
            <tr key={item.id}>
              <td style={{  width : '200px' }} >{item.expenseNumber}</td>
              <td style={{  width : '200px'  }} >{item.receiptNumber}  </td>
              <td style={{  width : '200px' }}  >{item.description} </td>
              <td style={{  width : '200px' }} >{item.expenseType}</td>
              <td style={{  width : '100px' }} >{item.currency}</td>
              <td style={{  width : '200px' }} >{item.exchangeRate}</td>
              <td style={{  width : '200px' }} >{item.receiptAmount}</td>
              <td style={{  width : '200px' }} >{item.totalAmount}</td>
              <td style={{  width : '300px' }} >{item.receiptDate}</td>
              <td style={{  width : '200px' }} >{item.approved.toString()}</td>

            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  </div> 
   
      
  );
}