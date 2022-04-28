import React from 'react';
import { Container } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    return (
      <div>
        <footer className={'footer'}>
          <Container className="center aligned">
            Department of Information and Computer Sciences <br />
            University of Hawaii<br />
            Honolulu, HI 96822 <br />
            <a href="https://manoa-eats.github.io/">GitHub Project Page</a>
          </Container>
        </footer>
      </div>
    );
  }
}

export default Footer;
