import PropTypes from "prop-types";

export const MensajeAlerta = ({ variant, children }) => {
  const baseStyle = "p-4 mb-4 text-sm rounded-lg ";
  let variantStyle = "";

  switch (variant) {
    case "danger":
      variantStyle = "bg-red-100 text-red-700";
      break;
    case "warning":
      variantStyle = "bg-yellow-100 text-yellow-700";
      break;
    case "success":
      variantStyle = "bg-green-100 text-green-700";
      break;
    default:
      variantStyle = "bg-gray-100 text-gray-700";
  }

  return <div className={`${baseStyle} ${variantStyle}`}>{children}</div>;
};

MensajeAlerta.propTypes = {
  variant: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
