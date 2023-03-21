import React, { useState,useEffect } from 'react'
import "./profile.css"
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import axios from 'axios'
import { useParams } from 'react-router'

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const [user, setUser] = useState({});
  // const params = useParams();
  //  console.log(params.username)
  const username = useParams().username;

    useEffect(()=>{

        const fetchUser = async ()=>{
            const res = await axios.get(`/users?username=${username}`)
            setUser(res.data);
          }
          fetchUser();
      },[]) 


  return (
    <>
    <Topbar/>
    <div className="profile">
      <Sidebar/>
      <div className="profileRight">
          <div className="profileRightTop">
              <div className="profileCover">
                <img src={PF+user.coverPicture || PF+"post/3.jpeg"} alt="" className="profileCoverImg" />
                <img src={PF+user.profilePicture || PF+"person/1.jpeg"} alt="" className="profileUserImg" /> 
              </div>
              <div className="profileInfo">
                  <h4 className="profileInfoName">{user.username}</h4>
                  <span className="profileInfoDesc">{user.desc}</span>
              </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username}/>
            <Rightbar user={user} />
          </div>

      </div>
    </div>
    
    </>
  )
}
