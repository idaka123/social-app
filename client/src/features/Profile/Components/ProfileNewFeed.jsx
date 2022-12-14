import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import PubPost from "../../../Components/PubPosts/PubPosts"
// import { ReduxStorePost } from "../../redux/requestApi"


const ProfileNewFeed = (props) => {
    const { user  } = props
    // const [data, setData] = useState([])
    const reduxPosts = useSelector(state => state.post.posts)

    // useEffect(() => {
    //     setData(posts)
    // }, []) 
    // console.log(`${user.info.name}: `, reduxPosts);

    useEffect(() => {
        console.log('redux state change: ', reduxPosts);
    }, [reduxPosts])

    return (
       <div>
           {
            reduxPosts.map((post) => {
                return (
                    post && <PubPost key={post._id} post={post} /> 
                )
            })
        
            }
            
       </div>
    )
}
 
export default ProfileNewFeed;