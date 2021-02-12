import "./layout.css"

import {graphql, useStaticQuery} from "gatsby"

import Header from "./header"
import PropTypes from "prop-types"
import React from "react"
import {Helmet} from "react-helmet"

const Layout = ({children, title}) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `0 1.0875rem 1.45rem`,
      }}
    >
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
}

export default Layout
