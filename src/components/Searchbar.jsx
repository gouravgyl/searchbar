import { useEffect, useState } from "react";
import axios from "axios";
import "./searchbar.css";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";

export function Searchbar() {
  const [text, setText] = useState("");
  const [countrydata, setCountrydata] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getCountries() {
    const { data } = await axios.get(
      `http://localhost:3002/countries?q=${text}&_limit=10`
    );
    setCountrydata(data);
    setLoading(false);
  }
  useEffect(() => {
    if (text.length >= 2) {
      setLoading(true);
      setTimeout(() => {
        getCountries();
      }, 2000);
    }
  }, [text]);
  //   console.log(countrydata);
  if (loading == true) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        {/* <input
          style={{ padding: "10px" }}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="enter countryname"
        /> */}
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          id="standard-basic"
          label="Standard"
          variant="standard"
        />
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          {/* <input
            style={{ padding: "10px" }}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="enter countryname"
          /> */}
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            id="standard-basic"
            label="Standard"
            variant="standard"
          />
        </div>
        <div>
          {countrydata.map((el) => (
            <div className="highlight">{el.country}</div>
          ))}
        </div>
      </>
    );
  }
}
