 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 

import './PubPosts.css'
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import PostOption from '../Modal/PostOption/PostOption';
import { useSelector } from 'react-redux';
import PostContact from './PostContact/PostContact';




const PubPost = (props) => {
    const { id, post} = props
    const [modalOption, setModalOption] = useState(false)
    const currentUser = useSelector(state => state.auth.login?.currentUser )

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

        const date = post.createdAt.split('T')[0].split('-')
        const time = post.createdAt.split('T')[1].split(':')
        const today = new Date()
        var timer
        const postTime = {
            year: Number(date[0]),
            month: Number(date[1]),
            date: Number(date[2]),
            hour: Number(time[0]) + 7,
            min: Number(time[1]),
        }
        const currentTime = {
            year: today.getFullYear(),
            month: today.getMonth()+1,
            date: today.getDate(),
            hour: today.getHours(),
            min: today.getMinutes(),
        }

        if(postTime.year !== currentTime.year){
            timer = `${currentTime.year - postTime.year} year`
            
        } 
        else if(postTime.month !== currentTime.month){
            timer =  `${postTime.date} ${monthNames[postTime.month-1]}`
        } 
        else if(postTime.date !== currentTime.date){
            let tmp = currentTime.date - postTime.date
            tmp > 1 ?  timer = `${currentTime.date - postTime.date} days`
            :timer = `${currentTime.date - postTime.date} day`
        }
        else if(postTime.hour !== currentTime.hour){
            let tmp = currentTime.hour - postTime.hour
            tmp > 1 ?  timer = `${currentTime.hour - postTime.hour} hours`
            :timer = `${currentTime.hour - postTime.hour} hour`
        }
        else if(postTime.min !== currentTime.min){
            let tmp = currentTime.min - postTime.min
            tmp > 1 ?  timer = `${currentTime.min - postTime.min} mins`
            :timer = `${currentTime.min - postTime.min} min`
        }
        else {
            timer = 'Just now'
        }


    const handleOptionClick = () => {
        setModalOption(true)
    }
    
    return ( 

        <div className="PubPost" key={id}>

        { modalOption && <PostOption post={post} setModalOption={setModalOption}/>}
            <header className="PubPost_header">
                <a href={`/Profile/${post?.userId}`} className="PubPost_header-user-info" >
                    <img className="PubPost_header-avatar" src={post?.avatarUrl} alt='avatar'/>
                    <div className="PubPost_header-name-wrapper">
                        <p className="PubPost_header-name">{post?.name}</p>
                        <div className="PubPost_header-timer">{timer}</div>
                    </div>
                </a>
                
            {currentUser?._id === post?.userId && 
                <FontAwesomeIcon 
                    className='PubPost_header-option-icon' 
                    icon={faEllipsis} 
                    onClick={handleOptionClick}
                />
            }
            </header>

            {post.postText && 
                <div className="PubPost_footer-des-block">
                    <p className="PubPost_footer-des">
                        {post.postText}
                    </p>
                </div>
                }
             {post.imgUrl && <img src={post.imgUrl} alt="" className="PubPost_content-img" />}

            <div className='PubPost_footer'>
                    <PostContact post={post}/>
             
            </div>


        </div>
    );
}
 
export default PubPost;