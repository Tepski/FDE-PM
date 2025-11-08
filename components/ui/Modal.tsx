interface modalI {
  children: React.ReactNode
}

const modal = ({children}: modalI) => {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-black/20 flex justify-center items-center">
      <div className="w-[80%] h-[80%] bg-white rounded-md shadow-md shadow-black/30 p-4">
        {children}
      </div>
    </div>
  )
};

export default modal;
