const PostDetail = ({ post }) => {
    if (!post) return <div className="p-8">Loading...</div>;
  
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-700 mb-6">{post.body}</p>
  
        <div className="text-sm text-gray-500">
           Reactions: {post.reactions?.likes}
        </div>
      </div>
    );
  };
  
  export default PostDetail;