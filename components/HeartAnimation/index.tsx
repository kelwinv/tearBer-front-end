import animationStyles from "../../styles/animations/loadingIcon.module.css";

function HeartAnimation(props: any) {
  const { hasHidden } = props;
  
  return (
    <div className={!hasHidden ? animationStyles.lds_heart : ""}>
      <div></div>
    </div>
  );
}

export { HeartAnimation };
