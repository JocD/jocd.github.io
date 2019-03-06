import { Link } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import Seo from '../components/seo';

export interface ISecondPageProps {}

const SecondPage: React.FunctionComponent<ISecondPageProps> = (props) => (
  <Layout>
    <Seo title='Page two' />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to='/'>Go back to the homepage</Link>
  </Layout>
);

export default SecondPage;
