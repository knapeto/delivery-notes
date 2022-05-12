import { Pagination } from 'react-admin';

const CustomPagination = (props) => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />
);

export default CustomPagination;
