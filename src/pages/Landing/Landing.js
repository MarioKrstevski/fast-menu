import { useState } from "react";
import { Link } from "react-router-dom";

function Landing(props) {
  const logo = (
    <>
      <img
        className="w-8"
        src="https://thumbs.dreamstime.com/b/design-can-be-used-as-logo-icon-complement-to-tool-speed-127653493.jpg"
        alt="logo"
      />
      <span>Fast Menu</span>
    </>
  );

  const [isFreeSelected, setIsFreeSelected] = useState(true);
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold flex">{logo}</div>
          <ul className="flex space-x-6 items-center">
            <Link to={"/login"}>
              <li className="text-indigo-500 font-semibold cursor-pointer">
                Login
              </li>
            </Link>
            <Link to={"/signup"}>
              <li className="bg-indigo-500 text-white rounded py-2 px-4 cursor-pointer">
                SignUp
              </li>
            </Link>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-indigo-500 py-12 md:py-24 text-white text-center">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl  font-extrabold mb-4">
            Create Beautiful Menus with Google Sheets
          </h1>
          <p className="md:text-lg mb-8">
            Make beautiful and customizable menus
          </p>
          <Link to={"/signup"}>
            <button className="bg-white text-indigo-500 font-semibold py-2 px-6 rounded hover:bg-indigo-100 focus:outline-none focus:ring focus:ring-indigo-200">
              Get Started
            </button>
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-4  text-center">
              <div className="text-3xl text-indigo-500 mb-4">
                Codeless
              </div>
              <p>
                Create the menu image with FastMenu's customizable
                builder
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-4  text-center">
              <div className="text-3xl text-indigo-500 mb-4">
                Orders
              </div>
              <p>Allow customers to send you orders to WhatsApp</p>
            </div>
            {/* Feature 3 */}
            <div className="p-4  text-center">
              <div className="text-3xl text-indigo-500 mb-4">
                Custom Domain
              </div>
              <p>Put your name on it</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}

      <section id="gallery">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold">Gallery</h3>
          <h4 className="text-xl text-slate-700 my-2">
            Look around these cool menus built using FastMenu
          </h4>

          {/* FastMenu Widget for menu */}

          <div className="container w-[80%] mx-auto">
            <fastmenu-widget subdomain="fastmenu"></fastmenu-widget>
          </div>
        </div>
      </section>

      {/* Pricing */}

      <section id="pricing" className=" my-16 px-10">
        <div className="text-center gap-4">
          <div className="column text-slate-900">
            <div>
              <h3 className="text-3xl my-2 font-bold">Pricing</h3>
              <h4 className="text-slate-700 my-2">
                Get a special lifetime discount as an early user
              </h4>
              <div className="field flex items-center justify-center text-lg">
                Monthly
                <label className="switch mx-2 block is-rounded">
                  <input
                    type="checkbox"
                    checked={!isFreeSelected}
                    onChange={(e) =>
                      setIsFreeSelected(!e.target.checked)
                    }
                    true-value="true"
                    value="false"
                  />
                  <span className="check  is-twitter"></span>
                  <span className="control-label"></span>
                </label>
                Yearly
              </div>
              <p>
                {!isFreeSelected && (
                  <span className="text-sm text-black bg-green-400 px-2 py-1 my-3 inline-block rounded">
                    <span className="">Save $24 per year</span>
                  </span>
                )}
              </p>
              <p className="my-2">
                Start for free and cancel at any time
              </p>
              <div className=" flex flex-col  w-full  md:flex-row  justify-center gap-6 ">
                <div className="border shadow-md p-6 flex flex-col justify-start w-full md:w-1/3">
                  <div className="mb-12">
                    <div className="mb-6">
                      <div className="my-2 text-2xl font-semibold">
                        Free
                      </div>
                      <span className="text-4xl font-bold">$0</span>
                      <div className="text-slate-700">
                        per website
                      </div>
                    </div>
                    <div className="font-semibold font-sans ">
                      <ul className="flex flex-col gap-2">
                        <li>6 free websites</li>
                        <li>Unlimited rows</li>
                        <li>Custom subdomain</li>
                        <li>Filters</li>
                        <li>Mobile first design</li>
                        <li>SSL Security</li>
                      </ul>
                    </div>
                  </div>
                  <Link
                    to="/signup"
                    className="rounded py-2 px-4 text-white font-semibold bg-slate-800 hover:bg-black mt-auto"
                  >
                    <button>Start now</button>{" "}
                  </Link>
                </div>
                <div className="border shadow-md p-6 flex flex-col justify-start w-full md:w-1/3">
                  <div className="mb-12">
                    <div className="mb-6">
                      <div className="my-2 text-2xl font-semibold">
                        Pro
                      </div>
                      <span className="text-4xl font-bold">$72</span>
                      <div className="text-slate-700">
                        per website <br /> (billed yearly)
                      </div>
                    </div>
                    <div className="font-semibold font-sans ">
                      <ul className="flex flex-col gap-2">
                        <li>Remove FastMenu branding</li>
                        <li>Shopping Cart</li>
                        <li>
                          Use your own domain{" "}
                          <span className="bg-gray-500 text-white rounded px-1 py-0.5 text-[10px]">
                            soon
                          </span>{" "}
                        </li>
                        <li>
                          Add Google Analytics{" "}
                          <span className="bg-gray-500 text-white rounded px-1 py-0.5 text-[10px]">
                            soon
                          </span>
                        </li>
                        <li>
                          SEO features{" "}
                          <span className="bg-gray-500 text-white rounded px-1 py-0.5 text-[10px]">
                            soon
                          </span>
                        </li>

                        <li>
                          PWA support{" "}
                          <span className="bg-gray-500 text-white rounded px-1 py-0.5 text-[10px]">
                            soon
                          </span>
                        </li>
                        <li>Access to all future integrations</li>
                        <li>Plus all free options</li>
                      </ul>
                    </div>
                  </div>
                  <Link
                    to="/signup"
                    className="rounded py-2 px-4 text-white font-semibold bg-slate-800 hover:bg-black mt-auto"
                  >
                    <button>Start now</button>{" "}
                  </Link>
                </div>
              </div>
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
          <Link to={"/signup"}>
            <button className="bg-white text-indigo-500 font-semibold py-2 px-6 rounded hover:bg-indigo-100 focus:outline-none focus:ring focus:ring-indigo-200">
              Sign Up Now
            </button>
          </Link>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <div className="container mx-auto">
          <p>&copy; 2023 FastMenu</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
