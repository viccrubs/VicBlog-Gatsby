import React from "react";
import styled from "styled-components";
import { Heading } from "@/models/ArticleNode";
import rehypeReact from "rehype-react";
import { HtmlAst } from "@/models/HtmlAst";
import addSlug from "./astManipulators/addSlug";
import addCodeHeader from "./astManipulators/addCodeHeader";
import useConstant from "@/utils/useConstant";
import Contacts from "@/components/Contacts";
import ResumeLayout from "@/layouts/ResumeLayout";

const components = {
  "resume": ResumeLayout,
  "feedback-contacts": () => <Contacts color={"black"} size={1.4} />,
};

// @ts-ignore
const renderAst = new rehypeReact({
  createElement: React.createElement,
  components,
}).Compiler;

interface Props {
  htmlAst: HtmlAst;
  headings: Heading[];
}

const MarkdownDisplay = styled.article`
`;

const ArticleContentDisplay: React.FC<Props> = ({ htmlAst, headings }) => {
  useConstant(() => {
    addSlug(headings.map((x) => x.slug))(htmlAst);
    addCodeHeader(htmlAst);
  });

  return (
    <MarkdownDisplay className="markdown">
      {renderAst(htmlAst)}
    </MarkdownDisplay>
  );
};

export default ArticleContentDisplay;
