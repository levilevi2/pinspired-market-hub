
import { useState } from "react";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6 text-center">מוצרים מומלצים</h1>
        
        <FilterBar onFilterChange={setActiveFilter} />
        
        <div className="mt-6">
          <ProductGrid filter={activeFilter} searchQuery={searchQuery} />
        </div>
      </main>
    </div>
  );
};

export default Index;
