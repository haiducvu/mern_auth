import React from "react";
import NavComponent from "../components/common/nav.component";
import AsideComponent from "../components/common/aside.component";
import FooterComponent from "../components/common/footer.component";

function AdminLayout(props) {
  return (
    <div className="wrapper">
      <NavComponent />
      <AsideComponent />
      {props.children}
      <FooterComponent />
    </div>
  );
}

export default AdminLayout;
