import Footer from "../../../components/user/footer";
import Header from "../../../components/user/header";
import Hero from "../../../components/user/hero";
import Highlight from "../../../components/user/highlight";
import Testimony from "../../../components/user/testimony";
import Deals from "../../../components/user/deals";
import Fact from "../../../components/user/fact";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Highlight />
      <Deals />
      <Fact />
      <Testimony />
      <Footer />
    </>
  );
}
