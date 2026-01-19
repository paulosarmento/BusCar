"use client";
import React from "react";
import Header from "./components/Header";
import Hero from "./components/Home/Hero";
import Advantages from "./components/Home/Advantages";
import Footer from "./components/Home/Footer";
import MapaTour from "./components/Home/MapaTour";

export default function Page() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 w-full">
        <Hero />
        <Advantages />
        <MapaTour />
      </main>

      <Footer />
    </div>
  );
}
