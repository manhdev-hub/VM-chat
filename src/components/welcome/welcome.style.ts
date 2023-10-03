import styled from "styled-components";
import { SIDE_BAR_WIDTH } from "../../constants";

export const WelcomeWrapper = styled.div`
  padding: 10px 20px;
  width: calc(100% - ${SIDE_BAR_WIDTH}px - 40px);
  background-image: url("/bg-welcome.webp");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  .header {
    display: flex;
    align-items: center;
    gap: 20px;

    p {
      font-size: 40px;
    }

    h1 {
      font-size: 40px;
      font-weight: 600;
    }
  }

  .title {
    font-size: 23px;
    margin-top: 50px;
  }

  @media only screen and (max-width: 768px) {
    &{
      display: none;
    }
  }
`;
