import { Button } from "../ui/button";
import { scrappedZaraProduct } from "@/lib/scrapper";

// scrappedZaraProduct(
//   "https://www.zara.com/ca/en/-p04437273.html?v1=311731495&v2=2290613"
// );

const Search = () => {
  return (
    <div className="pt-10">
      <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <label className="text-xs sm:text-lg font-semibold" htmlFor="link">
          Link
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="link"
          placeholder=".."
        />
        <p className=" text-xs sm:text-lg font-thin py-2">
          Add your favourite item you want to track!
        </p>
        <div className="flex justify-center">
          <Button className="mt-4">+ Add</Button>
        </div>
      </form>
    </div>
  );
};

export default Search;
