import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchProductsFetch } from "../features/products/searchAPI";
import ProductCard from "../features/products/ProductCard";
import { addToCart } from "../features/cart/cartSlice";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setProducts([]);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const results = await searchProductsFetch(query);
        setProducts(results);
      } catch (err) {
        setError("Failed to fetch search results");
        console.error("Search error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleAddToCart = ({ productId, quantity }) => {
    dispatch(addToCart({ productId, quantity }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Search Results
        </h1>
        {query && (
          <p className="text-gray-600">
            {isLoading
              ? "Searching..."
              : products.length > 0
              ? `Found ${products.length} result${products.length > 1 ? "s" : ""} for "${query}"`
              : `No results found for "${query}"`}
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Searching products...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              item={product}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No products found matching your search.</p>
          <Link
            to="/"
            className="text-amber-700 hover:text-amber-800 underline"
          >
            Browse all products
          </Link>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Enter a search term to find products.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;


