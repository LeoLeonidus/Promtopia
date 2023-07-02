'use client'

import {useState,useEffect} from 'react';

import { useRouter , useSearchParams} from 'next/navigation';

import Profile from '@components/Profile';

const OthersProfile = () => {

    const searchParams = useSearchParams();

    const userId = searchParams.get('id');
    const userName = searchParams.get('userName');

    console.log("OthersProfile  userId=",userId);

    const [prompts,setPrompts] = useState([]);

    const router = useRouter();

    useEffect( () => {

        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${userId}/posts`)
          const data = await response.json()
          setPrompts(data);
        }
        
        if ( userId ) {
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
        name={userName}
        desc="This is the list of your prompt"
        data={prompts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default OthersProfile