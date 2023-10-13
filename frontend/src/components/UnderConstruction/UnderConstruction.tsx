import styles from './UnderConstruction.module.css';
import ConstructionImage from '../../assets/Under construction-amico.svg';

function UnderConstruction() {
  return (
    <section className={styles.event_container}>
      <div className={styles.left_container}>
        <div className={styles.text_center}>
          <h1>Coming Soon!</h1>
          <p>We are working hard to give you better experience. Thank you for your patience.</p>
        </div>
      </div>
      <div className={styles.right_container}>
        <img src={ConstructionImage} alt='image' />
      </div>
    </section>
  );
}
export default UnderConstruction;
