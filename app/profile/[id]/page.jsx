"use client"


import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const OtherProfile = () => {
    const router = useRouter();

const [posts, setPosts] = useState([]);

useEffect(() => {
    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${user.id}/posts`);
        const data = await response.json();
    
        setPosts(data);
    }


        if(user.id) fetchPosts();
    }, [])    

  return (
    <Profile 
    name={user.id}
    desc= {`Welcome to ${user.id} page`}
    data={posts}
        />


  )
}

export default OtherProfile