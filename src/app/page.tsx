import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";
import Search from "@/components/Search";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <main className="py-5 px-5 max-w-7xl m-auto">
      <Header />
      {/* added suspense for the loading sign to appear when it's getting data from db */}
      <Suspense fallback={<Loading />}>
        <Search />
        <Dashboard />
      </Suspense>
    </main>
  );
}
