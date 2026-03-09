import React, { useState, useEffect } from "react";

const PaginationExample = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  //Fetch mock data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  //pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <ul>
        {currentPosts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      //pagination Buttons
      <button onClick={() => setCurrentPage(p => Math.max(1, p-1))}>Prev</button>
      <span> Page {currentPage} of {totalPages} </span>
      <button onClick = {() => setCurrentPage(p =>  Math.min(totalPages, p + 1))}>Next</button>
    </div>

  );
};

export default PaginationExample;
