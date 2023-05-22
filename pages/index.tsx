import React from "react";
import PageContainer from "../src/components/container/PageContainer";

// components
import BigCalendar from "./apps/calendar/index";
import Footer from "../src/components/landingpage/footer/Footer";

const Landingpage = () => {

  return (
    <PageContainer>
      <BigCalendar />  
      <Footer />
    </PageContainer>
  );
};

Landingpage.layout = "Blank";
export default Landingpage;
