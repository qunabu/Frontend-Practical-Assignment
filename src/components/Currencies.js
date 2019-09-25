import React from "react";
import PropTypes from "prop-types";
import "./Currencies.css";

function Currencies({ items = [], ...props }) {
  return (
    <ul>
      {items.map(item => (
        <li className="currency" key={item.code}>
          <p>
            {item.code} - {item.currency}, rate: {item.mid}
            <button
              title="remove from the list"
              className="icon remove"
              onClick={e => props.onDeleteCode && props.onDeleteCode(item.code)}
            ></button>
          </p>
        </li>
      ))}
      {items.length !== 0 && (
        <React.Fragment>
          <hr />
          <li className="remove-all">
            <p>
              remove all
              <button
                title="remove all the list"
                className="icon remove"
                onClick={e => props.onDeleteAll && props.onDeleteAll()}
              ></button>
            </p>
          </li>
        </React.Fragment>
      )}
    </ul>
  );
}

Currencies.propTypes = {
  /** data content of the items, currencies */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      /** name */
      currency: PropTypes.string,
      /** 3 letters code */
      code: PropTypes.string,
      /** rate */
      mid: PropTypes.number
    })
  ).isRequired,
  /** callback called when currency delete is clicked */
  onDeleteCode: PropTypes.func,
  onDeleteAll: PropTypes.func
};

Currencies.defaultProps = {
  items: [],
  onDeleteCode: () => {},
  onDeleteAll: () => {}
};

export default Currencies;
