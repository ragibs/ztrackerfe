"use client";

import { FormEvent, useState } from "react";
import { Button } from "../ui/button";

const Search = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const res = await fetch("/searchprod", {
      method: "POST",
      body: JSON.stringify({ searchPrompt }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { product } = await res.json();

    console.log(product?.[0]);
    setSearchResults(product);
    console.log(searchResults);
    setLoading(false);
  };

  return (
    <div className="pt-10">
      <form
        className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <label className="text-xs sm:text-lg font-semibold" htmlFor="link">
          Link
        </label>
        <input
          value={searchPrompt}
          onChange={(e) => setSearchPrompt(e.target.value)}
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="link"
          placeholder=".."
        />
        <p className=" text-xs sm:text-lg font-thin py-2">
          Add your favourite item you want to track!
        </p>
        <div className="flex justify-center">
          <Button className="mt-4" type="submit" disabled={loading === true}>
            {loading ? "Loading" : "+ Add"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Search;
