import Container from "../Container";
import styles from "./herosection.module.scss";

interface HeroSectionProps {
  imageSrc?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  overlayStyle?: React.CSSProperties;
}

const HeroSection = ({
  imageSrc,
  children,
  className,
  style,
  overlayStyle = {
    backgroundColor: "#1E2E45",
    opacity: 0.75
  }
}: HeroSectionProps) => {
  const containerStyle: React.CSSProperties = {
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
