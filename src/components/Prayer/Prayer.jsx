import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import "./Prayer.css";

function Prayer() {
  const [prayertime, setPrayertime] = useState({});
  const [place, setPlace] = useState("tashkent");
  const [error, setError] = useState("");
  const [inputVal, setInputVal] = useState("");
  const API_KEY = "bba7ab9bd035d049765305fef6073578";
  const submit = (e) => {
    e.preventDefault();
    setPlace(inputVal);
    console.log(inputVal);
  };
  useEffect(() => {
    axios
      .get(`https://muslimsalat.com/${place}.json?key=${API_KEY}`)
      .then((res) => {
        setPrayertime(res.data);
        setError("")
      })
      .catch(err => setError("Type name write"));
  }, [place]);
  console.log(prayertime);

  return (
    <div className="mom">
      <h2>Namaz Times</h2>
      <div className="prayersection">
        <form onSubmit={submit}>
          <input
            onChange={(e) => setInputVal(e.target.value)}
            type="text"
            placeholder="Type state or country name ..."
          />
        </form>
        <div>
        {error && <h3>{error}</h3>}
          <h1>
            {prayertime.city},{prayertime.country}
          </h1>

          {prayertime.city && (
            <div className="prayers">
              <h1> Fajr:{prayertime?.items[0]?.fajr}</h1>
              <h1>Dhuhr:{prayertime.items[0].dhuhr}</h1>
              <h1>Asr:{prayertime.items[0].asr}</h1>
              <h1>Magrib:{prayertime.items[0].maghrib}</h1>
              <h1>Isha:{prayertime.items[0].isha}</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Prayer;
