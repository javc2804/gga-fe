import React, { ReactNode } from "react";

interface MyLayoutProps {
  children: ReactNode;
}

const MyLayout: React.FC<MyLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default MyLayout;
