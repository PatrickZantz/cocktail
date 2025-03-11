import Categories from "../components/Categories";
import Search from "../components/Search";

export default function Home() {
  return (
    <div className="flex flex-col ">
      <Search />
      <Categories />
    </div>
  );
}
