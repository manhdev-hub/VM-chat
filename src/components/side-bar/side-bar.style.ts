import styled from "styled-components";
import { PRIMARY_COLOR, SIDE_BAR_WIDTH } from "../../constants";

export const SideBarWrapper = styled.div`
  padding: 10px 15px;
  max-height: 100vh;
  overflow-y: auto;
  width: ${SIDE_BAR_WIDTH}px;
  transition: all .3s;
  /* width */
  &::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 10px;
  }
  .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: ${SIDE_BAR_WIDTH}px;
    background-color: #fff;
    height: 70px;
    z-index: 10;
    top: 0;
    h1 {
      color: ${PRIMARY_COLOR};
      font-size: 30px;
      margin: 0;
    }

    button {
      border: 0;
      border-radius: 50%;
      background: rgba(0, 185, 107, 0.06);
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .listGroup {
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    p {
      cursor: pointer;
      &:hover {
        color: ${PRIMARY_COLOR};
      }
    }
  }

  .listMessage {
    margin-top: 10px;
  }

  .message-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 10px;
    cursor: pointer;
    &:hover {
      background: rgba(0, 185, 107, 0.09);
    }
    p {
      margin-bottom: 5px;
    }
  }

  .last-message {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  @media only screen and (max-width: 768px) {
    &{
      width: 100%;
    }

    .heading{
      width: calc(100% - 30px);
    }

    &.open-chat{
      display: none;
    }
  }
`;
