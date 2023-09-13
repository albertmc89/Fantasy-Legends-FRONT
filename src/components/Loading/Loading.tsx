import "./Loading.css";

const Loading = (): React.ReactElement => {
  return (
    <div className="box" aria-label="loading">
      <div className="shadow" />
      <div className="gravity">
        <div className="ball" />
      </div>
    </div>
  );
};

export default Loading;
