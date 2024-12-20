import React, { ReactNode } from "react";
import SingleContent from "../SingleContent2";
import SingleRelatedPosts from "../SingleRelatedPosts";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {children}

      {/* SINGLE MAIN CONTENT */}
      <div className="container mt-10">
        <SingleContent />
      </div>

    </div>
  );
};

export default Layout;
