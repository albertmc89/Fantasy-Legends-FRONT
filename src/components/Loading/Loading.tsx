import "./Loading.css";

const Loading = (): React.ReactElement => {
  return (
    <div className="box" aria-label="loading">
      <span className="shadow" />
      <div className="gravity">
        <span className="ball" />
      </div>
    </div>
  );
};

export default Loading;
