'use client'

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({data,handletagClick}) => {

  return (
    <div className="mt-16 prompt_layout">
        {
          data.map( prompt => (
            <PromptCard 
                key={prompt._id}
                prompt={prompt}
                handletagClick={handletagClick}
            />
          ))
        }
    </div>
  )
}

const Feed = () => {

  const [searchText,setSearchText] = useState('');
  const [prompts,setPrompts] = useState([]);

  const handleSearchChange = (e) => {

  }

  useEffect( () => {

    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPrompts(data);
    }

    fetchPosts();

  },[]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text" 
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList 
          data={prompts}
          handletagClick = { () => {} }
      />
    </section>
  )
}

export default Feed