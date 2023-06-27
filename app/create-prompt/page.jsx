'use client';

import {useState} from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';
import { loadGetInitialProps } from 'next/dist/shared/lib/utils';

const CreatePrompt = () => {

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
    const { data: session} = useSession();

    const createPrompt = async (e) => {

        console.log("sono in createPrompt----------------------");
        e.preventDefault();
        setSubmitting(true);
        console.log("ora submitting=",submitting);
        try {
            console.log("Sono in try prompt=",post.prompt,"tag=",post.tag);
            const response = await fetch('/api/prompt/new',{
                    method: 'POST',
                    body: JSON.stringify({
                        prompt: post.prompt,
                        userId: session?.user.id,
                        tag: post.tag
                    })
                })

            console.log("response=", response);
            console.log("response.ok=",response.ok,"----------");

            if (response.ok) {
                router.push('/')
            } else {
                console.log("ERROR creating the NEW post !",response.status,response.statusText);
                setError({
                    message: 'ERROR creating the NEW post !',
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
        type='create'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
        error={error}
    />
  )
}

export default CreatePrompt