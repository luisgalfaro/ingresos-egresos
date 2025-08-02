import { FiCheckCircle, FiXCircle } from "react-icons/fi";

function Alert({ texto, type }) {
  return (
    <>
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 max-w-md w-[300px] animate-bounce">
        <div role="alert" className="alert alert-success ">
          {type === "positive" ? <FiCheckCircle /> : <FiXCircle />}
          <span>{texto}</span>
        </div>
      </div>
    </>
  );
}

export default Alert;
