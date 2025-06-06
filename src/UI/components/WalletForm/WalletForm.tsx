import classes from './WalletForm.module.scss';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import classNames from 'classnames';
import { isAddress } from 'ethers';

interface WalletFormData {
  address: string;
  blockNumber: string;
}

const defaultValues: WalletFormData = {
  address: '',
  blockNumber: '',
};

const WalletForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues,
  });

  const onGetDataHandler: SubmitHandler<WalletFormData> = (formData) => {
    if (!formData.address || !formData.blockNumber) return;
    navigate(
      `?address=${formData.address}&blockNumber=${formData.blockNumber}&page=1`
    );
    reset();
  };

  const onClearParamsHandler = () => {
    reset();
    navigate('/');
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
              {...register('address', {
                required: 'Address is required',
                validate: (value) => {
                  if (!isAddress(value)) {
                    return 'Invalid address format';
                  }
                },
              })}
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
              type="number"
              placeholder="9000000"
              className={classes.input}
              id="blockNumber"
            />
            {errors?.blockNumber && (
              <span className={classes.inputErr}>
                {errors.blockNumber?.message}
              </span>
            )}
          </div>
        </div>
        <button className={classes.button} disabled={!isValid}>
          Get Address Data
        </button>
        <button
          type={'button'}
          className={classNames(classes.button, classes.clearSearch)}
          onClick={onClearParamsHandler}
        >
          Reset Params
        </button>
      </form>
    </section>
  );
};

export default WalletForm;
