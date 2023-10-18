import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";
import Search from "@/components/Search";

export default function Home() {
  return (
    <main className="py-5 px-5 max-w-7xl m-auto">
      <Header />
      <Search />
      <Dashboard />
    </main>
  );
}
