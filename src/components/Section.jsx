const Section = ({ children, classes }) => {
  return (
    <section className={` flex items-center justify-center flex-wrap text-white relative z-10 w-full gap-20 container  m-auto ${classes ? classes : ''}`}>{children}</section>
  )
}

export default Section
