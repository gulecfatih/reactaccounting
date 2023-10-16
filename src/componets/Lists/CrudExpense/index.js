import { useState  } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Button, Box,   } from '@mantine/core';


export default function CrudExpense() {
    const [activeTab, setActiveTab] = useState('signin');
    let userId = "";
    const baseUrl = "http://localhost:7171/"
    const axios = require('axios');
  

    
    const form = useForm({
        initialValues: {
          expenseNumber: 0,
          receiptNumber: 0,
          description: "",
          expenseType: "",
          currency: "",
          exchangeRate: 0.1,
          receiptAmount: 0.1,
          totalAmount:0.1,
          receiptDate:"",
          userId:""
        },

        transformValues: (values) => ({
          expenseNumber: `${values.expenseNumber}`,
          receiptNumber: `${values.receiptNumber}`,
          description: `${values.description}`,
          expenseType: `${values.expenseType}`,
          currency: `${values.currency}`,
          exchangeRate: `${values.exchangeRate}`,
          receiptAmount: `${values.receiptAmount}`,
          totalAmount: `${values.totalAmount}`,
          receiptDate: `${values.receiptDate}`,
          userId: `${localStorage.getItem("userId")}`,
        }),
    });
   

      async function Expense(config) {
       

          try {
            const response = await axios.request(config);
                window.alert("Expense Added");
          } catch (error) {
                window.alert("No Expense Added");
          }
      }

    const ExpenseAdd = (values) => {
        
       console.log(values);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://localhost:7171/api/Expenses/Add',
            headers: {
                'Content-Type': 'application/json'
            },
            data: values
        };
        Expense(config);
    }

    return (
                <Box maw={400} mx="auto">
                    <form
                        onSubmit={form.onSubmit((values) => ExpenseAdd(values))}
                    >
                        <TextInput
                            withAsterisk
                            label="Expense Number"
                            placeholder="Expense Number"
                            type="number"
                            {...form.getInputProps('expenseNumber')}
                        />
                        <TextInput
                            withAsterisk
                            label="Receipt Number"
                            placeholder="Receipt Number"
                            mt="md"
                            type="number"
                            {...form.getInputProps('receiptNumber')}
                        />
                        <TextInput
                            withAsterisk
                            label="Description"
                            placeholder="Description"
                            mt="md"
                            {...form.getInputProps('description')}
                        />
                        <TextInput
                            withAsterisk
                            label="Expense Type"
                            placeholder="Expense Type"
                            {...form.getInputProps('expenseType')}
                        />
                        <TextInput
                            withAsterisk
                            label="Currency"
                            placeholder="Currency"
                            mt="md"
                            {...form.getInputProps('currency')}
                        />
                        <TextInput
                            withAsterisk
                            label="Exchange Rate"
                            placeholder="Exchange Rate"
                            mt="md"
                            type="number"
                            step="0.01"
                            {...form.getInputProps('exchangeRate')}
                        />
                        <TextInput
                            withAsterisk
                            label="Receipt Amount"
                            placeholder="Receipt Amount"
                            mt="md"
                            type="number"
                            step="0.01"
                            {...form.getInputProps('receiptAmount')}
                        />
                        <TextInput
                            withAsterisk
                            label="Total Amount"
                            placeholder="Total Amount"
                            mt="md"
                            type="number"
                            step="0.01"
                            {...form.getInputProps('totalAmount')}
                        />
                        <TextInput
                            withAsterisk
                            label="Receipt Date"
                            placeholder="Receipt Date"
                            mt="md"
                            type="date"
                            {...form.getInputProps('receiptDate')}
                        />
                        
                        <Button type="submit" mt="md" >
                            Submit
                        </Button>
                    </form>

                </Box>
           
    );
}