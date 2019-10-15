import React from "react";
import { graphql } from "gatsby";
import BannerLayout, { BannerLayoutTitle, BannerLayoutDescription } from "@/layouts/BannerLayout";
import styled from "styled-components";
import lang from "@/i18n/lang";
import Page from "@/layouts/Page";
import { Helmet } from "react-helmet";
import { useStore } from "simstate";
import I18nStore from "@/stores/I18nStore";
import { FaGithub } from "react-icons/fa";
import { Slide } from "@/models/Slide";
import { colors } from "@/styles/variables";
import { groupBy } from "@/utils/groupBy";
import useConstant from "@/utils/useConstant";

interface Props {
  data: {
    allSlides: {
      nodes: { name: string; html_url: string }[];
    };
  };
}

const root = lang.resources.slides;

const Slides: React.FC<Props> = (props) => {
  const { data: { allSlides: { nodes } } } = props;

  const i18nStore = useStore(I18nStore);

  const title = i18nStore.translate(root.title) as string;
  const documentTitle = i18nStore.translate(root.documentTitle) as string;
  const description = i18nStore.translate(root.description);

  const sortedData = useConstant(() => {
    const map = groupBy(nodes.map(({ name, html_url }) => ({
      year: name.substr(0, 4),
      date: `${name.substr(0, 4)}/${name.substr(4, 2)}/${name.substr(6, 2)}`,
      name: name.substring(9),
      githubUrl: html_url,
    } as Slide)), (data) => data.year);

    // to sorted array
    return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  });

  return (
    <BannerLayout transparentHeader={false} banner={
      <>
        <BannerLayoutTitle>{title}</BannerLayoutTitle>
        <BannerLayoutDescription>{description}</BannerLayoutDescription>
      </>
    }>
      <Page maxWidth={700}>

        <Helmet
          title={`${documentTitle} - VicBlog`}
          meta={[
            { name: "og:title", content: title },
            { name: "og:locale", content: i18nStore.language.metadata.detailedId },
            { name: "og:site_name", content: "VicBlog" },
          ]}
        />
        <p>{i18nStore.translate(root.autoGenerated, [
          <a key={"link"} href={"https://github.com/daacheen/Presentations"}>
            <FaGithub />daacheen/Presentations
          </a>,
        ])}</p>
        {
          sortedData.map(([year, pres]) => {
            return (
              <Year key={year}>
                <YearNode>{year}</YearNode>
                {pres.sort((a, b) => b.date.localeCompare(a.date)).map((pre) => (
                  <PreNode key={pre.date}>
                    <PreNodeName href={pre.githubUrl} target={"__blank"}>{pre.name}</PreNodeName>
                    <PreNodeDate>{pre.date}</PreNodeDate>
                  </PreNode>
                ))}
              </Year>
            );
          })
        }
      </Page>
    </BannerLayout>
  );
}

export default Slides;


const Year = styled.div`
  border-left: 1px lightgray solid;
  padding: 8px 0;
`;

const YearNode = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-left: 0px;

  padding: 0 8px;

  border-left: 4px ${colors.tocLinkActiveColor} solid;

`;

const PreNode = styled.div`
  margin-bottom: 8px;
    padding: 0 8px;

`;

const PreNodeDate = styled.span`
  color: gray;
  font-size: small;
`;

const PreNodeName = styled.a`
  display: block;
`;

export const query = graphql`
  query Slides {
    allSlides(filter: {type: { eq: "dir" }}) {
      nodes {
        name
        html_url
        type
      }
    }
  }
`;
