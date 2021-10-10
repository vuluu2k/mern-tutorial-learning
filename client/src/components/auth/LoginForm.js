import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';
import {useState,useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

export default function LoginForm() {
    // context
    const {loginUser}=useContext(AuthContext);
    // Local State
    const [loginForm,setLoginForm]=useState({
        username:'',
        password:''
    });
    const [alert,setAlert]=useState(null);
    const {username,password}=loginForm;
    const onChangeLoginForm=(event)=>setLoginForm({
        ...loginForm,
        [event.target.name]:event.target.value
    });
    const login = async (event)=>{
        event.preventDefault();
        try {
            const loginData=await loginUser(loginForm);
            if(loginData.success){
                // history.push('/dashboard');
            }else{
                setAlert({type:'danger',message:loginData.message});
                setTimeout(()=>setAlert(null), 3000);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Form className="mb-4" onSubmit={login}>
                <Form.Group className="mb-2">
                    <Form.Control type='text' placeholder='Username' name='username' required value={username} onChange={onChangeLoginForm}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Control type='password' className="mb-2"  placeholder='Password' name='password' required value={password} onChange={onChangeLoginForm}></Form.Control>
                    <AlertMessage info={alert}/>
                </Form.Group>
                <Button variant='success' type='submit'>Login</Button>
            </Form>
            <p>Don't have an Account? 
                <Link to='/register'>
                    <Button variant='info' size='sm' className='ml-2'>Resgister</Button>
                </Link> 
            </p>
        </>
    )
}
