import { useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Menu from "./pages/Menu/Menu";
import { store } from "./redux/store";
import Builder from "./pages/Builder/Builder";
export function FastMenu(props) {
  const [csvFile, setCSVFile] = useState(null);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("csvFile", csvFile);

    const url = "http://localhost:8000/upload";
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => console.log("data", data))
      .catch((err) => console.log("err", err));
  };
  const handleFileChange = (e) => {
    setCSVFile(e.target.files[0]);
  };
  return (
    <div>
      {/* FastMenu works
      <section>
        <div>
          Select file
          <input
            type="file"
            name="csvFile"
            accept=".csv"
            onChange={handleFileChange}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </section> */}
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="menu/:companyName" element={<Menu />} />
            <Route path="builder" element={<Builder />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
