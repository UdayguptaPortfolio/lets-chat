import React, { useState } from 'react';
import {Button, Form} from 'semantic-ui-react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks'
import {useForm} from '../utility/hooks'
import{useNavigate} from 'react-router-dom'
function Login(props){
    const navigate = useNavigate();
    const[errors,setErrors]=useState({})
    
    const{onChange,onSubmit,values}=useForm(loginUserCallback,{
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    })

    const [loginUser,{loading}]=useMutation(LOGIN_USER,{
        update(_,result){
            console.log(result);
            //props.history.push('/')
            navigate('/');
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables:values
    });
    function loginUserCallback(){
        loginUser()
    }
    return(
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ?"loading":''}>
                <h1>Login</h1>
                <Form.Input
                label="username"
                placeholder="Username.."
                name="username"
                type='text'
                value={values.username}
                error={errors.username?true:false}
                onChange={onChange}
                />
                {/* <Form.Input
                label="Email"
                placeholder="Email..."
                name="email"
                type='email'
                value={values.email}
                error={errors.email?true:false}
                onChange={onChange}
                /> */}
                <Form.Input
                label="Password"
                placeholder="Password..."
                name="password"
                type='password'
                value={values.password}
                error={errors.password?true:false}
                onChange={onChange}
                />
                <Form.Input
                label="Confirm Password"
                placeholder="Confirm Password.."
                name="confirmPassword"
                type='password'
                value={values.confirmPassword}
                error={errors.confirmPassword?true:false}
                onChange={onChange}
                />
                <Button type="submit" primary>
                    Login
                </Button>
            </Form>
            {Object.keys(errors).length>0&&(
                <div className='ui error message'>
                <ul className='list'>
                    {Object.values(errors).map(value=>{
                        <li key={value}>{value}</li>
                    })}
                </ul>
            </div>
            )}
        </div>
    )
}

const LOGIN_USER=gql`
mutation login(
    $username:String!
    $password:String!
    ){
        login(
                username:$username
                password:$password
        ){
            id email username createdAt token
        }
    }
`
export default Login;