"use client";

//add the Search feature and the filter by clicking Tag here and 
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
const [searchActive, setSearchActive] = useState('false');
const [dataFiltered, setDataFiltered] = useState('');
const [posts, setPosts] = useState([])

const handleSearchChange = (e) => {
  e.preventDefault();
  setSearchText(e.target.value);

  try {
    const filteredPosts = posts.filter((post) => {
      return post.prompt.includes(searchText);
    });

    if (searchActive) {
      setPosts(filteredPosts);
    }
  } catch (error) {
    console.log(error);
  }
};


useEffect(() => {
  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();

    if (searchActive) {
      setPosts(data.filter((post) => {
        return post.prompt.includes(searchText) || post.id == searchText || post.tag == searchText.slice(1) ? post.prompt : null;
      }));
    }
  };

  fetchPosts();
}, [searchActive, searchText]);

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

      <PromptCardList  
      data={posts}
      handleTagClick={() => {}}

      />
    </section>
  )
}

export default Feed