'use client'

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({data,handleTagClick}) => {

  //console.log("PromptCardList data=",data);

  return (
    <div className="mt-16 prompt_layout">
        {
          data.map( prompt => (
            <PromptCard 
                key={prompt._id}
                prompt={prompt}
                handleTagClick={handleTagClick}
            />
          ))
        }
    </div>
  )
}

const Feed = () => {

  const [searchText,setSearchText] = useState('');
  const [allPrompts,setAllPrompts] = useState([]);
  const [searchedPrompts,setSearchedPrompts] = useState([]);

  const handleSearchChange = (e) => {

    setSearchText(e.target.value);

    const searchResult = filterPrompts(e.target.value);

    //console.log("searchResult=",searchResult);

    setSearchedPrompts(searchResult);

  }

  const filterPrompts = (search) => {
      //console.log("filterPrompts searchText=",search)
      const regex = new RegExp(search,"i");
      return allPrompts.filter(
        (item) => 
                regex.test(item.creator.username) ||
                regex.test(item.prompt) ||
                regex.test(item.tag)         
      )
  }

  const handleTagClick = (tag) => {

    //console.log("TAG=",tag);

    //const promptList = allPrompts.filter( prompt => prompt.tag === tag);
    //setSearchedPrompts(promptList);
    setSearchText(tag);

    //console.log("handleTagClick searchText=",searchText);

    const searchResult = filterPrompts(tag);

    //console.log("searchResult=",searchResult);

    setSearchedPrompts(searchResult);
  }

  useEffect( () => {

    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setAllPrompts(data);
    }

    fetchPosts();
    //console.log("USEEFFECT allPrompts=",allPrompts);

  },[]);

  return (
    <section className="feed" >
      <form className="relative w-full flex-center">
        <input 
          id="search"
          type="text" 
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      { searchText.length === 0 ? 
        (<PromptCardList 
          data={allPrompts}
          handleTagClick = { handleTagClick }
        />
        ):(
        <PromptCardList 
          data={searchedPrompts}
          handleTagClick = { handleTagClick }
        />
        )
      }
      
    </section>
  )
}

export default Feed