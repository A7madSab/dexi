import { BackToHome } from "../App";
import { useState, useEffect } from "react";

/*
  hint: the API takes page and results as query string
  eg: `?page=3&results=10`
*/

const ChallengeTwo = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://randomuser.me/api/?seed=dexi-interview?page=${page}&results=5`
        );
        const data = await res.json();
        // throw new Error(error);

        setResults([...results, ...data.results]);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setResults([]);
        setError("Something went wrong");
        setLoading(false);
      }
    })();
  }, [page]);

  console.log("resultsresults", results);

  return (
    <>
      <BackToHome />
      <h1 className="title is-1 has-text-white">Challenge 2</h1>
      <h2 className="subtitle has-text-grey-lighter">
        Fetch 5 users from the api
        <code>https://randomuser.me/api/?seed=dexi-interview</code> and display
        them in a table.
      </h2>
      <h2 className="subtitle has-text-grey-lighter">
        A <code>table-example.png</code> has been provided for guidance on
        styling.
      </h2>
      <h2 className="subtitle has-text-grey-lighter">
        Pay close attention to empty and loading states
      </h2>
      <h2 className="subtitle has-text-grey-lighter">
        The table should also have a <code>Load More</code> button that fetches
        the next page of the API and appends the results to the existing users.
      </h2>

      <button onClick={() => setPage(page + 1)}>Load More</button>

      {loading ? (
        <h1>Loading</h1>
      ) : results.length === 0 ? (
        <h1>no data</h1>
      ) : (
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Image</th>
              <th>First</th>
              <th>Gender</th>
              <th>Location</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {results.map(
              ({ name, gender, location, email, picture, ...result }, key) => {
                return (
                  <tr key={key}>
                    <td>
                      <img src={picture.thumbnail} />
                    </td>
                    <td>{`${name.title} ${name.first} ${name.last}`}</td>
                    <td>{gender}</td>
                    <td>{`${location.city} ${location.state}`}</td>
                    <td>{email}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      )}

      {/* Id error happened */}
      {error && <p>{error}</p>}
    </>
  );
};

export default ChallengeTwo;
