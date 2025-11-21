import React from "react";

const SellerProductList = ({ products, isLoading, onEdit, onDelete, onCreate }) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Products</h2>
        <button
          onClick={onCreate}
          className="px-6 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800"
        >
          Add New Product
        </button>
      </div>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-amber-700">
                    ${product.price}
                  </span>
                  <span className="text-sm text-gray-600">
                    Stock: {product.stock}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product._id)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 mb-4">No products yet</p>
          <button
            onClick={onCreate}
            className="px-6 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800"
          >
            Create Your First Product
          </button>
        </div>
      )}
    </div>
  );
};

export default SellerProductList;

