import Header from "../Components/Layout/Header/header";
import Footer from "../Components/Layout/Footer/footer";
import React from "react";
type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Header />
      <div className="ctn-global">{children}</div>
      <Footer />
    </>
  );
}
