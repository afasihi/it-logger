import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import { updateLog } from "../../actions/logActions";
import TechSelectOptions from "../techs/TechSelectOptions";

const EditLogModal = () => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");
  const dispatch = useDispatch();
  const current = useSelector((state) => state.log.current);

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setTech(current.tech);
      setAttention(current.attention);
    }
  }, [current]);

  const onSubmit = () => {
    if (message === "" || tech === "") {
      M.toast({ html: "Please enter a message and tech" });
    } else {
      const updLog = {
        id: current.id,
        message,
        tech,
        attention,
        date: new Date(),
      };

      dispatch(updateLog(updLog));
      M.toast({ html: `log update by ${tech}` });

      // clear fields
      setMessage("");
      setTech("");
      setAttention(false);
    }
  };
  return (
    <div id="edit-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Enter System Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <select
              name="tech"
              value={tech}
              className="browser-default"
              onChange={(e) => setTech(e.target.value)}
            >
              <option value="" disabled>
                Select Technician
              </option>
              <TechSelectOptions />
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  value={attention}
                  checked={attention}
                  onChange={(e) => setAttention(!attention)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect waves-light blue btn"
        >
          Enter
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  width: "75%",
  height: "75%",
};

export default EditLogModal;