import React from "react";
import PageContainer from "../src/components/container/PageContainer";

// components
import Banner from "../src/components/landingpage/banner/Banner";
import C2a from "../src/components/landingpage/c2a/C2a";
import C2a2 from "../src/components/landingpage/c2a/C2a2";
import DemoSlider from "../src/components/landingpage/demo-slider/DemoSlider";
import Features from "../src/components/landingpage/features/Features";
import Footer from "../src/components/landingpage/footer/Footer";
import Frameworks from "../src/components/landingpage/frameworks/Frameworks";
import LpHeader from "../src/components/landingpage/header/Header";
import Testimonial from "../src/components/landingpage/testimonial/Testimonial";
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: '/auth/auth1/login',
      permanent: false,
    },
  }
}

const Index: React.FC = () => {
  return null;
}
export default Index;

// const Landingpage = () => {

//   return (
//     <PageContainer>
//       <LpHeader />
//       {/* <Banner /> */}
//       {/* <DemoSlider /> */}
//       {/* <Frameworks /> */}
//       {/* <Testimonial /> */}
//       {/* <Features /> */}
//       {/* <C2a />
//       <C2a2 /> */}
//       <Footer />
//     </PageContainer>
//   );
// };

// Landingpage.layout = "Blank";
// export default Landingpage;
