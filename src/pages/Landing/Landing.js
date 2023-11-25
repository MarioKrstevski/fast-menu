import { Link } from "react-router-dom";

export default function Landing(props) {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">Digital Menu Tool</div>
          <ul className="flex space-x-6">
            <li className="text-gray-700 hover:text-indigo-500 cursor-pointer">
              Home
            </li>
            <li className="text-gray-700 hover:text-indigo-500 cursor-pointer">
              Features
            </li>
            <li className="text-gray-700 hover:text-indigo-500 cursor-pointer">
              Pricing
            </li>
            <li className="text-gray-700 hover:text-indigo-500 cursor-pointer">
              Contact
            </li>
            <Link to={"login"}>
              <li className="text-indigo-500 font-semibold cursor-pointer">
                Login
              </li>
            </Link>
            <Link to={"signup"}>
              <li className="bg-indigo-500 text-white rounded py-2 px-4 cursor-pointer">
                SignUp
              </li>
            </Link>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-indigo-500 py-24 text-white text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl font-extrabold mb-4">
            Create Stunning Digital Menus
          </h1>
          <p className="text-lg mb-8">
            Showcase your dishes in a modern and interactive way.
          </p>
          <button className="bg-white text-indigo-500 font-semibold py-2 px-6 rounded hover:bg-indigo-100 focus:outline-none focus:ring focus:ring-indigo-200">
            Get Started
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Features We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-4 border rounded shadow-md text-center">
              <div className="text-2xl text-indigo-500 mb-4">
                Feature 1
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Pellentesque et risus.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-4 border rounded shadow-md text-center">
              <div className="text-2xl text-indigo-500 mb-4">
                Feature 2
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Pellentesque et risus.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="p-4 border rounded shadow-md text-center">
              <div className="text-2xl text-indigo-500 mb-4">
                Feature 3
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Pellentesque et risus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-500 py-16 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8">
            Create your digital menu today and impress your customers.
          </p>
          <button className="bg-white text-indigo-500 font-semibold py-2 px-6 rounded hover:bg-indigo-100 focus:outline-none focus:ring focus:ring-indigo-200">
            Sign Up Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <div className="container mx-auto">
          <p>&copy; 2023 Digital Menu Tool</p>
        </div>
      </footer>
    </div>
  );
}
