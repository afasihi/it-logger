import React from "react";
import { useDispatch } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";

import PropTypes from "prop-types";
import { deleteTech } from "../../actions/techAction";

const TechItem = ({ tech: { firstName, lastName, id } }) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteTech(id));
    M.toast({ html: "Technician deleted" });
  };

  return (
    <li className="collection-item">
      <div>
        {firstName} {lastName}
        <a href="#!" className="secondary-content" onClick={onDelete}>
          <i className="material-icons grey-text">delete</i>
        </a>
      </div>
    </li>
  );
};

TechItem.propTypes = {
  tech: PropTypes.object.isRequired,
};

export default TechItem;
