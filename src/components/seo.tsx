/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from 'gatsby';

import _ from 'lodash/fp';
import React from 'react';
import Helmet from 'react-helmet';

export interface IMeta {
  name?: string;
  property?: string;
  content: string;
}

export interface ISEOProps {
  description?: string;
  lang?: string;
  meta?: IMeta[];
  keywords?: string[];
  title?: string;
}

const SEO: React.FunctionComponent<ISEOProps> = (props) => {
  const { description, lang, meta, keywords, title } = props;
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const metaKeywords: IMeta[] =
    _.size(keywords) > 0
      ? [
          {
            content: _.join(`, `, keywords),
            name: 'keywords',
          },
        ]
      : [];
  const metaBase: IMeta[] = [
    {
      content: metaDescription,
      name: `description`,
    },
    {
      content: title,
      property: `og:title`,
    },
    {
      content: metaDescription,
      property: `og:description`,
    },
    {
      content: `website`,
      property: `og:type`,
    },
    {
      content: `summary`,
      name: `twitter:card`,
    },
    {
      content: site.siteMetadata.author,
      name: `twitter:creator`,
    },
    {
      content: title,
      name: `twitter:title`,
    },
    {
      content: metaDescription,
      name: `twitter:description`,
    },
  ];

  const metaFinal = _.reduce(
    (result: IMeta[], value?: IMeta[]) => {
      if (!value) {
        return result;
      }
      return _.concat(result, value);
    },
    [],
    [metaBase, metaKeywords, meta]
  );

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={metaFinal}
    />
  );
};

SEO.defaultProps = {
  keywords: [],
  lang: `en`,
  meta: [],
};

export default SEO;
