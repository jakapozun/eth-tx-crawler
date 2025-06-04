import classes from './WalletForm.module.scss';
import { type SubmitHandler, useForm } from 'react-hook-form';

interface WalletFormData {
  address: string;
  blockNumber: string;
}

const defaultValues: WalletFormData = {
  address: '',
  blockNumber: '',
};

const WalletForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues,
  });

  const onGetDataHandler: SubmitHandler<WalletFormData> = (formData) => {
    console.log(formData);
  };

  return (
    <section className={classes.walletForm}>
      <form
        className={classes.formContainer}
        onSubmit={handleSubmit(onGetDataHandler)}
      >
        <div className={classes.inputsWrapper}>
          <div className={classes.singleInputWrapper}>
            <label htmlFor={'address'}>Wallet Address</label>
            <input
              {...register('address', { required: 'Address is required' })}
              type="text"
              placeholder="0x..."
              className={classes.input}
              id="address"
            />
            {errors?.address && (
              <span className={classes.inputErr}>
                {errors.address?.message}
              </span>
            )}
          </div>
          <div className={classes.singleInputWrapper}>
            <label htmlFor="blockNumber">Block Number</label>
            <input
              {...register('blockNumber', { required: ' is required' })}
              type="text"
              placeholder="9000000"
              className={classes.input}
              id="blockNumber"
            />
            {errors?.address && (
              <span className={classes.inputErr}>
                {errors.address?.message}
              </span>
            )}
          </div>
        </div>
        <button className={classes.button} disabled={!isValid}>
          Get Address data
        </button>
      </form>
    </section>
  );
};

export default WalletForm;
