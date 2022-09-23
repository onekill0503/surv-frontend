import {connect} from 'react-redux'
import {DocumentIcon} from '@heroicons/react/24/solid'

const Header = (props) => {
  return (
    <div className="flex justify-between home-header">
      <div className="logo-wrapper">
        <center>
          <DocumentIcon className="text-violet-700" />
          <span>Surv</span>
        </center>
      </div>
      {props.children}
    </div>
  );
};

export default connect()(Header);