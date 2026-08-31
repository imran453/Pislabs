import Header from "./components/Header";
import Hero from "./components/Hero";
import BuildingSweep from "./components/BuildingSweep";
import RoleTags from "./components/RoleTags";
import CreatorRoleDetail from "./components/CreatorRoleDetail";
import HowItWorks from "./components/HowItWorks";
import Rewards from "./components/Rewards";
import FAQ from "./components/FAQ";
import SignupSection from "./components/SignupSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-white">
      <Header />
      <Hero />
      <BuildingSweep />
      <RoleTags />
      <CreatorRoleDetail />
      <HowItWorks />
      <Rewards />
      <FAQ />
      <SignupSection />
      <Footer />
    </div>
  );
}
