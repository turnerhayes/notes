import { useMatches } from "react-router";
import { Link, LinkProps } from "react-router-dom";
import { Breadcrumbs as MuiBreadcrumbs, Link as MuiLink } from "@mui/material";

interface MatchHandle {
  crumbText: (data: unknown) => string;
}

const BreadcrumbLink = (props: LinkProps) => {
  return <MuiLink component={Link} {...props} />;
};

export const Breadcrumbs = () => {
  const matches = useMatches().filter(
    (match) => (match.handle as MatchHandle | undefined)?.crumbText
  );
  return (
    <div>
      <MuiBreadcrumbs separator="›">
        <BreadcrumbLink to="/">Home</BreadcrumbLink>
        {matches.map((match) => {
          const text = (match.handle as MatchHandle | undefined)?.crumbText?.(
            match.params
          );
          return (
            <BreadcrumbLink key={match.pathname} to={match.pathname}>
              {text}
            </BreadcrumbLink>
          );
        })}
      </MuiBreadcrumbs>
    </div>
  );
};
