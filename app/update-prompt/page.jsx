'use client';

import {useState , useEffect} from 'react'

import { useRouter , useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const EditPrompt = () => {

    const [submitting,setSubmitting] = useState(false)

    const [post , setPost] = useState({
        prompt: '',
        tag: ''
    })

    const [error , setError] = useState({
        message: '',
        code: '',
        text: ''
    })

    const router = useRouter();
    
    const searchParams = useSearchParams();

    const promptId = searchParams.get('id');

    useEffect( () => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }

        if (promptId) getPromptDetails();

    },[promptId])

    const updatePrompt = async (e) => {

        console.log("sono in editPrompt----------------------");

        if (!promptId) return alert ('Prompt Id NOT found');

        e.preventDefault();
        setSubmitting(true);
        //console.log("ora submitting=",submitting);
        try {
            //console.log("Sono in try prompt=",post.prompt,"tag=",post.tag);
            const response = await fetch( `/api/prompt/${promptId}`,{
                    method: 'PATCH',
                    body: JSON.stringify({
                        prompt: post.prompt,
                        tag: post.tag
                    })
                })

            //console.log("response=", response);
            //console.log("response.ok=",response.ok,"----------");

            if (response.ok) {
                router.push('/')
            } else {
                console.log("ERROR updating the post !",response.status,response.statusText);
                setError({
                    message: 'ERROR updating the post !',
                    code: response.status,
                    text: response.statusText
                })
            }

        } catch(err) {
            console.log("ERROR creating the NEW post !",err);
        } finally {
            setSubmitting(false);
        }
    }


  return (
    <Form 
        type='edit'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
        error={error}
    />
  )
}

export default EditPrompt