import * as React from "react";
import withStores from "@/stores/withStores";
import { StatisticsStore } from "@/stores/StatisticsStore";
import lang from "@/i18n/lang";
import { Card, CardHeader, CardBody, CardText, Table, ListGroup, ListGroupItem, Badge } from "reactstrap";
import { FaChartLine } from "react-icons/fa";
import I18nString from "@/i18n/I18nString";
import ListGroupHeader from "../UI/ListGroup/ListGroupHeader";

const root = lang.statistics;

export default withStores(StatisticsStore)(({ useStore }) => {
  const store = useStore(StatisticsStore);

  return (
    <ListGroup flush={false}>
      <ListGroupHeader>
        <FaChartLine /><I18nString id={root.title} />
      </ListGroupHeader>
      <ListGroupItem className="d-flex justify-content-between align-items-center">
        <I18nString id={root.articleCount} />
        <Badge pill={true} color="primary">{store.state.totalArticleCount}</Badge>
      </ListGroupItem>
      <ListGroupItem className="d-flex justify-content-between align-items-center">
        <I18nString id={root.lastUpdated} />
        <Badge pill={true} color="primary">
          {store.state.lastUpdated}
        </Badge>
      </ListGroupItem>
    </ListGroup>
  );
});