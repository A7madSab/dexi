import { BackToHome } from "../App";
import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";

/*
  Think about the data you've received, how can we best extract insights
  from this data?

  Feel free to come up with more visualization ideas 
  than the ones required below.
*/
const ChallengeThree = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [pieChart, setPieChart] = useState({
    labels: ["Female", "Male"],
    datasets: [
      {
        label: "# of Males to Female",
        data: [0, 0],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 2,
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://randomuser.me/api/?seed=dexi-interview?page=${page}&results=100`
        );
        const data = await res.json();
        // throw new Error(error);

        const neededData = data.results.map(
          ({ dob, gender, location, registered }) => ({
            age: dob.age,
            gender: gender,
            country: location.country,
            registrationDate: registered.date,
          })
        );

        let male = 0,
          female = 0;
        neededData.map(({ gender }) => {
          gender === "female" ? (female += 1) : (male += 1);
        });

        setPieChart({
          labels: ["Female", "Male"],
          datasets: [
            {
              label: "# of Males to Female",
              data: [male, female],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
              ],
              borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
              borderWidth: 2,
            },
          ],
        });

        setResults(neededData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setResults([]);
        setError("Something went wrong");
        setLoading(false);
      }
    })();
  }, [page]);

  console.log("results", results);

  return (
    <>
      <BackToHome />
      <h1 className="title is-1 has-text-white">Challenge 3</h1>
      <h2 className="subtitle has-text-grey-lighter">
        Fetch 100 users from the same api as before, and visualize their
        distribution by <code>age</code>, <code>gender</code>,
        <code>country</code>, and <code>registration date</code>.
      </h2>

      {/* Insert your data visualizations here */}
      <>
        <button onClick={() => setPage(page + 1)}>Load New Data</button>

        <div className="header">
          <h1 className="title">Pie Chart</h1>
          <div className="links">
            <a
              className="btn btn-gh"
              href="https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Pie.js">
              Github Source
            </a>
          </div>
        </div>
        {loading ? (
          <h1>Loading</h1>
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          <Pie data={pieChart} />
        )}
      </>
    </>
  );
};

export default ChallengeThree;
