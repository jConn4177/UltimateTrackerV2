import {
  SingleEliminationBracket,
  Match,
  StyledSvgViewer,
} from "@g-loot/react-tournament-brackets";

export const SingleElimination = () => (
  <SingleEliminationBracket
    matches={matches}
    matchComponent={Match}
    svgWrapper={({ children, ...props }) => (
      <StyledSvgViewer width={500} height={500} {...props}>
        {children}
      </StyledSvgViewer>
    )}
  />
);
