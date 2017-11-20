import React from "react";
import { withRouter } from "react-router-dom";
import { Highlight } from "react-instantsearch/dom";
import TimeAgo from "react-timeago";
import numeral from "numeral";

// This converts a number such as 4200 to 4.2K and 1004 to 1K
const format = "0[.]0a";

const Hit = withRouter(({ hit, history, location }) => (
  <a
    className="bg-white block no-underline text-black border border-t-0 p-3 hover:bg-grey-lightest"
    href={hit.repositoryUrl}
    target="_blank"
    onClick={e => {
      e.preventDefault();
      history.push({
        pathname: `/${hit.name}`,
        search: location.search
      });
    }}
  >
    <div className="mb-1">
      {hit.collections.length > 0 && (
        <div className="text-grey text-sm mb-2">
          Filed under {hit.collections}
        </div>
      )}
      <strong className="pr-2 text-lg">
        <Highlight attributeName="name" hit={hit} tagName="mark" />
      </strong>
      <em className="roman text-grey-dark">
        v{hit.latestRelease} published{" "}
        <TimeAgo date={hit.modifiedAt} minPeriod="5" /> by {hit.owner}
      </em>
    </div>

    <div
      className="mb-2"
      dangerouslySetInnerHTML={{ __html: hit.description }}
    />

    <div>
      <span
        className="text-orange-dark pr-2"
        title={`${hit.stars} stars on GitHub`}
      >
        {numeral(hit.stars).format(format)} stars
      </span>
      <span
        className="text-teal-dark pr-2"
        title={`${hit.downloads} downloads from NPM in the last month`}
      >
        {numeral(hit.downloads).format(format)} downloads/mo
      </span>
      <span
        className="text-purple-dark"
        title={`${hit.dependents} libraries depend on this library`}
      >
        {numeral(hit.dependents).format(format)} dependents
      </span>
    </div>
  </a>
));

export default Hit;