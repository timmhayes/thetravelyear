import Pagination from 'react-bootstrap/Pagination';
import LinkContainer from 'react-router-bootstrap/LinkContainer'

function StoryPagination({nav, rootpath}) {
  rootpath = rootpath || '';
  return (
    <Pagination size="sm" className="justify-content-center my-4">
      {nav.prev !== null
        ? <LinkContainer to={rootpath + nav.first.link}><Pagination.First/></LinkContainer>
        : <Pagination.First disabled/>
      }
      {nav.prevgroup !== null
        ? <LinkContainer to={rootpath + nav.prevgroup.link}><Pagination.Ellipsis/></LinkContainer>
        : <Pagination.Ellipsis disabled/>
      }
      {nav.prev !== null && 
        <LinkContainer to={rootpath + nav.prev.link}>
          <Pagination.Item className='text-nowrap'>{nav.prev.text}</Pagination.Item>
        </LinkContainer>}
      <Pagination.Item  className='text-nowrap' active>{nav.current.text}</Pagination.Item>
      {nav.next !== null &&
        <LinkContainer to={rootpath + nav.next.link}>
          <Pagination.Item  className='text-nowrap'>{nav.next.text}</Pagination.Item>
        </LinkContainer>}
      {nav.nextgroup !== null
        ? <LinkContainer to={rootpath + nav.nextgroup.link}><Pagination.Ellipsis/></LinkContainer>
        : <Pagination.Ellipsis disabled/>
      }
      {nav.next !== null
        ? <LinkContainer to={rootpath + nav.last.link}><Pagination.Last/></LinkContainer>
        : <Pagination.Last disabled/>
      }
    </Pagination>
  );
}

export default StoryPagination;