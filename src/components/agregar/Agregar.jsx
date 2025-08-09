import { FiPlus, FiCalendar } from "react-icons/fi";
import { useState, useEffect } from "react";
import api from "../../api/axios";
import Alert from "../registros/registro_components/Alert";
import { Link } from "react-router-dom";
export default function Agregar() {
  const [nuevoRegistro, setnuevoRegistro] = useState({
    fecha: "",
    ingresos: [],
    egresos: [],
    totalDia: 0,
    totalIngresos: 0,
    totalEgresos: 0,
    totalDiaAnterior: 0,
  });

  const [registro, setRegistro] = useState([]);

  const fechaActual = new Date().toISOString().split("T")[0];

  const [alerta, setAlerta] = useState(false);

  const [alertText, setAlertaText] = useState({
    texto: "",
    type: "",
  });

  const obtenerRegistro = () => {
    api
      .post("/najera-registros/_find", {
        selector: { fecha: fechaActual },
      })
      .then((response) => {
        if (response.status == 200) {
          setRegistro(response.data.docs);
          // console.log("registros", response.data);
        } else {
          console.log("error al obtener el registro");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    if (!nuevoRegistro.fecha) {
      setAlertaText({
        texto: "Debe introducir datos",
        type: "",
      });
      setAlerta(true);
      setTimeout(() => {
        setAlerta(false);
      }, 5000);
      document.getElementById("my_modal_3").close();
      return;
    }
    api
      .post("/najera-registros", nuevoRegistro)
      .then((response) => {
        if (response.status == 201) {
          setAlertaText({
            texto: "Regrsitro creado con exito",
            type: "positive",
          });
          setAlerta(true);
          setTimeout(() => {
            setAlerta(false);
          }, 5000);
          setnuevoRegistro({
            fecha: "",
            ingresos: [],
            egresos: [],
            totalDia: 0,
            totalIngresos: 0,
            totalEgresos: 0,
            totalDiaAnterior: 0,
          });
          obtenerRegistro();
          document.getElementById("my_modal_3").close();
        } else {
          // console.log("error al crear el registro");
          setAlertaText({
            texto: "Regrsitro no se pudo crear",
            type: "negative",
          });
          setAlerta(true);
          setTimeout(() => {
            setAlerta(false);
          }, 5000);
        }
      })
      .catch((error) => {
        console.log(error);
        setAlertaText({
          texto: "Error al hacer la peticion",
          type: "negative",
        });
        setAlerta(true);
        setTimeout(() => {
          setAlerta(false);
        }, 5000);
      });
  };

  useEffect(() => {
    obtenerRegistro();
  }, []);

  return (
    <>
      <div className="w-[90%] m-auto my-6">
        <div className="flex items-center justify-center">
          <button
            className="btn btn-primary md:mt-0"
            type="submit"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            <FiPlus />
            Crear nuevo regustro
          </button>
        </div>
      </div>

      <div className="w-[90%] m-auto my-6">
        {registro.length === 0 ? (
          <div className="w-full text-center py-12 text-2xl">
            <h2>Aun no se ha creado el registro del dia</h2>
          </div>
        ) : (
          registro.map((reg) => (
            <Link to={`/registro/${reg._id}`} key={reg._id}>
              <div className="card w-full bg-base-200 card-md shadow-sm cursor-pointer my-16 ">
                <div className="card-body">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <FiCalendar size="18px" />
                      <h2 className="card-title">{reg.fecha}</h2>
                    </div>
                    <div className="badge badge-soft badge-info">
                      Saldo: ${reg.totalDiaAnterior}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <form
            onSubmit={(e) => {
              e.preventDefault(); // evita que recargue o cierre el modal
              handleSubmit();
            }}
            className="grid gap-4"
          >
            <div className="flex items-start flex-col gap-1 w-full">
              <p>Ingresar fecha</p>
              <input
                className="input validator w-full"
                type="date"
                placeholder="Desde"
                value={nuevoRegistro.fecha}
                onChange={(e) =>
                  setnuevoRegistro({ ...nuevoRegistro, fecha: e.target.value })
                }
              />
            </div>

            <div className="flex items-start flex-col gap-1 w-full">
              <input
                className="input validator w-full"
                type="number"
                placeholder="Valor dia anterior"
                value={nuevoRegistro.totalDiaAnterior}
                onChange={(e) =>
                  setnuevoRegistro({
                    ...nuevoRegistro,
                    totalDiaAnterior: e.target.value,
                  })
                }
              />
            </div>
            <button className="btn btn-primary md:mt-0" type="submit">
              <FiPlus />
              Crear nuevo registro
            </button>
          </form>
        </div>
      </dialog>

      {alerta ? <Alert texto={alertText.texto} type={alertText.type} /> : null}
    </>
  );
}
