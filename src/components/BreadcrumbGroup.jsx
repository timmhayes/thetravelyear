import Breadcrumb from 'react-bootstrap/Breadcrumb';
import LinkContainer from 'react-router-bootstrap/LinkContainer';

export default function BreadcrumbGroup({crumbs}) {
  return (
    <Breadcrumb>
      <LinkContainer to="/"><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
      {crumbs.map((crumb) =>
        (crumb.href
          ? <LinkContainer key={crumb.text} to={crumb.href}>
              <Breadcrumb.Item>{crumb.text}</Breadcrumb.Item>
            </LinkContainer>
          : <Breadcrumb.Item active key={crumb.text}>{crumb.text}</Breadcrumb.Item>
        )
      )}
    </Breadcrumb>
  );
}