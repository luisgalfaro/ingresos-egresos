import { FiCheckCircle, FiXCircle } from "react-icons/fi";

function Alert({ texto, type }) {
  return (
    <>
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 max-w-md w-[300px] animate-bounce">
        <div
          role="alert"
          className={`alert ${
            type === "positive" ? "alert-success" : "alert-error"
          }  `}
        >
          {type === "positive" ? <FiCheckCircle /> : <FiXCircle />}
          <span>{texto}</span>
        </div>
      </div>
    </>
  );
}

export default Alert;
