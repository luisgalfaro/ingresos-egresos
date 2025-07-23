import { FiCalendar } from "react-icons/fi";

export default function Home() {
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
        <div className="md:w-4/5 mx-auto py-8">
          <div className="badge badge-soft badge-primary">
            Ultimos registros
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mx-auto ">
          <div class="card w-full bg-base-200 card-md shadow-sm cursor-pointer ">
            <div class="card-body">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FiCalendar size="18px" />
                  <h2 class="card-title">Domingo 21/01/2025</h2>
                </div>
                <div class="badge badge-soft badge-info">Saldo: $500.00</div>
              </div>
            </div>
          </div>
          <div class="card w-full bg-base-200 card-md shadow-sm cursor-pointer ">
            <div class="card-body">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FiCalendar size="18px" />
                  <h2 class="card-title">Domingo 21/01/2025</h2>
                </div>
                <div class="badge badge-soft badge-info">Saldo: $500.00</div>
              </div>
            </div>
          </div>
          <div class="card w-full bg-base-200 card-md shadow-sm cursor-pointer ">
            <div class="card-body">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FiCalendar size="18px" />
                  <h2 class="card-title">Domingo 21/01/2025</h2>
                </div>
                <div class="badge badge-soft badge-info">Saldo: $500.00</div>
              </div>
            </div>
          </div>
          <div class="card w-full bg-base-200 card-md shadow-sm cursor-pointer ">
            <div class="card-body">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FiCalendar size="18px" />
                  <h2 class="card-title">Domingo 21/01/2025</h2>
                </div>
                <div class="badge badge-soft badge-info">Saldo: $500.00</div>
              </div>
            </div>
          </div>
          <div class="card w-full bg-base-200 card-md shadow-sm cursor-pointer ">
            <div class="card-body">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FiCalendar size="18px" />
                  <h2 class="card-title">Domingo 21/01/2025</h2>
                </div>
                <div class="badge badge-soft badge-info">Saldo: $500.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
