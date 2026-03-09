const RecipeDetail = ({ recipe }) => {
    if (!recipe) return <div className="p-8">Loading...</div>;
  
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-72 object-cover rounded-xl mb-6"
        />
  
        <h1 className="text-3xl font-bold mb-2">{recipe.name}</h1>
        <p className="text-gray-500 mb-4">Cuisine: {recipe.cuisine}</p>
  
        <h2 className="font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc pl-6 mb-6">
          {recipe.ingredients?.map((ing, i) => <li key={i}>{ing}</li>)}
        </ul>
  
        <h2 className="font-semibold mb-2">Instructions</h2>
        <p className="whitespace-pre-line">{recipe.instructions}</p>
      </div>
    );
  };
  
  export default RecipeDetail;