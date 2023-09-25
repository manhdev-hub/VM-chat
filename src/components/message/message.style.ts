import styled from "styled-components";
import { PRIMARY_COLOR, SIDE_BAR_WIDTH } from "../../constants";


export const MessageWrapper = styled.div`
    width: calc(100% - ${SIDE_BAR_WIDTH}px);
    .message-header{
        padding: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        position: fixed;
        background: #fff;
        width: calc(100% - ${SIDE_BAR_WIDTH}px - 50px);
        z-index: 10;
    }

    .body-chat{
        width: 100%;
        background: #f0f0f0;
        height: 100vh;
        overflow-y: auto;
    }

    .send-message{
        position: fixed;
        bottom: 20px;
        width: calc(100% - ${SIDE_BAR_WIDTH}px - 20px);
        padding: 0 20px;
        left: calc(${SIDE_BAR_WIDTH}px + 20px);
        input{
            padding: 8px 0;
        }
    }

    .send-button{
        border: 0;
        padding: 0;
    }

    .list-chat{
        padding: 10px 15px;
        height: calc(100% - 165px);
        overflow: auto;
        padding-top: 80px;
    }

    .chat-item{
        margin-bottom: 20px;
        &.video-message{
            .chat-content{
                background-color: transparent;
            }
        }
    }

    .chat-content{
        margin-left: 38px;
        background-color: #fff;
        padding: 10px 13px;
        border-radius: 10px;
        width: fit-content;
        &.me{
            background-color: ${PRIMARY_COLOR};
            color: #fff;
        }
    }
`;
