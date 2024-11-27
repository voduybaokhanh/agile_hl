import { useEffect, useState } from 'react';
import '../login/login.css';

function Login() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch('http://localhost:3000/user/list')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === false) {
          setError(data.message);
        } else {
          setUsers(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Lỗi khi tải dữ liệu: " + err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="user-list">
      <h1>Danh sách người dùng</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email} - Điểm tích lũy: {user.diemtichluy || 0}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Login;
