import { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from './Contexts/AuthContext';

function Postform() {
  const { user } = useContext(AuthContext);

  const handlesubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    fetch("https://freelance-site-tawny.vercel.app/freelancer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Task Added!',
          text: 'Your task was successfully posted.',
          confirmButtonColor: '#3085d6',
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to add the task. Please try again.',
          confirmButtonColor: '#d33',
        });
      });
  };

  return (
    <div className="max-w-xl mx-auto bg-base-200 p-6 rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Task</h2>

      <form onSubmit={handlesubmit} className="space-y-4">
        {/* Task Title */}
        <div>
          <label className="label">
            <span className="label-text">Task Title</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter task title"
            className="input input-bordered w-full"
          />
        </div>

        {/* Category */}
        <div>
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select name="category" className="select select-bordered w-full" defaultValue="">
            <option disabled value="">
              Select a category
            </option>
            <option>Web Development</option>
            <option>Design</option>
            <option>Writing</option>
            <option>Marketing</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            placeholder="Describe the task..."
          ></textarea>
        </div>

        {/* Deadline */}
        <div>
          <label className="label">
            <span className="label-text">Deadline</span>
          </label>
          <input
            type="date"
            name="deadline"
            className="input input-bordered w-full"
          />
        </div>

        {/* Budget */}
        <div>
          <label className="label">
            <span className="label-text">Budget ($)</span>
          </label>
          <input
            type="number"
            name="budget"
            placeholder="Enter budget amount"
            className="input input-bordered w-full"
          />
        </div>

        {/* Read-only user info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text">User Email</span>
            </label>
            <input
              type="email"
              name="email"
              readOnly
              value={user?.email || ''}
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">User Name</span>
            </label>
            <input
              type="text"
              name="name"
              readOnly
              value={user?.displayName || ''}
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button className="btn btn-primary w-full mt-4" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default Postform;
