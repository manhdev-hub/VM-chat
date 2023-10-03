import styled from "styled-components";
import { PRIMARY_COLOR } from "../../../constants";

export const BodyChatWrapper = styled.div`
  .upload-image {
    .ant-upload-select{
        width: fit-content!important;
        height: fit-content!important;
        border: 0!important;
        margin: 0!important;
        svg{
            font-size: 25px;
        }
        svg:hover{
            color: ${PRIMARY_COLOR}

        }
    }

    .ant-tooltip-inner{
      display: none!important;
    }
  }

  .ant-upload-wrapper{
    position: relative;
  }

  .ant-upload-list-item-container{
    position: absolute;
    top: -430%;
  }

  .EmojiPickerReact{
    position: absolute!important;
    left: 0;
    bottom: 120%;
    z-index: 999;
  }

  @media only screen and (max-width: 768px) {
    &{
      height: 100%;
    }
  }
`;
