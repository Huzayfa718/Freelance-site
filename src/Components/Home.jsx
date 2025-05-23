// Home.jsx
import React, { useEffect } from 'react';
import { useLoaderData, Link, useLocation } from 'react-router-dom';

function Home() {
  const tasks = useLoaderData();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToFeatured) {
      const el = document.getElementById('featured-tasks');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div>
      {/* Banner / Slider */}
      <div className="w-full h-[300px] md:h-[500px] mb-10 flex justify-center">
        <div className="carousel w-full md:w-full h-full">
          <div id="slide1" className="carousel-item relative w-full">
            <img
              src="https://cdn.kwork.com/files/portfolio/t0/06/d4a44e515da9daeb8372770e78718366ee2fc9c5-1670147190.jpg"
              className="w-full object-cover "
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide3" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide2" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <img
              src="https://weadown.com/wp-content/uploads/2024/11/felan-1-0-4-freelance-marketplace-and-job-board-wordpress-theme.jpg"
              className="w-full object-cover"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide3" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <img
              src="https://s.tmimgcdn.com/scr/800x500/359300/taskhub-job-board-amp-best-freelancing-marketplace-html-template_359394-2-original.png"
              className="w-full object-cover"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide2" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Extra Section 1 */}
      <div className="bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-lg">
            We connect you with the best freelance talent for any project with fast, secure, and reliable
            service.
          </p>
        </div>
      </div>

      {/* Featured Tasks */}
      <div id="featured-tasks" className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Tasks</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div key={task._id} className="card bg-base-100 shadow-xl p-4 space-y-2">
              <h3 className="text-xl font-semibold">{task.title}</h3>
              <p>
                <strong>Category:</strong> {task.category}
              </p>
              <p>
                <strong>Budget:</strong> ${task.budget}
              </p>
              <p>
                <strong>Deadline:</strong> {task.deadline}
              </p>
              <p>
                <strong>Posted by:</strong> {task.name}
              </p>
              <Link to={`/taskdetails/${task._id}`}>
                <button className="btn btn-primary w-full mt-2">See Details</button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Extra Section 2 */}
      <div className="py-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg italic">
            "I've found amazing freelance work thanks to this platform. It's efficient, professional, and easy to
            use!"
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
