"use client";
import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Home/Hero";
import Advantages from "./components/Home/Advantages";
import Footer from "./components/Home/Footer";
import MapaTour from "./components/MapaTour";

export default function Page() {
  const [interativo, setInterativo] = useState(false);
  return (
    <div>
      <Header />
      <main className="flex-1">
        <Hero />
        <Advantages />

        <MapaTour />
      </main>
      <Footer />
    </div>
  );
}
