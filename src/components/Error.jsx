const Error = ({ children }) => {
  return (
    <div className="bg-red-800 text-center uppercase text-white mb-5 p-3 font-bold">
      <p>{children}</p>
    </div>
  );
};

export default Error;
