import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

function Taskdetails() {
  const task = useLoaderData();
  const [showContact, setShowContact] = useState(false);

  const handlebt = () => {
    setShowContact(true); // Hide button and show contact info
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-4">{task.title}</h2>
      <p><strong>Category:</strong> {task.category}</p>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Budget:</strong> ${task.budget}</p>
      <p><strong>Deadline:</strong> {task.deadline}</p>

      {showContact ? (
        <div className="mt-4">
          <p><strong>Posted by:</strong> {task.name}</p>
          <p><strong>Email:</strong> {task.email}</p>
        </div>
      ) : (
        <button onClick={handlebt} className="btn btn-primary w-full mt-2">
          View Contractor's Info
        </button>
      )}
    </div>
  );
}

export default Taskdetails;
