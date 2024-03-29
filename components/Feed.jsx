"use client";


// add look at other profiles creating a new folder [id] and page in profile

import { useState, useEffect} from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
          <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {

const [searchText, setSearchText] = useState('');
const [posts, setPosts] = useState([]);
const [searchedResults, setSearchedResults] = useState([]);
const [searchTimeout, setSearchTimeout] = useState(null);

const handleSearchChange = (e) => {
  clearTimeout(searchTimeout);
  setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
};


    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const word = searchtext.toLowerCase()
    return posts.filter(
      (item) =>
        item.creator.username == word ||
        item.tag == word ||
        item.prompt.toLowerCase().includes(word)
    );
  };

    const handleTagClick = (tagName) => {
      setSearchText(tagName);

      const searchResult = filterPrompts(tagName);
      setSearchedResults(searchResult);
    }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
        type='text'
        placeholder='Search for a tag or username'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer'
        />
      </form>
    {searchText ? (
      <PromptCardList  
      data={searchedResults}
      handleTagClick={handleTagClick}
      />
) : (
    <PromptCardList 
    data={posts} 
    handleTagClick = {handleTagClick} 
    />
)}
      
    </section>
  )
}

export default Feed