import React from "react";
import { TestAtteptType } from "../../context/UserContext";

interface TestStatusBarType {
  testAttempts: TestAtteptType[];
}

const TestStatusBar: React.FC<TestStatusBarType> = ({ testAttempts }) => {
  console.log(testAttempts);

  return <div>TestStatusBar</div>;
};

export default TestStatusBar;
