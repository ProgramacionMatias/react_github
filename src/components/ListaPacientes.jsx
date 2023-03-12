import { useEffect, useState } from "react";
import Paciente from "./Paciente";

const ListaPacientes = ({ pacientes, setPaciente, eliminarPaciente }) => {
  console.log(pacientes);

  useEffect(() => {
    if (pacientes.length > 0) {
      console.log("nuevo paciente");
    }
  }, [pacientes]);

  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {pacientes && pacientes.length ? ( //se tienen que cumplir las dos condicines
        <>
          <h2 className="font-black text-center text-3xl">Listado Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus {}
            <span className="text-indigo-600 font-bold ">
              Pacientes y Citas
            </span>
          </p>

          {pacientes.map((paciente) => {
            return (
              <Paciente
                key={paciente.id}
                paciente={paciente}
                setPaciente={setPaciente}
                eliminarPaciente={eliminarPaciente}
              />
            );
          })}
        </>
      ) : (
        <>
          <h2 className="font-black text-center text-3xl">No hay Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza Agregando Pacientes {}
            <span className="text-indigo-600 font-bold ">
              y Apareceran en este Lugar
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default ListaPacientes;
