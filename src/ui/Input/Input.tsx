import { FieldError, UseFormRegister, useForm } from 'react-hook-form';
import styles from './Input.module.scss'
import { IFormInputs } from '../../interface/interface';

interface inputProps  {
    error: FieldError | undefined;
    name:"nameGraph" | "initial" | "last" | 'nameProject' |'email'|'password'|'constructiveName' | 'companyName' | 'major' | 'firstName' | 'lastName'
    register: UseFormRegister<IFormInputs>;
    title:string;
    placeholder:string;
    parametrs:any;
    type:string;
 
}

const Input = ({error,name,register,title,placeholder,parametrs,type}: inputProps) => {
  return (
    <div className={styles.input_wrapper}>
        <p className={styles.title}>{title}</p>
        <input type={type}  className={!error? styles.input:styles.input_error } {...register(name, parametrs)} placeholder={placeholder} />
    </div>
  ) 
}

export default Input