import styled from "styled-components";

type Props = {
  line: number;
  text: string;
};

function EllipsisText({ line, text }: Props) {
  return (
    <Wrapper>
      <LineBreakText line={line}>{text}</LineBreakText>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex: 1;
`;

const LineBreakText = styled.div<{ line: number }>`
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ line }) => line};
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default EllipsisText;
