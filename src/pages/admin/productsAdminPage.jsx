import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

export default function ProductsAdminPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-gray-100 p-6">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Product ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Labelled Price</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Stock</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-lg shadow"
                      />
                    </td>
                    <td className="p-4">{product.productId}</td>
                    <td className="p-4 font-medium text-gray-700">
                      {product.name}
                    </td>
                    <td className="p-4 text-green-600 font-semibold text-center">
                      LKR {product.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        })}
                    </td>
                    <td className="p-4 line-through text-gray-500 text-center">
                      LKR {product.labelledPrice}
                    </td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4">{product.stock}</td>
                    <td className="p-4 flex justify-center items-center gap-3">
                      <BiTrash
                        className="bg-red-500 text-white text-2xl p-2 rounded-full cursor-pointer hover:bg-red-600 transition"
                        onClick={() => {
                          const token = localStorage.getItem("token");
                          if (token == null) {
                            toast.error("Please login first");
                            navigate("/login");
                            return;
                          }
                          axios
                            .delete(
                              import.meta.env.VITE_BACKEND_URL +
                                "/api/products/" +
                                product.productId,
                              {
                                headers: {
                                  Authorization: "Bearer " + token,
                                },
                              }
                            )
                            .then((res) => {
                              toast.success("Product deleted successfully");
                              setIsLoading(!isLoading);
                            })
                            .catch((error) => {
                              toast.error("Failed to delete the product");
                            });
                        }}
                      />
                      <BiEdit
                        onClick={() => {
                          navigate("/admin/updateProduct", {
                            state: product,
                          });
                        }}
                        className="bg-blue-500 text-white text-2xl p-2 rounded-full cursor-pointer hover:bg-blue-600 transition"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <Link
        to="/admin/newProduct"
        className="fixed bottom-10 right-10 flex items-center justify-center w-14 h-14 rounded-full bg-green-700 text-white shadow-2xl hover:bg-green-800 transition"
      >
        <BiPlus className="text-3xl" />
      </Link>
    </div>
  );
}
