import {
  DoubleElimBracketLeaderboard,
  Match,
  StyledSvgViewer,
} from "@g-loot/react-tournament-brackets";

export const DoubleElimination = () => {
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);
  return (
    <DoubleElimBracketLeaderboard
      matches={lastGameInLowerMockData}
      matchComponent={Match}
      svgWrapper={({ children, ...props }) => (
        <StyledSvgViewer width={finalWidth} height={finalHeight} {...props}>
          {children}
        </StyledSvgViewer>
      )}
    />
  );
};
