import styles from './style.module.scss'
import { useState } from "react";
import { Search } from "lucide-react";


export default function SearchFallen() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fallenSoldiers = ["אברהם כהן", "יוסי לוי", "דניאל ישראלי", "משה רבינוביץ"];

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setSuggestions(
      e.target.value.length > 1
        ? fallenSoldiers.filter((name) => name.includes(e.target.value))
        : []
    );
  };

  return (
    <div className={styles.container}>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">מצאו נופל לפי שם או תחביב</h2>
      <div className={styles.searchBox}>
        <Search className="text-gray-400 ml-2" size={20} />
        <input
          type="text"
          placeholder="חיפוש שם או תחביב"
          className={styles.searchInput}
          value={query}
          onChange={handleSearch}
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="bg-white border rounded-lg mt-2 p-2 text-right max-w-lg mx-auto shadow-md">
          {suggestions.map((name, index) => (
            <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => setQuery(name)}>
              {name}
            </li>
          ))}
        </ul>
      )}
      <button className="mt-4 px-4 py-2 bg-black text-white rounded-full shadow-md hover:bg-gray-900">חיפוש</button>
    </div>
  );
};


