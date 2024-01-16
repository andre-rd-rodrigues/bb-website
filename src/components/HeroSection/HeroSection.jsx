import Container from "../Container";
import styles from "./herosection.module.scss";

const HeroSection = ({
  imageSrc,
  children,
  className,
  style,
  overlayColor
}) => {
  const containerStyle = {
    background: imageSrc ? `url(${imageSrc}) no-repeat center center` : "",
    backgroundSize: "cover",
    ...style
  };

  const overlayStyle = {
    backgroundColor: overlayColor, // Set a default color if overlayColor is not provided
    opacity: 0.75
  };

  return (
    <div className={`${styles.container} ${className}`} style={containerStyle}>
      <Container className={styles.content}>{children}</Container>
      <div className={styles.overlay} style={overlayStyle}></div>
    </div>
  );
};

export default HeroSection;
