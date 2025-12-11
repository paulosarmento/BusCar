import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Home/Hero";
import Advantages from "./components/Home/Advantages";
import Footer from "./components/Home/Footer";

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
