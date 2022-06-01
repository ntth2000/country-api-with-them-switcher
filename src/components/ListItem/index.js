const ListItem = ({ index = 0, length = 0, children }) => {
  return (
    <>
      <span className="detail-content">{children}</span>
      {index < length - 1 && ", "}
    </>
  );
};
export default ListItem;
