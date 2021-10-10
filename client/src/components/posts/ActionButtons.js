import { Button } from 'react-bootstrap';
import playIcon from '../../assets/play-btn.svg';
import editIcon from '../../assets/pencil.svg';
import delIcon from '../../assets/trash.svg';
import React from 'react';
import {PostContext} from '../../contexts/PostContext';
import {useContext} from 'react';


export default function ActionButtons({url,_id}) {
    const {delPost,findPost,setShowUpdatePostModal} = useContext(PostContext);
    const choosePost=(postId)=>{
        findPost(postId);
        setShowUpdatePostModal(true);
    }
    return (
        <>
            <Button className="post-button" href={url} target='_blank'>
                <img src={playIcon} alt="play" with='32' height='32'/>
            </Button>
            <Button className="post-button" onClick={()=>choosePost(_id)}>
                <img src={editIcon} alt="edit" with='24' height='24'/>
            </Button>   
            <Button className="post-button" onClick={()=>delPost(_id)}>
                <img src={delIcon} alt="del" with='24' height='24'/>
            </Button>     
        </>
    )
}
