import { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import NewDrops from "@/components/home/NewDrops";
import Categories from "@/components/home/Categories";
import Reviews from "@/components/home/Reviews";

export const metadata: Metadata = {
  title: "KICKS - Do It Right",
  description:
    "The biggest hyperstore in the universe. Exclusive collections and latest drops.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <NewDrops />
      <Categories />
      <Reviews />
    </>
  );
}
