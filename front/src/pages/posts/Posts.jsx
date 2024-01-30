import { useEffect, useState } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import config from "../../config.json";
import axios from "axios";


const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get(config.apiUrl);
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (post) => {
    setPosts(posts.filter((p) => p._id !== post._id));
    await axios.delete(`${config.apiUrl}/${post._id}`);
  };

  return (
    <div className="posts">
      <div className="container">
        <button onClick={() => navigate("/post/new")} className="btn btn-primary mb-4">
          nuevo parqueadero
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>longitud</th>
              <th>latitud</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td> {post.title} </td>
                <td> {post.content} </td>
                <td> {post.latitud} </td>
                <td> {post.longitud} </td>
                <td>
                  <button
                    onClick={() => navigate(`/post/${post._id}`)}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(post)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => window.open(`/post/${post._id}/info`, "_blank")}
                    className="btn btn-danger"
                  >
                    Ver info
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Posts;
