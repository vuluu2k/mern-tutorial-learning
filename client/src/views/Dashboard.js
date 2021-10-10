import React from 'react'
import { Container, Toast } from 'react-bootstrap';
import { useContext,useEffect } from 'react';
import {PostContext} from '../contexts/PostContext'
import {AuthContext} from '../contexts/AuthContext'
import { Spinner } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Button, Row, Col } from 'react-bootstrap';
import ItemPost from '../components/posts/ItemPost';
import AddPostModal from '../components/posts/AddPostModal';
import UpdatePostModal from '../components/posts/UpdatePostModal';
import addIcon from '../assets/plus-circle-fill.svg';
export default function Dashboard() {
    const {postState:{post,posts,postsLoading},getPost,showAddPostModal,setShowAddPostModal,showToast:{show,message}}=useContext(PostContext); 
    const {authState:{user:{username}}}=useContext(AuthContext);
    // Start get Post
    useEffect(()=>getPost(),[]);
    let body = null;
    if(postsLoading){
        body=(
            <div className="spinner-container">
                <Spinner animation="border" variant='info' />
            </div>
        )
    }else if(posts.length===0){
        body=(
            <>
                <Card className="text-center mx-5 my-5">
                    <Card.Header as='h1'>Hi {username} </Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to LearnIT</Card.Title>
                        <Card.Text>
                            Click the below to track your first skill to learn
                        </Card.Text>
                        <Button variant='primary' onClick={()=>setShowAddPostModal(true)}>LearnIT!</Button>
                    </Card.Body>
                </Card>
            </>
        )
    }else {
        body=(
            <>
                <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                    {posts.map(post=>(
                        <Col key={post._id} className='my-2'>
                            <ItemPost post={post} />
                        </Col>
                    ))}
                </Row>
                {/* {Open Add Post Modal} */}
                <Button className='btn-floating' onClick={()=>setShowAddPostModal(true)}>
                    <img src={addIcon} alt="add" width='50' height='50' />
                </Button>
            </>
        )
    }
    return (
        <Container>
            {body}
            <AddPostModal showAddPostModal={showAddPostModal} setShowAddPostModal={setShowAddPostModal}/>
            {post!==null&&<UpdatePostModal />}
            <Toast show={show} style={{position:'fixed',top:'20%',right:'10px'}} className='bg-success text-white'>
                <Toast.Body>
                    <strong>{message}</strong>
                </Toast.Body>
            </Toast>
        </Container>
    )
}
