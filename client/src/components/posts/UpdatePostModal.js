import React from 'react'
import { Modal, Container,Button,Form } from 'react-bootstrap';
import {useState,useContext,useEffect} from 'react';
import {PostContext} from '../../contexts/PostContext';

export default function UpdatePostModal() {
    const {postState:{post},updatePost,showUpdatePostModal,setShowUpdatePostModal,setShowToast}=useContext(PostContext);
    const [updatedPost,setUpdatedPost]=useState(post);
    useEffect(()=>setUpdatedPost(post),[post]);
    const {title,description,url,status}=updatedPost;
    const onChangUpdatePostForm= event=>setUpdatedPost({
        ...updatedPost,
        [event.target.name]:event.target.value,
    })
    const onSubmit= async event=>{
        event.preventDefault();
        const {success, message}=await updatePost(updatedPost);
        setShowToast({show:success,message});
        setTimeout(()=>setShowToast({show:false,message:''}),3000);
        resetDataForm();
    }
    const resetDataForm=()=>{
        setUpdatedPost(post);
        setShowUpdatePostModal(false);
    }
    return (
        <Modal show={showUpdatePostModal} onHide={resetDataForm}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    What do you want to learn
                </Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>
                    <Container>
                        <Form.Group className="mb-2">
                            <Form.Control type='text' placeholder='title' onChange={onChangUpdatePostForm} value={title} name='title' required aria-describedby='title-help'  />
                            <Form.Text id='title-help' muted>Required</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Control as='textarea' placeholder='Description' onChange={onChangUpdatePostForm} value={description} name='description' />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Control type='text' placeholder='Youtube Tutorial url' onChange={onChangUpdatePostForm} value={url} name='url' />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Control as='select' onChange={onChangUpdatePostForm} value={status} name='status'>
                                <option value="TO LEARN">TO LEARN</option>
                                <option value="LEARNING">LEARNING</option>
                                <option value="LEARNED">LEARNED</option>
                            </Form.Control>
                        </Form.Group>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={resetDataForm}>Cancel</Button>
                    <Button variant='primary' type='submit' onClick={onSubmit}>LearnIt</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
