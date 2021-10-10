import React from 'react'
import { Modal, Container,Button,Form } from 'react-bootstrap';
import {useState,useContext} from 'react';
import {PostContext} from '../../contexts/PostContext';

export default function AddPostModal({showAddPostModal,setShowAddPostModal}) {
    const {addPost,setShowToast}=useContext(PostContext);
    const [newPost,setNewPost]=useState({
        title:'',
        description:'',
        url:'',
        status:'TO LEARN'
    })
   
    const {title,description,url}=newPost;
    const onChangNewPostForm= event=>setNewPost({
        ...newPost,
        [event.target.name]:event.target.value,
    })
    const onSubmit= async event=>{
        event.preventDefault();
        const {success, message}=await addPost(newPost);
        setShowToast({show:success,message});
        setTimeout(()=>setShowToast({show:false,message:''}),3000);
        resetAddPostData();
    }
    const resetAddPostData=()=>{
        setNewPost({
            title:'',
            description:'',
            url:'',
            status:'TO LEARN'
        })
        setShowAddPostModal(false);
    }
    return (
        <Modal show={showAddPostModal} onHide={resetAddPostData}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    What do you want to learn
                </Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>
                    <Container>
                        <Form.Group className="mb-2">
                            <Form.Control type='text' placeholder='title' onChange={onChangNewPostForm} value={title} name='title' required aria-describedby='title-help'  />
                            <Form.Text id='title-help' muted>Required</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Control as='textarea' placeholder='Description' onChange={onChangNewPostForm} value={description} name='description' />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Control type='text' placeholder='Youtube Tutorial url' onChange={onChangNewPostForm} value={url} name='url' />
                        </Form.Group>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={resetAddPostData}>Cancel</Button>
                    <Button variant='primary' type='submit' onClick={onSubmit}>LearnIt</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
