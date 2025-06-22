import * as React from "react";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";

export default ({ messages }) => {
  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Please type your question in the above input and click submit"
        >
          OpenAI Answer
        </Header>
      }
    >
      {messages.join(" ")}
    </Container>
  );
};
