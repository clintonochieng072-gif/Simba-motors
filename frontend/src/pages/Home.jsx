import React, { useState } from "react";
import Hero from "../components/Hero";
import CarList from "../components/CarList";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <Hero onSearch={handleSearch} />
      <CarList searchTerm={searchTerm} />
    </>
  );
}
