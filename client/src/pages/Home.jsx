import React, { useEffect, useState } from 'react'
import { Card, Loader, FormField } from "../components"
const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          const result = await response.json();
          console.log({ result })
          setPosts(result.data.reverse())
        }
      } catch (error) {
        alert(error)
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, [])

  const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return data.map((item) => <Card key={item._id} {...item} />)
    }
    return <h2 className='text-lg mt-4'>{title}</h2>
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchInput(e.target.value);
    setSearchTimeout(setTimeout(() => {
      const searchResults = posts.filter((post) => post.name.toLowerCase().includes(searchInput.toLowerCase()) || post.prompt.toLowerCase().includes(searchInput.toLowerCase()));
      setSearchResults(searchResults);
    }, 500))
  }
  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-bold text-3xl'>The community Showcase</h1>
        <p className="text-[16px] mt-2 text-gray-400 max-w-2xl">Bring your imagination to life With pillu</p>
      </div>
      <div className="mt-16">
        <FormField
          labelName={"Search Posts"}
          type="text"
          name="text"
          placeholder={"Search posts"}
          value={searchInput}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {
          isLoading ? <div className="flex items-center justify-center">
            <Loader />
          </div>
            :
            <>
              {searchInput && <div className="mt-6">
                <p className='text-lg font-semibold text-gray-400'>Showing search result for <span className='font-medium text-black'>{searchInput}</span></p>
              </div>
              }
              <div className="mt-6 grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-3">
                {searchInput ? <RenderCards data={searchResults} title={"No search result found."} /> : <RenderCards data={posts} title={"No post found"} />}
              </div></>
        }
      </div>
    </section>
  )
}

export default Home