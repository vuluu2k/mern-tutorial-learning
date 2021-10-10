import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';
import {useContext,useState} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

export default function RegisterForm() {
    // context
    const {registerUser}=useContext(AuthContext);
    // Local State
    const [registerForm,setRegisterForm]=useState({
        username:'',
        password:'',
        confirmPassword:''
    });
    const [alert,setAlert]=useState(null);
    const {username,password,confirmPassword}=registerForm;
    const onChangeRegisterForm=(event)=>setRegisterForm({
        ...registerForm,
        [event.target.name]:event.target.value
    });
    const register = async (event)=>{
        event.preventDefault();
        if(password!==confirmPassword){
            setAlert({type:'danger',message:'Password do not match'});
            setTimeout(()=>setAlert(null), 3000);
            return;
        }
        try {
            const registerData=await registerUser(registerForm);
            if(registerData.success){
                
            }else{
                setAlert({type:'danger',message:registerData.message});
                setTimeout(()=>setAlert(null), 3000);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Form className="mb-4" onSubmit={register}>
                <AlertMessage info={alert}/>
                <Form.Group className="mb-2">
                    <Form.Control type='text' placeholder='Username' name='username' value={username} onChange={onChangeRegisterForm} required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Control type='text' placeholder='Password' name='password' value={password} onChange={onChangeRegisterForm} required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Control type='text' placeholder='Confirm Password' name='confirmPassword' value={confirmPassword} onChange={onChangeRegisterForm} required></Form.Control>
                </Form.Group>
                <Button variant='success' type='submit'>Register</Button>
            </Form>
            <p>Already have an Account? 
                <Link to='/login'>
                    <Button variant='info' size='sm' className='ml-2'>Login Now!</Button>
                </Link> 
            </p>
        </>
    )
}
