import Footer from "../../../components/user/footer";
import Hero from "../../../components/user/hero";
import Highlight from "../../../components/user/highlight";
import Testimony from "../../../components/user/testimony";
import Deals from "../../../components/user/deals";
import Fact from "../../../components/user/fact";

export default function Home() {
  return (
    <>
      <Hero />
      <Highlight />
      <Deals />
      <Fact />
      <Testimony />
      <Footer />
    </>
  );
}
