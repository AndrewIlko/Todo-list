const Wrapper = ({ children, bgColor }) => {
  return (
    <>
      <div className="wrapper" style={{ backgroundColor: bgColor }}>
        {children}
      </div>
    </>
  );
};

export default Wrapper;
