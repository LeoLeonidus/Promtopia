'use client'

import {useState,useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {

    const [prompts,setPrompts] = useState([]);

    const {data: session} = useSession();
    const router = useRouter();

    console.log("SESSION=",session,"--------");

    useEffect( () => {

        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`)
          const data = await response.json()
          setPrompts(data);
        }
        
        if ( session?.user.id ) {
            fetchPosts();
        }
      },[]);

    const handleEdit = (prompt) => {
      console.log("EDIT prompt",prompt);
      router.push(`/update-prompt?id=${prompt._id}`)

    }

    const handleDelete = async (prompt) => {
      console.log("DELETE prompt",prompt);
      const hasConfirmed = confirm("Are you shure you want to delete this promp ?");

      if (hasConfirmed) {
        try {
              const response = await fetch(`/api/prompt/${prompt._id.toString()}` , {
                                      method: 'DELETE'
                                      })
              if (response.ok) {
              alert("prompt deleted");
              
              const filteredPrompts = prompts.filter( p => p._id !== prompt._id );

              setPrompts(filteredPrompts)
              } else {
                alert ("prompt NOT DELETED !")
              }
        } catch (error) {
          console.log(error);
        }

      }
    }

  return (
    <Profile 
        name={session?.user.name}
        desc="Welcome to your profile page"
        data={prompts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile