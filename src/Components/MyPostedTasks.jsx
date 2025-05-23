import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from './Contexts/AuthContext';

function MyPostedTasks() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch('https://freelance-site-tawny.vercel.app/freelancer')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(
          task => task.email === user.email || task.name === user.displayName
        );
        setTasks(filtered);
      });
  }, [user,tasks]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://freelance-site-tawny.vercel.app/freelancer/${id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
              Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
            }
          });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto h-[500px] p-6">
      <h2 className="text-3xl font-bold text-center mb-6">My Posted Tasks</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Budget</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>${task.budget}</td>
              <td>{task.deadline}</td>
              <td className="space-x-2">
                <Link to={`/updatetask/${task._id}`} className="btn btn-sm btn-warning">Update</Link>
                <button onClick={() => handleDelete(task._id)} className="btn btn-sm btn-error">Delete</button>
                <button className="btn btn-sm btn-info">Bids</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyPostedTasks;
