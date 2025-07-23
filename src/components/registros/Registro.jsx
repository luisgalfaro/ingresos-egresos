import { useState, useEffect } from "react";
import Modal from "./registro_components/Modal";
import Alert from "./registro_components/Alert";
import { CiTrash, CiCircleAlert } from "react-icons/ci";
import { Link } from "react-router-dom";
import api from "../../api/axios";

function Registro() {
  const [registros, setRegistros] = useState({
    id: "fin-2023-11-14-001",
    fecha: "2023-11-14",
    ingresos: [
      {
        id: "ing-001",
        titulo: "Venta al por mayor",
        monto: 980.0,
        fecha: "2023-11-14",
        hora: "10:45",
        usuario: {
          id: "usr-002",
          nombre: "Juan Pérez",
        },
      },
      {
        id: "ing-002",
        titulo: "Servicio técnico",
        monto: 470.5,
        fecha: "2023-11-14",
        hora: "15:30",
        usuario: {
          id: "usr-003",
          nombre: "Laura González",
        },
      },
    ],
    egresos: [
      {
        id: "eg-001",
        titulo: "Alquiler de local",
        monto: 600.0,
        fecha: "2023-11-14",
        hora: "09:00",
        usuario: {
          id: "usr-001",
          nombre: "Carlos Méndez",
        },
      },
      {
        id: "eg-002",
        titulo: "Compra de equipo",
        monto: 400.0,
        fecha: "2023-11-14",
        hora: "12:15",
        usuario: {
          id: "usr-004",
          nombre: "Ana Rodríguez",
        },
      },
    ],
    totalDia: 450.5,
    totalIngresos: 1450.5,
    totalEgresos: 1000.0,
    totalDiaAnterior: 1200.75,
  });

  const [data, setData] = useState({});
  useEffect(() => {
    //peticion a la api

    api
      .get("najera-registros/_all_docs?include_docs=true")
      .then((response) => {
        if (response.status === 200) {
          const docs = response.data.rows.map((row) => row.doc); // Solo extrae los `doc`
          setData(docs);
          response.data.rows.map((doc) => console.log(doc.doc));
        } else {
          console.log("ERROR AL OBTENER LA PETICION");
        }
      })
      .catch((error) => {
        console.log("ERROR AL HACER LA PETICION", error);
      });

    //Propiedad que calcula los ingresos automaticamente

    //Propiedad que calcula los egresos automaticamente
  }, []); // Solo se recalcula cuando cambian estos arrays

  useEffect(() => {
    const totalIngresos = registros.ingresos.reduce(
      (total, ingreso) => total + ingreso.monto,
      0
    );
    const totalEgresos = registros.egresos.reduce(
      (total, egreso) => total + egreso.monto,
      0
    );

    setRegistros((prev) => ({
      ...prev,
      totalIngresos,
      totalEgresos,
      totalDia: totalIngresos - totalEgresos,
    }));
  }, [registros.ingresos, registros.egresos]);

  const [nuevoRegistro, setnuevoRegistro] = useState({
    titulo: "",
    monto: "",
    fecha: new Date().toISOString().split("T")[0],
    hora: new Date().toTimeString().slice(0, 5),
    usuario: {
      id: "usr-002",
      nombre: "Juan Pérez",
    },
  });

  const [alerta, setAlerta] = useState(false);

  const [transaccion, setTransaccion] = useState("");
  const optionsSelect = [
    { value: "Ingreso", label: "Ingreso" },
    { value: "Egreso", label: "Egreso" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nuevo registro:", nuevoRegistro);
    console.log(transaccion);

    if (transaccion === "Ingreso") {
      const nuevoIngreso = {
        ...nuevoRegistro,
        monto: parseFloat(nuevoRegistro.monto),
      };
      setRegistros((prev) => ({
        ...prev,
        ingresos: [...prev.ingresos, nuevoIngreso],
      }));
      const id = `ing-${Math.floor(Math.random() * 1000)}`;
      setnuevoRegistro({
        id: id,
        titulo: "",
        monto: "",
        fecha: new Date().toISOString().split("T")[0],
        hora: new Date().toTimeString().slice(0, 5),
        usuario: {
          id: "usr-002",
          nombre: "Juan Pérez",
        },
      });

      setAlerta(true);
      setTimeout(() => {
        setAlerta(false);
      }, 5000);
    }

    if (transaccion === "Egreso") {
      const nuevoEgreso = {
        ...nuevoRegistro,
        monto: parseFloat(nuevoRegistro.monto),
      };
      setRegistros((prev) => ({
        ...prev,
        egresos: [...prev.egresos, nuevoEgreso],
      }));
      const id = `ing-${Math.floor(Math.random() * 1000)}`;

      setnuevoRegistro({
        id: id,
        titulo: "",
        monto: "",
        fecha: new Date().toISOString().split("T")[0],
        hora: new Date().toTimeString().slice(0, 5),
        usuario: {
          id: "usr-002",
          nombre: "Juan Pérez",
        },
      });

      setAlerta(true);
      setTimeout(() => {
        setAlerta(false);
      }, 5000);
    }
  };

  const handleDelete = (id, ingreso) => {
    if (ingreso) {
      console.log("Eliminar ingreso con ID:", id);
    } else {
      console.log("Eliminar egreso con ID:", id);
    }
  };

  return (
    <>
      <div className="w-[90%] m-auto my-6">
        <form onSubmit={handleSubmit}>
          <div className=" md:w-[80%] grid md:grid-cols-4 md:gap-2 sm:grid-cols-1 p-6 rounded-lg m-auto border-1 border-gray-500 shadow-md ">
            <div className="flex flex-col items-center">
              <input
                className="input validator"
                type="number"
                value={nuevoRegistro.monto}
                onChange={(e) =>
                  setnuevoRegistro({ ...nuevoRegistro, monto: e.target.value })
                }
                required
                placeholder="Ingresar valor"
              />
              <div className="validator-hint">Ingresar un valor</div>
            </div>
            <div className="flex flex-col items-center justify-start">
              <input
                className="input validator"
                type="text"
                value={nuevoRegistro.titulo}
                onChange={(e) =>
                  setnuevoRegistro({ ...nuevoRegistro, titulo: e.target.value })
                }
                required
                placeholder="Ingresar descripcion"
              />
              <div className="validator-hint">Ingresar una descripcion</div>
            </div>

            <select
              className="select"
              value={transaccion}
              onChange={(e) => setTransaccion(e.target.value)}
              required
            >
              <option value="" disabled>
                Seleccionar transacción
              </option>
              {optionsSelect.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button className="btn btn-primary mt-4 md:mt-0" type="submit">
              Agregar
            </button>
          </div>
        </form>
        <div className="bg-indigo-900 p-5 mt-5 rounded-lg flex justify-between items-center md:w-[80%] m-auto">
          <h2>Fecha: {registros.fecha}</h2>
          <h2>Total del dia</h2>
          <div className="badge badge-primary mx-5">${registros.totalDia}</div>
        </div>

        <div className=" m-auto my-5 grid grid-cols-1 md:w-[80%] md:grid-cols-2 md:gap-5  items-start">
          <div className="overflow-x-auto border-1 border-gray-500 shadow-md rounded-lg p-4">
            <div className="badge badge-soft badge-accent">INGRESOS</div>

            <table className="table">
              <thead>
                <tr>
                  <th>Descripcion</th>
                  <th>Valor</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {registros.ingresos.map((ingreso, index) => (
                  <tr key={index}>
                    <th>{ingreso.titulo}</th>
                    <td>${ingreso.monto}</td>
                    <td>
                      <div className="flex justify-center items-center gap-2">
                        <CiTrash
                          className="text-white hover:text-red-400 cursor-pointer"
                          size={24}
                          onClick={() => handleDelete(ingreso.id, true)}
                        />
                        <CiCircleAlert
                          className="text-white hover:text-blue-400 cursor-pointer"
                          size={24}
                          onClick={() =>
                            document.getElementById("my_modal_5").showModal()
                          }
                        />
                      </div>
                      <dialog
                        id="my_modal_5"
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <Modal
                          usuario={ingreso.usuario.nombre}
                          hora={ingreso.hora}
                          fecha={registros.fecha}
                        />
                      </dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center mt-4 justify-between">
              <h2>Total Ingresos</h2>
              <div className="badge badge-success mx-5">
                ${registros.totalIngresos}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto border-1 border-gray-500 shadow-md rounded-lg p-4 mt-5 md:mt-0">
            <div className="badge  badge-soft badge-info">EGRESOS</div>
            <table className="table">
              <thead>
                <tr>
                  <th>Descripcion</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {registros.egresos.map((egreso, index) => (
                  <tr key={index}>
                    <th>{egreso.titulo}</th>
                    <td>${egreso.monto}</td>
                    <td>
                      <div className="flex justify-center items-center gap-2">
                        <CiTrash
                          className="text-white hover:text-red-400 cursor-pointer"
                          size={24}
                          onClick={() => handleDelete(egreso.id, false)}
                        />
                        <CiCircleAlert
                          className="text-white hover:text-blue-400 cursor-pointer"
                          size={24}
                          onClick={() =>
                            document.getElementById("my_modal_5").showModal()
                          }
                        />
                      </div>
                      <dialog
                        id="my_modal_5"
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <Modal
                          usuario={egreso.usuario.nombre}
                          hora={egreso.hora}
                          fecha={registros.fecha}
                        />
                      </dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center mt-4 justify-between">
              <h2>Total Ingresos</h2>
              <div className="badge badge-info mx-5">
                ${registros.totalEgresos}
              </div>
            </div>
          </div>
        </div>
        {alerta ? <Alert texto="Registro agregado correctamente" /> : null}
      </div>
    </>
  );
}

export default Registro;
