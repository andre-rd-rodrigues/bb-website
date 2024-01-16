import Container from "../Container";
import styles from "./herosection.module.scss";

const HeroSection = ({
  imageSrc,
  children,
  className,
  style,
  overlayStyle = {
    backgroundColor: "#1E2E45",
    opacity: 0.75
  }
}) => {
  const containerStyle = {
    background: imageSrc ? `url(${imageSrc}) no-repeat center center` : "",
    backgroundSize: "cover",
    ...style
  };

  return (
    <div className={`${styles.container} ${className}`} style={containerStyle}>
      <Container className={styles.content}>{children}</Container>
      <div className={styles.overlay} style={overlayStyle}></div>
    </div>
  );
};

export default HeroSection;
