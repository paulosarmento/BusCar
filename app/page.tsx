import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Advantages from "./components/Advantages";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <div>
      <Header />
      <main className="flex-1">
        <Hero />
        <Advantages />
      </main>
      <Footer />
    </div>
  );
}
