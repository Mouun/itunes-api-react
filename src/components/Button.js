import PropTypes from "prop-types";

const Button = props => {
  let classes = "inline-flex items-center px-4 py-2 border border-transparent text-white dark:text-black text-sm font-medium rounded-md shadow-sm bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 dark:ring-offset-gray-900";
  if (props.additionalClasses) classes += ` ${props.additionalClasses}`;

  return (
    <button
      type="button"
      className={classes}
      onClick={props.action}
    >
      {props.children}
    </button>
  );
}

Button.propTypes = {
  action: PropTypes.func,
  children: PropTypes.node,
  additionalClasses: PropTypes.string
}

export default Button;
