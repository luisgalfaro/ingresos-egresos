function Modal(props) {
  const { usuario, hora, fecha } = props;
  return (
    <>
      <div className="modal-box">
        <p>Usuario: {usuario}</p>
        <p>Hora: {hora}</p>
        <p>Fecha: {fecha}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Modal;
