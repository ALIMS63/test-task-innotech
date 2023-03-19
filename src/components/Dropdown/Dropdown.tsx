import { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import Scrollbars from "react-custom-scrollbars";
import useOnClickOutside from '../../helpers/useOutsideHook';
import { Arrow, DropDownContainer, DropDownHeader, ListItem, SelectList, StrokeBottom, Text } from '../../styled';

type DropdownProps = {
  options: string[];
  selectedOption: string;
  setSelectedOption: (selectedOption: string) => void;
  placeholder?: string;
};

export const Dropdown: FC<DropdownProps> = ({
  options,
  selectedOption,
  setSelectedOption,
  placeholder,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const toggling = () => {
    setIsOpen(!isOpen);
  };

  const onOptionClicked = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
      <DropDownContainer ref={ref}>
        <DropDownHeader tabIndex={0} onClick={toggling}>
          {selectedOption || (placeholder && <Placeholder>{placeholder}</Placeholder>)}
          <Arrow rotat={isOpen}>
            <StrokeBottom />
          </Arrow>
        </DropDownHeader>
        {isOpen && (
          <SelectList>
            <Scrollbars style={{ height: '160px' }} thumbSize={52}>
              {options.map((option, idx) => (
                selectedOption !== option && <ListItem
                    key={`select-option-item-${idx}`}
                    onClick={() => onOptionClicked(option)}
                >
                  <Text>{option}</Text>
                </ListItem>
              ))}
            </Scrollbars>
          </SelectList>
        )}
      </DropDownContainer>
  );
}; 

const Placeholder = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
`;
