import styled from 'styled-components';
import { ReactComponent as FromTo } from './assets/fromTo.svg';
import { ReactComponent as StrokeIcon } from './assets/StrokeBottom.svg';

export const Page = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 40px);
  display: flex;
  background: #F9FAFB;
`;

export const Title = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  margin-bottom: '20px';
  color: #000000;
`;

export const FromToArrow = styled(FromTo)`
  position: relative;
  margin: 0 auto;
`;

export const InnerBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  width: 100%;
`;

export const Arrow = styled.div<{ rotat?: boolean }>`
  margin-right: 0px;
  transform: ${(props) => (props.rotat ? 'rotate(0deg)' : 'rotate(-90deg)')};
  transition: 0.2s ease;
`;

export const SelectList = styled.ul`
  list-style: none;
  background: #F9FAFB;
  border: 1px solid rgba(86, 101, 127, 0.3);
  border-radius: 4px;
  position: absolute;
  user-select: none;
  right: 0;
  left: 0;
  top: 40px;
  z-index: 999;
`;

export const ListItem = styled.li<{ active?: boolean }>`
  transition: 0.3s;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #F9FAFB;
  cursor: pointer;
  &:focus,
  &:hover {
    background: #EDF0F6;
    border-radius: 0px 0px 4px 4px;
  }
`;

export const Text = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
`;

export const DropDownContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const DropDownHeader = styled.div`
  border-radius: 4px;
  position: relative;
  height: 40px;
  font-size: 14px;
  line-height: 16px;
  padding: 12px;
  width: 100%;
  transition: 200ms ease-in-out;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background: #f9fafb;
  border: 1px solid #EDF0F7;
  color: #000000;

  ${Arrow} {
    position: absolute;
    right: 15px;
    top: 9px;
  }
  span {
    &::after,
    &::before {
      position: absolute;
      transition: 200ms ease-in-out;
    }
    &::before {
      content: attr(data-label);
      left: 16px;
      top: 0;
      bottom: 0;
      margin: auto;
      pointer-events: none;
      height: 18px;
      transform: translateY(-16px);
      font-weight: normal;
      font-size: 14px;
      line-height: 21px;
      letter-spacing: 0.1px;
      position: absolute;
      left: 12px;
      padding: 0 12px;
      top: -12px;
      z-index: 9;
      background: #F9FAFB;
      color: rgba(86, 101, 127, 0.6);
    }
  }

  &:hover {
    border-color: #EDF0F7;
    cursor: pointer;
  }
`;

export const StrokeBottom = styled(StrokeIcon)`
  fill: #000000;
`;
