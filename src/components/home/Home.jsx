import { FiCalendar } from "react-icons/fi";
import api from "../../api/axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [registros, setRegistros] = useState([]);
  const [registroDia, setRegistroDia] = useState([]);

  const fechaActual = new Date();
  const diasAtras = new Date(fechaActual);

  diasAtras.setDate(fechaActual.getDate() - 7);

  const fechaActualStr = fechaActual.toISOString().split("T")[0];
  const diezDiasAtrasStr = diasAtras.toISOString().split("T")[0];

  const obtenerRegistros = () => {
    api
      .post("/najera-registros/_find", {
        selector: {
          fecha: {
            $gte: diezDiasAtrasStr,
            $lte: fechaActualStr,
          },
        },
      })
      .then((response) => {
        if (response.status == 200) {
          // setRegistros(response.data.rows.map((row) => row.doc));
          // console.log("registros", response.data.docs);
          setRegistros(response.data.docs);
        } else {
          console.log("error al obtener el registro");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const obtenerRegistroDia = () => {
    api
      .post("/najera-registros/_find", {
        selector: { fecha: fechaActualStr },
      })
      .then((response) => {
        if (response.status == 200) {
          setRegistroDia(response.data.docs);
          // console.log("registro del dia", response.data.docs);
        } else {
          console.log("error al obtener el registro");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    obtenerRegistros();
    obtenerRegistroDia();
  }, []);
  return (
    <>
      <div className="w-[90%] m-auto my-6 ">
        <div className="card md:w-4/5 grid md:grid-cols-3 md:gap-2 sm:grid-cols-1 p-6 mx-auto bg-base-200 card-md shadow-sm ">
          <div className="flex flex-col items-center">
            <input
              className="input validator"
              type="number"
              placeholder="Desde"
            />
            <div className="validator-hint">Ingresar un valor</div>
          </div>
          <div className="flex flex-col items-center">
            <input
              className="input validator"
              type="number"
              placeholder="Hasta"
            />
            <div className="validator-hint">Ingresar un valor</div>
          </div>

          <button className="btn btn-primary mt-4 md:mt-0" type="submit">
            Buscar
          </button>
        </div>

        <div className="w-[90%] m-auto my-6">
          {registroDia.length === 0 ? (
            <div className="w-full text-center py-12 text-2xl">
              <h2>Aun no se ha creado el registro del dia</h2>
            </div>
          ) : (
            registroDia.map((reg) => (
              <Link to={`/registro/${reg._id}`} key={reg._id}>
                <div className="badge badge-soft badge-primary">
                  Registro del dia
                </div>

                <div className="card w-full bg-base-200 card-md shadow-sm cursor-pointer my-8 ">
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
        <div className="w-[90%] m-auto my-6">
          <div className="mx-auto py-8">
            <div className="badge badge-soft badge-primary">
              Ultimos registros
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mx-auto ">
            {registros
              .slice()
              .reverse()
              .map((registro) => (
                <Link to={`/registro/${registro._id}`} key={registro._id}>
                  <div className="card w-full bg-base-200 card-md shadow-sm cursor-pointer ">
                    <div className="card-body">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <FiCalendar size="18px" />
                          <h2 className="card-title">{registro.fecha}</h2>
                        </div>
                        <div className="badge badge-soft badge-info">
                          Saldo: ${registro.totalDiaAnterior}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
