import { useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Button, Box, Code, Tabs,Select } from '@mantine/core';
import { useRouter } from 'next/router';

export default function RegisterModal() {
    const [activeTab, setActiveTab] = useState('signin');
    const [submittedValues, setSubmittedValues] = useState('');
    const [submittedSignIn, setSubmittedSignIn] = useState('');
    const baseUrl = "http://localhost:7171/"
    const router = useRouter();
    const axios = require('axios');
    const roles = ['Manager', 'Accountant', 'Salesperson'];
    let role=null;
    const form = useForm({
        initialValues: {
            name: '',
            surName: '',
            userName: '',
            email: "",
            password: "",
            roleName:""
        },

        transformValues: (values) => ({
            name: `${values.name}`,
            surName: `${values.surName}`,
            userName: `${values.userName}`,
            email: `${values.email}`,
            password: `${values.password}`,
            roleName: `${values.roleName}`,
        }),
    });

    async function SignUpData(config) {
        try {
            const response = await axios.request(config);
            window.alert("The User Was Created");
            setActiveTab("signup");
        } catch (error) {
            window.alert("User Could not be Created");
        }
      }

    const SignUp = (values) => {
        // Kullanıcı üye olunca
       
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://localhost:7171/api/Auth/add',
            headers: {
                'Content-Type': 'application/json'
            },
            data: values
        };
        SignUpData(config)
    }


    const SignIn = useForm({
        initialValues: {
            email: '',
            password: ""
        },

        transformValues: (values) => ({
            email: `${values.email}`,
            password: `${values.password}`,

        }),
    });

    async function UserIdFind() {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://localhost:7171/api/Auth/TokenWithUserId?token='+(localStorage.getItem('token'))+'',
            headers: { }
          };
          try {
            const response = await axios.request(config);
            localStorage.setItem("userId",response.data);
            if(localStorage.getItem('token') !== ""){
                if(localStorage.getItem('role') === "Salesperson"){
                    router.push("/Home");
                }
                else if(localStorage.getItem('role') === "Manager"){
                    router.push("/Home1");x
                }
                    
                else if(localStorage.getItem('role') === "Accountant"){
                    router.push("/Home2")
                }
            }

          } catch (error) {
              console.log(error);
          }
      }

    async function RolesFind() {
        role="";
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://localhost:7171/api/Auth/TokenWithRole?token='+(localStorage.getItem('token'))+'',
            headers: { }
          };
          try {

            const response = await axios.request(config);
            localStorage.setItem("role",response.data);
            UserIdFind()
          

          } catch (error) {
              console.log(error);
          }
          
        }

    async function SignInData(config) {
        try {
          const response = await axios.request(config);
          
          localStorage.setItem('token', response.data);
          RolesFind();
        } catch (error) {
            window.alert("The Username Or Password Is Incorrect");
        }

      }

    const  SignInFunction = (values) => {
        //login
        localStorage.setItem('role', "");
        localStorage.setItem('userId', "");
        localStorage.setItem('token', "");
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://localhost:7171/api/Auth/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: values
        };
            SignInData(config);
             
    }
    
    return (

        <Tabs value={activeTab} onTabChange={setActiveTab}>
            <Tabs.List position="right" >
                <Tabs.Tab value="signin" >Sign In</Tabs.Tab>
                <Tabs.Tab value="signup">Sign Up</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="signin" pt="xs">

                <Box maw={400} mx="auto">
                    <form
                        onSubmit={form.onSubmit((values) => SignUp(values))}
                    >
                        <TextInput
                            withAsterisk
                            label="Name"
                            placeholder="Name"
                            {...form.getInputProps('name')}
                        />
                        <TextInput
                            withAsterisk
                            label="SurName"
                            placeholder="SurName"
                            mt="md"
                            {...form.getInputProps('surName')}
                        />
                        <TextInput
                            withAsterisk
                            label="UserName"
                            placeholder="userName"
                            mt="md"
                            {...form.getInputProps('userName')}
                        />
                        <TextInput
                            withAsterisk
                            label="Email"
                            placeholder="your@email.com"
                            {...form.getInputProps('email')}
                        />
                        <TextInput
                            withAsterisk
                            label="Password"
                            placeholder="Password"
                            mt="md"
                            {...form.getInputProps('password')}
                        />
                        <Select data={roles} 
                        withAsterisk
                        label="Roles"
                        placeholder="Manager"
                        mt="md"
                        {...form.getInputProps('roleName')}
                         />

                        <Button type="submit" mt="md"
                         >
                            Submit
                        </Button>
                    </form>

                    {submittedValues && <Code block>{submittedValues}</Code>}
                </Box>
            </Tabs.Panel>

            <Tabs.Panel value="signup" pt="xs">

                <Box maw={400} mx="auto">
                    <form
                        onSubmit={SignIn.onSubmit((values) => SignInFunction(values))}
                    >
                        <TextInput
                            withAsterisk
                            label="Email"
                            placeholder="Email"
                            {...SignIn.getInputProps('email')}
                        />
                      <TextInput
                          withAsterisk
                          label="Password"
                          placeholder="Enter your password"
                          mt="md"
                          type="password"
                          {...SignIn.getInputProps('password')}
                        />
                        <Button type="submit" mt="md" >
                            Login
                            </Button>

                    </form>

                    {submittedSignIn && <Code block>{submittedSignIn}</Code>}
                </Box>
            </Tabs.Panel>


        </Tabs>

    );
}