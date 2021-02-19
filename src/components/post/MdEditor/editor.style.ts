import { css } from "@emotion/react";

export const editorCss = css`
  .react-split-mde-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    border: 1px solid #edf2f7;
  }

  .react-split-mde {
    font-size: 14px;
    line-height: 18px;
    white-space: pre-wrap;
    word-break: keep-all;
    overflow-wrap: break-word;
    box-sizing: border-box;
    -webkit-font-variant-ligatures: common-ligatures;
    font-feature-settings: "liga", "clig";
    font-variant-ligatures: common-ligatures;
  }

  .react-split-mde * {
    box-sizing: border-box;
  }

  .react-split-mde-box {
    flex: 1;
    overflow: auto;
    padding: 5px;
  }

  .react-split-mde-textarea-wrap {
    position: relative;
    height: 100%;
  }

  .react-split-mde-textarea {
    position: relative;
    z-index: 2;
    width: 100%;
    min-height: 100%;
    display: block;
    background-color: transparent;
    -webkit-font-smoothing: antialiased;
    resize: none;
    color: inherit;
    border: none;
    line-height: 1.6;
    outline: none;
    padding: 0;
    border-right: 1px solid #edf2f7;
  }

  .react-split-mde-textarea-with-psudo {
    -webkit-text-fill-color: transparent;
  }

  .react-split-mde-psudo {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    line-height: 1.6;
    overflow-y: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .react-split-mde-psudo::-webkit-scrollbar {
    display: none;
  }

  .react-split-mde-textarea,
  .react-split-mde-psudo {
    box-sizing: inherit;
    display: inherit;
    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    -webkit-font-variant-ligatures: inherit;
    font-feature-settings: inherit;
    font-variant-ligatures: inherit;
    font-weight: inherit;
    letter-spacing: inherit;
    line-height: inherit;
    -moz-tab-size: inherit;
    tab-size: inherit;
    text-indent: inherit;
    text-rendering: inherit;
    text-transform: inherit;
    white-space: inherit;
    overflow-wrap: inherit;
    color: #333;
  }

  .react-split-mde-psudo .bullet-item {
    color: #999;
  }

  .react-split-mde-psudo .code-start,
  .react-split-mde-psudo .code-end {
    color: #999;
  }

  .react-split-mde-psudo .title {
    /* font-weight: bold */
    color: #000;
  }

  .react-split-mde-psudo .sharp,
  .react-split-mde-psudo .hljs-bullet {
    color: #999;
  }

  .react-split-mde-psudo .hljs-link {
    color: #1199ff;
  }

  .katex {
    position: relative;
  }
`;
