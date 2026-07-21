import Container from "../Container";
import styles from "./herosection.module.scss";

const HeroSection = ({
  imageSrc,
  children,
  className,
  style,
  parallax = false,
  overlayStyle = {
    backgroundColor: "#1E2E45",
    opacity: 0.75
  }
}) => {
  const useStaticBg = imageSrc && !parallax;

  const containerStyle = {
    background: useStaticBg ? `url(${imageSrc}) no-repeat center center` : "",
    backgroundSize: useStaticBg ? "cover" : undefined,
    ...style
  };

  return (
    <div className={`${styles.container} ${className}`} style={containerStyle}>
      {imageSrc && parallax && (
        <div
          className={styles.bg}
          data-speed="0.7"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
      )}
      <Container className={styles.content}>{children}</Container>
      <div className={styles.overlay} style={overlayStyle}></div>
    </div>
  );
};

export default HeroSection;
