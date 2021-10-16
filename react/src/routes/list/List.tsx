
import * as React from 'react';
import { connect } from 'react-redux';

// Props interface
interface IProps {}

// Component
const List: React.FunctionComponent<IProps> = props => (
  <>
    <div>List</div>
  </>
);
  
// Reduc connector to create high order component with store integration
const ListContainer = connect(null, null)(List);

export default ListContainer;