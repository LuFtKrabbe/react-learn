import { FormDataType } from "../../pages/forms/formDataSlice";
import styles from "./FormCard.module.scss";

function FormCard(props: { key: string; formData: FormDataType }): JSX.Element {
  const { name, age, gender, country, email, password, image } = props.formData;

  return (
    <div className={styles.card}>
      <div className={styles.name}>
        <img src={image as string} className={styles.image}></img> {name}, {age}{" "}
        ({gender})
      </div>
      <div className={styles.country}>Country: {country}</div>
      <div className={styles.credentials}>
        E-mail: {email}, Password: {password}
      </div>
    </div>
  );
}

export default FormCard;
