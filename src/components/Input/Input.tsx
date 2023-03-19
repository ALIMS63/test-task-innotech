import { ChangeEvent, FC, ReactElement } from 'react';
import styled from 'styled-components';

interface IProps {
    placeholder?: string;
    name: string;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyPress?: (e: any) => void;
    disabled?: boolean;
    className?: string;
    readOnly?: boolean;
    type?: string;
    required?: boolean;
}

export const Input: FC<IProps> = (props: IProps): ReactElement => {
    const {
        placeholder,
        name,
        value,
        onChange,
        disabled,
        className = '',
        readOnly = false,
        type,
        required,
        ...rest
    } = props;

    return (
        <InputWrapper>
            <InputUI
                // pattern="^\d*(\.\d{0,2})?$"
                min="0"
                step=".00001"
                className={className}
                disabled={disabled}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                readOnly={readOnly}
                type={type}
                required={required}
                // autoComplete={'off'}
                {...rest}
            />
        </InputWrapper>
    );
};

export const InputWrapper = styled.div`
  position: relative;

`;

export const InputUI = styled.input`
  width: 100%;
  border: 1px solid #EDF0F7;
  box-sizing: border-box;
  border-radius: 2px;
  min-height: 40px;
  padding: 0 12px;
  font-weight: normal;
  background: #f9fafb;
  font-size: 14px;
  line-height: 16px;
  color: #000000;

  &:focus {
    outline: none;
    background: #FFFFFF;
  }
  &:read-only {
    background: #f9fafb;
  }
  ::placeholder,
  ::-webkit-input-placeholder {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    opacity: 0.4;
    color: #000000;
  }

  &:disabled {
    opacity: 0.4;
  }

  &:hover {
    border-color: #EDF0F7;
  }
`;

export const InputSuffix = styled.div`
  font-size: 14px;
  line-height: 16px;
  color: #000000;
  position: absolute;
  right: 12px;
  top: 12px;
`;
