const H2 = ({ children, className = '' }) => {
  return (
    <h2 className={`font-bold text-white my-10 uppercase text-5xl lg:text-7xl ${className}`} data-aos='fade-up'>
      {children}
    </h2>
  )
}

export default H2
