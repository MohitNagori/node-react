import * as React from 'react';
import { CONSTANTS } from '../../utils/constants';
import './Footer.scss';

// Props interface
interface IProps {}

// Component
const Footer: React.FunctionComponent<IProps> = props => (
  <>
    <footer className="app-footer">
        {CONSTANTS.FOOTER_TEXT}
    </footer>
  </>
);

export default Footer;