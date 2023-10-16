import React, { useState, useEffect } from 'react';
import { Table } from '@mantine/core';
import axios from 'axios';

export default function ListExpense() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get('https://localhost:7171/api/Expenses/Get?UserId='+localStorage.getItem("userId")+'');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    
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
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td style={{  width : '200px' }} >{item.expenseNumber}</td>
              <td style={{  width : '200px'  }} >{item.receiptNumber}  </td>
              <td style={{  width : '200px' }}  >{item.description} </td>
              <td style={{  width : '200px' }} >{item.expenseType}</td>
              <td style={{  width : '200px' }} >{item.currency}</td>
              <td style={{  width : '200px' }} >{item.exchangeRate}</td>
              <td style={{  width : '200px' }} >{item.receiptAmount}</td>
              <td style={{  width : '200px' }} >{item.totalAmount}</td>
              <td style={{  width : '200px' }} >{item.receiptDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
}