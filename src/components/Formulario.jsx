import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");

  //mostrando alerta de error
  const [error, setError] = useState(false);

  //rellenando el formulario cuando le des al boton editar
  useEffect(() => {
    const { nombre, propietario, email, fecha, sintomas } = paciente;
    //verificar si hay algo en el objeto
    if (Object.keys(paciente).length > 0) {
      //si hay algo llena el formulario con las variables, todo esto cuando se apreta el boton editar
      setNombre(nombre);
      setEmail(email);
      setPropietario(propietario);
      setFecha(fecha);
      setSintomas(sintomas);
    }
  }, [paciente]);

  //generando clave unica
  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //VALIDANDO FORMULARIO

    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      console.log("almenos un campo vacio");

      //si hay algo vacio la variable cambia a true y muestra el mensaje
      setError(true);
      return;
    }
    setError(false); //se vuelve a poner a false para que desaparezca el mensaje una vez llenados todos los campos y dando al boton

    //Agregando pacientes a un objeto paciente

    //se crea un objeto para que se puedan agregar todos los campos
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
    };

    //EDITANDO
    
    //si existe en el objeto de paciente un id eso significa que estamos editanto
    if (paciente.id) {

      //Editanto el registro
      objetoPaciente.id = paciente.id;

      const pacientesActualizados = pacientes.map((pacientesState) =>
        pacientesState.id === paciente.id ? objetoPaciente : pacientesState
      );

      setPacientes(pacientesActualizados);
      setPaciente({});


    } else {

      //nuevo registro

      objetoPaciente.id = generarId();
      //PARA QUE NO SE REESCRIBAN LOS DATOS AL AGREGAR UN NUEVO PACIENTE
      setPacientes([...pacientes, objetoPaciente]); //se muestra en el hooks de app
    }

    //REINICIAR FORMULARIO AL AGREGAR PACIENTES

    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");
    
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center mb-10">
        Seguimiento Paciente
      </h2>
      <p className="text-lg mt-5 text-center">
        Añade Pacientes y {}
        <span className="text-indigo-600 font-bold "> Administralos</span>
      </p>

      <form
        className="bg-white shadow-lg rounded-lg py-10 px-5 mb-10"
        action=""
        onSubmit={handleSubmit}
      >
        {error && (
          <Error>
            {" "}
            <p> Todos los campos son Oblicatorios </p>
          </Error>
        )}
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="nombre"
          >
            Nombre Mascota
          </label>
          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            placeholder="Nombre de la Mascota"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="Propietario"
          >
            Nombre Propietario
          </label>
          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            placeholder="Nombre del Propietario"
            id="Propietario"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="email"
            placeholder="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="alta"
          >
            Alta
          </label>
          <input
            className="border-2 w-full p-2 mt-2"
            type="date"
            id="alta"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="sintomas"
          >
            Sintomas
          </label>
          <textarea
            className="border-2 w-full p-2 mt-2"
            name=""
            id="sintomas"
            cols="30"
            rows="10"
            placeholder="Describe los sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          ></textarea>
        </div>
        <input
          className="bg-indigo-600 w-full rounded-lg p-3 uper font-bold text-white hover:bg-indigo-800 cursor-pointer transition-all"
          type="submit"
          name=""
          id=""
          value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
        />
      </form>
    </div>
  );
};

export default Formulario;
