"use client";

import { useState } from "react";
import Hero from "./Hero";
import CarList from "./CarList";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <>
      <Hero onSearch={handleSearch} />
      <CarList searchTerm={searchTerm} />
    </>
  );
}
